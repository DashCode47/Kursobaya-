import React, { useState, useEffect, useCallback, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import CajaComment from "../../Components/CajaComment/CajaComment";
import {
  listMessagesByChatRoom,
  createMessages,
  onCreateMessages,
} from "../../../Queries/Queries";
import { Alert, View } from "react-native";
import ChatBox from "../../Components/ChatBox/ChatBox";
import { PublicContext } from "../../Context/Context";

const Chat = () => {
  const { user } = useContext(PublicContext);
  const [messages, setmessages] = useState([]);
  const { loading, data, error, refetch } = useQuery(listMessagesByChatRoom, {
    variables: {
      chatroomID: "19a58b2c-ca81-4265-958d-cdf2b5a71d25",
      sortDirection: "DESC",
    },
  });

  /* ////////////////////////////////////////////SUBS ///////////////////////////////////////*/
  const { data: subsData } = useSubscription(onCreateMessages, {
    filter: { chatroomID: { eq: "19a58b2c-ca81-4265-958d-cdf2b5a71d25" } },
  });

  /* //////////////////////////////////////////////////////////////////////////////////// */

  const [createNewMessage, { data: data1 }] = useMutation(createMessages);
  const createnewSMSFunction = async (input) => {
    try {
      await createNewMessage({
        variables: {
          input: {
            chatroomID: "19a58b2c-ca81-4265-958d-cdf2b5a71d25",
            userID: user?.attributes?.sub,
            text: input,
          },
        },
      });
    } catch (er) {
      Alert.alert("error", er.message);
    }
  };
  /*  console.log(subsData?.onCreateMessages); */
  const messagesSorted = data?.listMessagesByChatRoom?.items || [];
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (subsData?.onCreateMessages) {
      setmessages((prev) => [subsData?.onCreateMessages, ...prev]);
    }
  }, [subsData]);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...messages, ...messagesSorted]}
        renderItem={({ item }) => <ChatBox sms={item} />}
        inverted
      />
      <CajaComment sendSMS={createnewSMSFunction} />
    </View>
  );
};
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 45,
  },
});
