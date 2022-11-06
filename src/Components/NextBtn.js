import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NextBtn = () => {
  const navigation = useNavigation();

  const onPressBtn = async () => {
    await AsyncStorage.setItem("boarded", "true");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={() => onPressBtn()}
      >
        <AntDesign name="arrowright" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default NextBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20,
  },
});
