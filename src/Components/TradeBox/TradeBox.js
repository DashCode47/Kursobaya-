import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { updatePost } from "../../../Queries/Queries";
import { Storage } from "aws-amplify";
import { Entypo } from "@expo/vector-icons";
import DeletePost from "../../Modals/deletePost";
import { ActivityIndicator } from "react-native-paper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LinearGradient } from "expo-linear-gradient";
dayjs.extend(relativeTime);
const { width } = Dimensions.get("screen");

const TradeBox = ({ data }) => {
  const navigation = useNavigation();
  const [onUpdatePost, { loading, data: postData, error }] =
    useMutation(updatePost);
  const [pressed, setpressed] = useState(false);
  const [imageURL, setimageURL] = useState(null);
  const [switcher, setswitcher] = useState(false);
  const [loadingIMG, setloadingIMG] = useState(false);
  /* //////////////////////////////////////////////////getting MEDIA FROM S3 */
  useEffect(() => {
    dowloadMedia();
    setloadingIMG(false);
  }, []);

  const dowloadMedia = async () => {
    setloadingIMG(true);
    if (data.image) {
      const uri = await Storage.get(data.image);
      setimageURL(uri);
    }
  };
  /* ///////////////////////////////////////////////////////////////////////// */
  const onSwitcher = (value) => {
    setswitcher(!value);
  };

  const updatingPost = async (item) => {
    try {
      const response = await onUpdatePost({
        variables: {
          input: {
            id: data.id,
            nofLikes: !pressed ? data.nofLikes + 1 : data.nofLikes - 1,
            _version: data._version,
          },
        },
      });
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const setnofLikes = () => {
    setpressed(!pressed);
    updatingPost();
    /* if (!pressed) setlikes(likes + 1);
    else setlikes(likes - 1); */
  };

  return loadingIMG && imageURL ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <DeletePost onSwitch={onSwitcher} switcher={switcher} data={data} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Comments", { data: data })}
      >
        <Entypo
          name="dots-three-horizontal"
          size={24}
          color="black"
          style={styles.dots}
          onPress={() => onSwitcher(false)}
        />
        {/* <Text style={styles.block}>{data.block}</Text> */}
        <Text style={styles.title} numberOfLines={2}>
          {data.title}
        </Text>
        <Text style={styles.date} numberOfLines={2}>
          {dayjs(data.createdAt).fromNow(true) + " ago"}
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
              style={{
                width: width * 0.93,
                height: 300,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                paddingHorizontal: 24,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      {/*  ////////////////////////////////////////////N~ LIKES AND COMMENTS ////////////*/}
      <View style={styles.iconBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="arrow-up-bold-outline"
            size={26}
            color={pressed ? "orange" : "black"}
            onPress={setnofLikes}
          />

          <Text style={{ fontSize: 17 }}>{data.nofLikes}</Text>

          <MaterialCommunityIcons
            name="arrow-down-bold-outline"
            size={26}
            color="black"
            onPress={setnofLikes}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Octicons name="comment-discussion" size={24} color="black" />
          <Text style={{ fontSize: 18, paddingLeft: 7 }}>
            {data.nofComments || "0"}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          {/* <SimpleLineIcons name="share" size={24} color="black" /> */}
          <Text style={styles.block}>{data.block}</Text>
          {/*  <Text style={{ fontSize: 18, paddingLeft: 7 }}>удалить</Text> */}
        </View>
      </View>
    </View>
  );
};

export default TradeBox;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: width * 0.95,
    marginBottom: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    backgroundColor: "white",
    elevation: 11,
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 24,
    color: "black",
  },
  date: {
    fontSize: 12,
    marginBottom: 5,
    color: "black",
    paddingHorizontal: 24,
  },
  description: { fontSize: 16, paddingHorizontal: 24, marginBottom: 15 },
  iconBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "100%",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    paddingHorizontal: 22,
    paddingVertical: 5,
  },
  block: {
    position: "absolute",
    top: 0,
    right: 1,
    fontWeight: "bold",
    color: "#acacac",
  },
  dots: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
    backgroundColor: "gray",
    borderRadius: 25,
    padding: 5,
  },
});
