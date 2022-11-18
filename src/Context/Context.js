import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
export const PublicContext = createContext({});

const Context = (props) => {
  const [dataA, setdataA] = useState([]);
  const [dataB, setdataB] = useState([]);
  const [dataG, setdataG] = useState([]);
  const [dataV, setdataV] = useState([]);
  const [user, setuser] = useState();
  const [badge, setbadge] = useState(0);
  const [messages, setmessages] = useState([]);

  /* GET AUTH USER */
  useEffect(() => {
    const setterAuthUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setuser(authUser);
    };
    setterAuthUser();
  }, []);
  return !user ? (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <PublicContext.Provider
      value={{
        dataA,
        setdataA,
        dataB,
        setdataB,
        dataV,
        setdataV,
        dataG,
        setdataG,
        user,
        badge,
        setbadge,
      }}
    >
      {props.children}
    </PublicContext.Provider>
  );
};

export default Context;
