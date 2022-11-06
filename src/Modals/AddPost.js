import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { PublicContext } from "../Context/Context";
const { width } = Dimensions.get("screen");

const AddPost = ({ plugSwitcher, switcher, modData, block }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const [header, setheader] = useState("");
  const [onWriting, setonWriting] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickCamera = async () => {
    const response = await ImagePicker.requestCameraPermissionsAsync();
    if (response.granted) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,

        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };
  const onSubmit = () => {
    const item = {
      header,
      image,
      text,
      block,
      key: Math.random().toString(),
    };
    modData(item);
    setImage(null);
    setheader("");
    setText("");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={switcher}>
      <View style={styles.container}>
        <View style={[styles.subContainer, { width }]}>
          <TextInput
            placeholder="напишите заголовок"
            style={{ fontSize: 20 }}
            onChangeText={setheader}
            value={header}
          />
          <TouchableOpacity onPress={() => plugSwitcher(true)}>
            <Feather
              name="x-circle"
              size={29}
              color="red"
              style={{
                position: "absolute",
                top: -50,
                left: width - 240,
                zIndex: 2,
              }}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {image && (
              <View>
                <Feather
                  name="x-circle"
                  size={24}
                  color="black"
                  style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
                  onPress={() => setImage()}
                />
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, position: "relative" }}
                />
              </View>
            )}
            {active && (
              <View style={styles.activeTxt}>
                <TextInput
                  placeholder="текст идет здесь"
                  onChangeText={setText}
                  value={text}
                  style={{ fontSize: 16, width: 330 }}
                  multiline={true}
                />
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={pickImage} style={styles.picker}>
              <Entypo name="image" size={24} color="black" />
              <Text style={styles.txtPicker}>изображение</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickCamera} style={styles.picker}>
              <FontAwesome5 name="camera-retro" size={24} color="black" />
              <Text style={styles.txtPicker}>Камера</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActive(!active)}
              style={[
                styles.picker,
                { backgroundColor: active ? "green" : "#a6a6a6" },
              ]}
            >
              <FontAwesome name="file-text-o" size={24} color="black" />
              <Text style={styles.txtPicker}>текст</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => [onSubmit(), plugSwitcher(true)]}
            style={styles.btnSave}
          >
            <MaterialIcons name="navigate-next" size={24} color="black" />
            <Text style={styles.txtPicker}>продолжить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    height: 480,
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 30,
    position: "absolute",
    bottom: 0,
  },
  btn: {
    padding: 5,
    backgroundColor: "#252be9",
    borderRadius: 25,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  picker: {
    flexDirection: "row",
    backgroundColor: "#a6a6a6",
    padding: 9,
    borderRadius: 20,
    width: undefined,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 7,
  },
  txtPicker: {
    fontWeight: "700",
    fontSize: 15,
    paddingLeft: 5,
  },
  close: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTxt: {
    flex: 1,
    width: 330,
  },
  btnSave: {
    flexDirection: "row",
    backgroundColor: "#ff9d3c",
    padding: 9,
    borderRadius: 20,
    width: 150,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
});
