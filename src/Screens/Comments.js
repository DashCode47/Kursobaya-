import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CommentBox from "../Components/CommentBox/CommentBox";
const { width } = Dimensions.get("screen");

const Comments = ({ route }) => {
  const { data } = route.params;
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const commentsArray = () => {
    setcomments([...comments, comment]);
    console.log(comments);
    setcomment("");
  };

  return (
    <View style={styles.container}>
      {/* ///////////////////////////////////////////////BOX */}
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 24,
          marginBottom: 8,
        }}
      >
        <Text style={styles.title} numberOfLines={2}>
          {data.header}
        </Text>
        {data.text && (
          <Text style={styles.description} numberOfLines={3}>
            {data.text}
          </Text>
        )}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {data.image && (
            <Image
              source={{ uri: data.image }}
              style={{ width, height: 200 }}
            />
          )}
        </View>

        <View style={styles.iconBar}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="arrow-up-bold-outline"
              size={26}
              color="black"
            />
            <Text style={{ fontSize: 17 }}>250</Text>
            <MaterialCommunityIcons
              name="arrow-down-bold-outline"
              size={26}
              color="black"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Octicons name="comment-discussion" size={24} color="black" />
            <Text style={{ fontSize: 18, paddingLeft: 7 }}>350</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <SimpleLineIcons name="share" size={24} color="black" />
            <Text style={{ fontSize: 18, paddingLeft: 7 }}>поделиться</Text>
          </View>
        </View>
      </View>
      {/* /////////////////////////////////////////////////////END BOX */}
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentBox data={item} />}
      />
      <View style={styles.cajacommnt}>
        <View style={[styles.lowBar, { width: width - 54 }]}>
          <TextInput
            placeholder="write something"
            onChangeText={setcomment}
            value={comment}
            multiline={true}
          />
        </View>
        <TouchableOpacity onPress={() => commentsArray()}>
          <MaterialIcons name="send" size={32} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#e5e5e5",
    paddingBottom: 49,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  description: { fontSize: 14 },
  iconBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
    marginBottom: 10,
  },
});
