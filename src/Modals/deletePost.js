import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import { deletePost } from "../../Queries/Queries";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { PublicContext } from "../Context/Context";
import { Storage } from "aws-amplify";

const DeletePost = ({ onSwitch, switcher, data }) => {
  const { user } = useContext(PublicContext);
  const [onDeletePost, { loading, error }] = useMutation(deletePost);
  const deletingPost = async () => {
    try {
      await onDeletePost({
        variables: {
          input: {
            id: data.id,
            _version: data._version,
          },
        },
      });
      if (data.image) {
        await Storage.remove(data.image);
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const alert = () => {
    Alert.alert("Delete", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => deletingPost(),
      },
    ]);
  };
  return (
    <Modal visible={switcher} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          {user.attributes.sub === data.userID && (
            <Text style={styles.txt} onPress={() => alert()}>
              Delete
            </Text>
          )}
          <Text style={styles.txtCancel} onPress={() => onSwitch(true)}>
            Cancel
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default DeletePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer: {
    height: 70,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderWidth: 1,
    borderColor: "black",
    position: "absolute",
    bottom: 0,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 19,
    color: "red",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
    width: "100%",
    textAlign: "center",
  },
  txtCancel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
    width: "100%",
    textAlign: "center",
  },
});
