import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../CONFIG/firebase";

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login succes"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-circle" size={55} color="black" />
      <Text>SIGN UP</Text>
      <View style={styles.contImput}>
        <TextInput placeholder="email" onChangeText={setemail} value={email} />
      </View>
      <View style={styles.contImput}>
        <TextInput
          placeholder="password"
          onChangeText={setpassword}
          value={password}
          textContentType="password"
        />
      </View>
      <TouchableOpacity onPress={() => onHandleLogin()}>
        <Ionicons name="arrow-forward-circle" size={44} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contImput: {
    borderRadius: 20,
    backgroundColor: "grey",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
