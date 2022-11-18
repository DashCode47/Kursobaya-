import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import TradeBox from "../../Components/TradeBox/TradeBox";
import { AntDesign } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AddPost from "../../Modals/AddPost";
import { Entypo } from "@expo/vector-icons";
const { width } = Dimensions.get("screen");
import { useNavigation } from "@react-navigation/native";
import { PublicContext } from "../../Context/Context";
import { listPosts, postsByType } from "../../../Queries/Queries";
import { useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native-paper";

const Trade = ({ extraData }) => {
  const navigation = useNavigation();
  const [switcher, setswitcher] = useState(false);
  const { dataA } = useContext(PublicContext);
  const { setdataA } = useContext(PublicContext);

  const { loading, data, error, refetch } = useQuery(postsByType, {
    variables: { type: "post", sortDirection: "DESC" },
  });
  const posts = data?.PostsByType?.items.filter((item) => !item._deleted);
  /* const modData = (item) => {
    setdataA([item, ...dataA]);
  };
 */
  const plugSwitcher = (value) => {
    setswitcher(!value);
  };
  useEffect(() => {
    refetch();
  }, []);

  return loading ? (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#D6E9FF", "#E6EBF0"]}
      style={styles.container}
    >
      <AddPost
        plugSwitcher={plugSwitcher}
        switcher={switcher}
        block={extraData}
        refetch={refetch}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width,
          paddingRight: 15,
          alignItems: "center",
        }}
      >
        <View style={styles.contTitle}>
          <Ionicons
            name="ios-return-down-back"
            size={41}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>{extraData}</Text>
        </View>
        <TouchableOpacity onPress={() => plugSwitcher(false)}>
          <Image
            source={require("../../../assets/images/add.png")}
            style={styles.add}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <TradeBox data={item} />}
        onRefresh={refetch}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default Trade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#244fb0",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 23,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 7,
  },
  contTitle: {
    backgroundColor: "#67A7DD",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    width: "50%",
    alignSelf: "flex-start",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    borderWidth: 1,
  },
  add: {
    height: 50,
    width: 50,
  },
});
