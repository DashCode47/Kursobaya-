import {
  StyleSheet,
  Text,
  View,
  Modal,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useMutation, useQuery } from "@apollo/client";
import { updateUser, getUser } from "../../Queries/Queries";

const Settings = ({ plugSwitch, switcher, userData }) => {
  const [username, setusername] = useState("username");
  /* ///////////////////////////////////////MUTATION UPDATE USER //////////////////////*/
  const [doUpdate, { data, loading, error }] = useMutation(updateUser);

  useEffect(() => {
    setusername(queryuser?.getUser?.name);
  }, []);

  const { data: queryuser } = useQuery(getUser, {
    variables: { id: userData.id },
  });
  const onUpdating = async () => {
    try {
      if (username !== queryuser?.getUser?.name) {
        await doUpdate({
          variables: {
            input: {
              id: userData.id,
              name: username,
              _version: queryuser.getUser._version,
            },
          },
        });
        plugSwitch(true);
      }
    } catch (e) {
      Alert.alert("No se cambio el nombre", e.message);
    }
  };
  /* ///////////////////////////////////////////////////////////////////// */

  return (
    <Modal transparent={true} visible={switcher} animationType="slide">
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ImageBackground
            style={styles.subcontainer}
            imageStyle={styles.background}
            source={require("../../assets/images/kfu-logo.jpg")}
          >
            <View style={styles.user}>
              <FontAwesome5 name="user-edit" size={24} color="black" />
              <Text style={styles.userTitleTxt}>Username: </Text>
              <TextInput
                style={styles.userTxt}
                value={username}
                onChangeText={setusername}
              />
            </View>

            <TouchableOpacity style={styles.save} onPress={() => onUpdating()}>
              <Entypo name="save" size={22} color="white" />
              <Text style={styles.txtSave}>Save</Text>
            </TouchableOpacity>

            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => plugSwitch(true)}
              >
                <Ionicons
                  name="md-chevron-back-circle-sharp"
                  size={22}
                  color="white"
                />
                <Text style={styles.signOuttxt}>Cancel </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signOut}
                onPress={() => Auth.signOut()}
              >
                <MaterialCommunityIcons name="logout" size={22} color="white" />
                <Text style={styles.signOuttxt}>SignOut </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      </View>
    </Modal>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer: {
    width: 250,
    height: 200,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    borderRadius: 25,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "70%",
    marginBottom: 10,
    backgroundColor: "white",
  },
  userTitleTxt: {
    fontWeight: "bold",
    fontSize: 17,
  },
  userTxt: {
    fontSize: 16,
  },
  save: {
    backgroundColor: "#005cd3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    width: 100,
  },
  btns: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
  },
  signOut: {
    backgroundColor: "#9d0000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signOuttxt: {
    color: "white",
    fontWeight: "bold",
  },
  txtSave: {
    color: "white",
    fontWeight: "bold",
  },
});
