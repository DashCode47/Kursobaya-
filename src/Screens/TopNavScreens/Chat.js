import React, { useState, useEffect, useCallback, useContext } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import CajaComment from "../../Components/CajaComment/CajaComment";
import {
  listMessagesByChatRoom,
  createMessages,
  onCreateMessages,
  onNewMessagebyChatRoomID,
} from "../../../Queries/Queries";
import { Alert, View } from "react-native";
import ChatBox from "../../Components/ChatBox/ChatBox";
import { PublicContext } from "../../Context/Context";
import { useNavigation } from "@react-navigation/native";

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const block = route.params.item;
  const { user } = useContext(PublicContext);
  const { setbadge } = useContext(PublicContext);
  const { badge } = useContext(PublicContext);
  const [messages, setmessages] = useState([]);
  const [blockId, setblockId] = useState("");
  const [isfetchingMore, setisfetchingMore] = useState(false);
  /* /////////////////////////////////////////////CHECK BLOCK /////////////////////////////// */
  const checkBlock = () => {
    if (block === "БЛОК B") setblockId("3f0ee7ac-6431-4b49-9851-845dd157bb3b");
    if (block === "БЛОК A") setblockId("19a58b2c-ca81-4265-958d-cdf2b5a71d25");
    if (block === "БЛОК Б") setblockId("a03bf14a-6c2e-4fc3-b4cd-b318e71aafdc");
    if (block === "БЛОК Г") setblockId("5982865d-988e-4343-9994-679b1836012e");
  };

  /* //////////////////////////////////////////////////////////// */

  const { loading, data, error, refetch, fetchMore } = useQuery(
    listMessagesByChatRoom,
    {
      variables: {
        chatroomID: blockId,
        sortDirection: "DESC",
        limit: 11,
      },
    }
  );

  /* ////////////////////////////////////////////SUBSCRIPTIONS ///////////////////////////////////////*/
  const { data: subsData } = useSubscription(onNewMessagebyChatRoomID, {
    variables: { chatroomID: blockId },
  });

  /* //////////////////////////////////////////////////////////////////////////////////// */

  const [createNewMessage, { data: data1 }] = useMutation(createMessages);
  const createnewSMSFunction = async (input) => {
    try {
      await createNewMessage({
        variables: {
          input: {
            chatroomID: blockId,
            userID: user?.attributes?.sub,
            text: input,
          },
        },
      });
    } catch (er) {
      Alert.alert("error", er.message);
    }
  };

  useEffect(() => {
    setbadge(0);
  }, [navigation.navigate]);

  useEffect(() => {
    if (subsData?.onNewMessagebyChatRoomID) {
      setmessages((prev) => [subsData?.onNewMessagebyChatRoomID, ...prev]);
      setbadge(badge + 1);
      console.log("created");
    }
  }, [subsData]);

  useEffect(() => {
    checkBlock();
    setTimeout(() => {
      refetch();
    }, 1100);
  }, []);

  const messagesSorted = data?.listMessagesByChatRoom?.items || [];
  /*  console.log(data?.listMessagesByChatRoom?.items); */
  const nextToken = data?.listMessagesByChatRoom?.nextToken;
  /* //////////////////////////////FUNCTION FOR PAGINATION/////////////// */
  const loadMore = async () => {
    if (!nextToken || isfetchingMore) return;
    setisfetchingMore(true);
    await fetchMore({ variables: { nextToken } });
    setisfetchingMore(false);
  };
  return (
    <View style={styles.container}>
      <Text onPress={() => refetch()}>{block}</Text>
      <FlatList
        data={[...messages, ...messagesSorted]}
        renderItem={({ item }) => <ChatBox sms={item} />}
        inverted
        onEndReached={() => loadMore()}
        ListFooterComponent={nextToken ? <ActivityIndicator /> : null}
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
