import { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home";
import OnBoarding from "../Components/OnBoarding";
import Block from "../Screens/Block";
import Comments from "../Screens/Comments";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createUser, getUser } from "../../Queries/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { PublicContext } from "../Context/Context";
const Stack = createNativeStackNavigator();

const Loading = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

const Navigation = () => {
  const { user } = useContext(PublicContext);
  const [loaded, setloading] = useState(true);
  const [firstTime, setFirstTime] = useState(false);
  const [OncreateUser, { loading: onLoad, error: onError }] =
    useMutation(createUser);
  const { data, loading, error } = useQuery(getUser, {
    variables: { id: user.attributes.sub },
  });

  const checkOnboarding = async () => {
    const response = await AsyncStorage.getItem("boarded");
    if (response) {
      setFirstTime(response);
    }
    setloading(false);
  };

  /* CREATING USER INDB FUNCTION */
  const saving = async () => {
    /* CHECK USER IN DATABASE */

    try {
      if (data?.getUser) {
        console.log("user already exists");
      }
      if (!loading && !data?.getUser) {
        /* ///////////CREATE user in DB if is new*/
        console.log("creating");
        const response = await OncreateUser({
          variables: {
            input: {
              id: user.attributes.sub,
              name: "user",
            },
          },
        });
      }
    } catch (e) {
      Alert.alert("Error uploading", e.message);
    }
  };

  useEffect(() => {
    checkOnboarding();
    saving();
  }, []);

  /* /////////////////////////////////////////add Auth use to User Db//////////// */

  if (loading || onLoad) return <Loading />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        {!firstTime && (
          <Stack.Screen
            name="OnBoarding"
            component={loaded ? Loading : OnBoarding}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
          initialParams={{ user: data }}
        />
        <Stack.Screen
          name="Block"
          component={Block}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          initialParams={{ user: data }}
          /*  options={{ headerShown: false }} */
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
