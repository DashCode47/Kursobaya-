import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import Trade from "./TopNavScreens/Trade";
import Chat from "./TopNavScreens/Chat";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PublicContext } from "../Context/Context";
import Badge from "../Components/Badge/Badge";

const Tab = createMaterialTopTabNavigator();

const Block = ({ route }) => {
  const item = route.params.item.name;
  const { badge } = useContext(PublicContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: { backgroundColor: "black" },
      }}
    >
      <Tab.Screen name="Trade">
        {(props) => <Trade {...props} extraData={item} />}
      </Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ tabBarBadge: () => <Badge numero={badge} /> }}
        initialParams={{ item: item }}
      />
    </Tab.Navigator>
  );
};

export default Block;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#244fb0",
    alignItems: "center",
  },
});
