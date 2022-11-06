import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import Home from "./src/Screens/Home";
import OnBoarding from "./src/Components/OnBoarding";
import Block from "./src/Screens/Block";
import Comments from "./src/Screens/Comments";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Context from "./src/Context/Context";

const Stack = createNativeStackNavigator();

const Loading = () => {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

const App = () => {
  const [loading, setloading] = useState(true);
  const [firstTime, setFirstTime] = useState(false);
  useEffect(() => {
    checkOnboarding();
  }, []);

  const RootNav = () => {
    return (
      <NavigationContainer>
        <Context>
          <MainnNav />
        </Context>
      </NavigationContainer>
    );
  };

  const MainnNav = () => {
    return (
      <Stack.Navigator initialRouteName="OnBoarding">
        {!firstTime && (
          <Stack.Screen
            name="OnBoarding"
            component={loading ? Loading : OnBoarding}
            options={{ headerShown: false }}
          />
        )}
        {/*  <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Block"
          component={Block}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          /*  options={{ headerShown: false }} */
        />
      </Stack.Navigator>
    );
  };

  const checkOnboarding = async () => {
    const response = await AsyncStorage.getItem("boarded");
    if (response) {
      setFirstTime(response);
    }
    setloading(false);
  };

  return <RootNav />;
};
export default App;
