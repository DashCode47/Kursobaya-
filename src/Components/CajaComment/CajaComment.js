import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("screen");

const CajaComment = ({ sendSMS }) => {
  const [comment, setcomment] = useState("");
  return (
    <View style={styles.cajacommnt}>
      <View style={[styles.lowBar, { width: width - 54 }]}>
        <TextInput
          placeholder="write something"
          onChangeText={setcomment}
          value={comment}
          multiline={true}
        />
      </View>
      <TouchableOpacity onPress={() => [sendSMS(comment), setcomment("")]}>
        <MaterialIcons name="send" size={32} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

export default CajaComment;

const styles = StyleSheet.create({
  lowBar: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 5,
    borderRadius: 15,
    paddingLeft: 7,
    minHeight: 36,
  },
  cajacommnt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    paddingBottom: 5,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 4,
  },
});
