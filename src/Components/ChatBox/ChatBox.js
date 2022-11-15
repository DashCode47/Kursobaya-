import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { getUser } from "../../../Queries/Queries";
import { useQuery } from "@apollo/client";
import { PublicContext } from "../../Context/Context";

const ChatBox = ({ sms }) => {
  const { user } = useContext(PublicContext);
  const { data, loading, error } = useQuery(getUser, {
    variables: { id: sms.userID },
  });
  const subid = user?.attributes?.sub || null;
  const userId = data?.getUser?.id || null;

  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: subid === userId ? "flex-end" : "flex-start",
          backgroundColor: subid === userId ? "royalblue" : "#938987",
        },
      ]}
    >
      <Text style={styles.txtUser}>{data?.getUser?.name || null}</Text>
      <Text style={styles.txt}>{sms.text}</Text>
    </View>
  );
};

export default ChatBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "royalblue",
    height: undefined,
    alignSelf: "flex-start",
    marginBottom: 7,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  txtUser: {
    fontSize: 17,
    color: "black",
    fontWeight: "bold",
  },
  txt: {
    fontSize: 17,
    textAlign: "left",
    color: "white",
  },
});
