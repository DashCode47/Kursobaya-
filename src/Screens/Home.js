import * as React from "react";
import {
  StatusBar,
  FlatList,
  Text,
  Image,
  Animated,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { Ionicons } from "@expo/vector-icons";
import Settings from "../Modals/Settings";
import { useState } from "react";
const { width, height } = Dimensions.get("screen");

const dum1 = "../../assets/images/buildingB.jpg";
const dum2 = "../../assets/images/buildingA.jpg";
const dum3 = "../../assets/images/buildingC.jpg";
const dum4 = "../../assets/images/buildingG.jpg";
const data = [
  { name: "БЛОК A", image: require(dum1) },
  { name: "БЛОК Б", image: require(dum2) },
  { name: "БЛОК В", image: require(dum3) },
  { name: "БЛОК Г", image: require(dum4) },
];
const imageW = width * 0.7;
const imageH = imageW * 1.54;

const Home = ({ route }) => {
  const navigation = useNavigation();
  const userData = route.params?.user?.getUser;
  const [switcher, setswitcher] = useState(false);

  const plugSwitch = (value) => {
    setswitcher(!value);
  };

  const onPressBtn = async () => {
    try {
      await AsyncStorage.removeItem("boarded");
    } catch (err) {
      console.log("Error @setItem: ", err);
    }
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar hidden />
      <Settings
        switcher={switcher}
        plugSwitch={plugSwitch}
        userData={userData}
      />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={image.image}
              style={[
                StyleSheet.absoluteFillObject,
                { opacity },
                { height, width },
              ]}
              blurRadius={10}
            />
          );
        })}
      </View>

      <Ionicons
        name="settings"
        size={32}
        color="black"
        style={styles.settings}
        onPress={() => plugSwitch(false)}
      />

      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.imgContainer}
              onPress={() => navigation.navigate("Block", { item })}
            >
              <Text style={styles.title}>{item.name}</Text>
              <Image source={item.image} style={styles.img} />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity onPress={() => onPressBtn()}>
        <Text>BTN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: "#244fb0",
    padding: 5,
  },
  imgContainer: {
    width,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    elevation: 15,
    shadowOpacity: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  img: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
    borderRadius: 16,
  },
  settings: {
    position: "absolute",
    right: 15,
    top: 20,
    zIndex: 1,
  },
});

export default Home;
