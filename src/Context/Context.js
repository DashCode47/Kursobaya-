import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";

export const PublicContext = createContext({});

const Context = (props) => {
  const [dataA, setdataA] = useState([]);
  const [dataB, setdataB] = useState([]);
  const [dataG, setdataG] = useState([]);
  const [dataV, setdataV] = useState([]);
  return (
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
      }}
    >
      {props.children}
    </PublicContext.Provider>
  );
};

export default Context;
