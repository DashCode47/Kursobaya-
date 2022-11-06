import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("screen");

const TradeBox = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width,
        backgroundColor: "white",
        paddingHorizontal: 24,
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Comments", { data: data })}
      >
        <Text style={styles.block}>{data.block}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {data.header}
        </Text>
        {data.text && (
          <Text style={styles.description} numberOfLines={3}>
            {data.text}
          </Text>
        )}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {data.image && (
            <Image
              source={{ uri: data.image }}
              style={{ width, height: 200 }}
            />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.iconBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="arrow-up-bold-outline"
            size={26}
            color="black"
          />
          <Text style={{ fontSize: 17 }}>250</Text>
          <MaterialCommunityIcons
            name="arrow-down-bold-outline"
            size={26}
            color="black"
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Octicons name="comment-discussion" size={24} color="black" />
          <Text style={{ fontSize: 18, paddingLeft: 7 }}>350</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <SimpleLineIcons name="share" size={24} color="black" />
          <Text style={{ fontSize: 18, paddingLeft: 7 }}>поделиться</Text>
        </View>
      </View>
    </View>
  );
};

export default TradeBox;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  description: { fontSize: 14 },
  iconBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  block: {
    position: "absolute",
    top: 0,
    right: 1,
    fontWeight: "bold",
    color: "#acacac",
  },
});
