import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CommentBox from "../Components/CommentBox/CommentBox";
import { useMutation, useQuery } from "@apollo/client";
import {
  createComments,
  listComments,
  updatePost,
} from "../../Queries/Queries";
import { PublicContext } from "../Context/Context";
import { Storage } from "aws-amplify";
const { width } = Dimensions.get("screen");

const Comments = ({ route }) => {
  const { data } = route.params;

  const [comment, setcomment] = useState("");
  const [imageURL, setimageURL] = useState(null);
  const { user } = useContext(PublicContext);
  const [Imheight, setheight] = useState();

  useEffect(() => {
    dowloadMedia();
    refetch();
  }, []);

  const dowloadMedia = async () => {
    if (data.image) {
      const uri = await Storage.get(data.image);
      setimageURL(uri);
    }
  };

  const {
    data: queryData,
    error: queryError,
    refetch,
  } = useQuery(
    listComments,
    {
      variables: { filter: { postID: { eq: data.id } } },
    },
    refetch
  );
  /* //////////////////////////////////////////////CREATE COMMENT MUTATION */
  const [onCreateComment, { data: commentData, loading, error }] =
    useMutation(createComments);
  const [onUpdatenofComments, { loading: comLoad }] = useMutation(updatePost);
  const creatingComment = async () => {
    try {
      if (comment !== "") {
        const response = await onCreateComment({
          variables: {
            input: {
              postID: data.id,
              text: comment,
              userID: user.attributes.sub,
            },
          },
        });
        await onUpdatenofComments({
          variables: {
            input: {
              id: data.id,
              _version: data._version,
              nofComments: data.nofComments + 1,
            },
          },
        });
        refetch();
        setcomment("");
      }
    } catch (e) {
      Alert.alert("Error creating Comment", e.message);
    }
  };
  /* //////////////////////////////////////////////////////////////////////// */

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
          {data.title}
        </Text>
        {data.description && (
          <Text style={styles.description} numberOfLines={3}>
            {data.description}
          </Text>
        )}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {imageURL && (
            <Image
              source={{ uri: imageURL }}
              style={{ width, aspectRatio: 1 }}
              resizeMode="cover"
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
            <Text style={{ fontSize: 17 }}>{data.nofLikes}</Text>
            <MaterialCommunityIcons
              name="arrow-down-bold-outline"
              size={26}
              color="black"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Octicons name="comment-discussion" size={24} color="black" />
            <Text style={{ fontSize: 18, paddingLeft: 7 }}>
              {data.nofComments}
            </Text>
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
        data={queryData?.listComments?.items || []}
        renderItem={({ item }) => <CommentBox data={item} />}
      />

      {/* ///////////////////////////////INPUT COMMMENT BOX/////////////// */}
      <View style={styles.cajacommnt}>
        <View style={[styles.lowBar, { width: width - 54 }]}>
          <TextInput
            placeholder="write something"
            onChangeText={setcomment}
            value={comment}
            multiline={true}
          />
        </View>
        <TouchableOpacity onPress={creatingComment}>
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
    backgroundColor: "white",
    width: "100%",
    paddingTop: 4,
  },
});
