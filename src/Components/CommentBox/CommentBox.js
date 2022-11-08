import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { PublicContext } from "../../Context/Context";
import { useQuery } from "@apollo/client";
import { getUser } from "../../../Queries/Queries";
const { width } = Dimensions.get("screen");

const CommentBox = ({ data }) => {
  const {
    data: userData,
    loading,
    error,
  } = useQuery(getUser, { variables: { id: data.userID } });
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{userData?.getUser?.name}:</Text>
      <Text style={styles.text}>{data.text}</Text>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 4,
    borderRadius: 20,
    marginHorizontal: 8,
    alignSelf: "center",
    flex: 1,
    width: "100%",
    borderBottomWidth: 1.5,
    borderColor: "lightgray",
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
  text: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "500",
  },
});
