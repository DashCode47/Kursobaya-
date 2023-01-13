import React, { useState, useEffect, useCallback, useContext } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
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
    if (block === "БЛОК B") setblockId("26242733-dd86-426e-98f5-d156521efd2e");
    if (block === "БЛОК A") setblockId("c14f8295-d49e-4c08-865f-b8210b28dff3");
    if (block === "БЛОК Б") setblockId("27255eb3-264f-45cc-a074-e9a2e2804402");
    if (block === "БЛОК Г") setblockId("dff89715-f49c-40d6-b1e3-09c3851c980f");
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
