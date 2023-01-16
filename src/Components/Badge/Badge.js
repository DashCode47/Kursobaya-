import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Badge = ({ numero }) => {
  return numero > 0 ? (
    <View style={styles.container}>
      <Text style={styles.txt}>{numero}</Text>
    </View>
  ) : null;
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: "red",
    borderRadius: 22,
    marginRight: 20,
    marginTop: 5,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
