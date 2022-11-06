import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
const { width } = Dimensions.get("screen");

const CommentBox = ({ data }) => {
  return (
    <View style={[styles.container, { width: undefined }]}>
      <Text style={styles.text}>{data}</Text>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2328eb",
    marginVertical: 4,
    borderRadius: 20,
    borderTopRightRadius: 0,
    marginHorizontal: 8,
    alignSelf: "flex-end",
  },
  text: {
    alignSelf: "flex-end",
    fontSize: 15,
    fontWeight: "500",
  },
});
