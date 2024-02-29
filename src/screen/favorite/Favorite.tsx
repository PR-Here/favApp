import React, { FC, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { styles } from "./style";
import { getUserList } from "../../service/apiCall/apiCall";
import { HomeFlatlistProps } from "../../types/homeTypes";
import { FILL_STAR, STAR } from "../../utils/assetImage";
import { useDispatch, useSelector } from "react-redux";
import { removeToFavorite } from "../../redux/slice/favSlice";

const Favorite = () => {
  const dispatch = useDispatch();
  // getting data from redux store
  const data = useSelector((state) => state?.fav?.favItem);

  const RenderUserList = ({ item, index }: HomeFlatlistProps) => {
    if (!item) {
      // If the item is undefined, return null or a placeholder
      return null;
    }
    return (
      <View key={index} style={styles.listItem}>
        <Image style={styles.profileImage} source={{ uri: item?.thumbnail }} />
        {/* View */}

        <View style={styles.nameView}>
          {/* Name */}

          <Text style={styles.userName}>
            {`${item?.title} ${item?.first} ${item?.last}`}
          </Text>
          {/* City */}
          <Text style={styles.cityText}>{item?.city}</Text>
          {/* age */}
          <Text style={styles.age}>{item?.gender}</Text>
        </View>
        {/* Star Image */}
        <TouchableOpacity
          style={styles.starImageBtn}
          onPress={() => {
            if (!item?.isStared) {
              dispatch(
                removeToFavorite({
                  thumbnail: item?.thumbnail || "",
                  title: item?.title || "",
                  first: item?.first || "",
                  last: item?.last || "",
                  city: item?.city || "",
                  gender: item?.gender || "",
                  isStared: false,
                })
              );
            }
          }}
        >
          <Image style={styles.starImage} source={FILL_STAR} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* if data empty show no user added text */}
      {data == "" ? (
        <View style={styles.view}>
          <Text style={styles.text}>No User Added.</Text>
        </View>
      ) : (
        <FlatList data={data} renderItem={RenderUserList} />
      )}
    </SafeAreaView>
  );
};

export default Favorite;
