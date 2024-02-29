import React, { FC, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import { getUserList } from "../../service/apiCall/apiCall";
import { HomeFlatlistProps } from "../../types/homeTypes";
import { FILL_STAR, STAR } from "../../utils/assetImage";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../redux/slice/favSlice";
import { showToast } from "../../utils/constant";
import ProfileImageModal from "../../component/modal/profileImageModal";

const Home = () => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isShowImagePopup, setIsShowImagePopup] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Store Fav Data
  const favData = useSelector((state) => state?.fav?.favItem);

  useEffect(() => {
    userListApi();
  }, []);

  // User List Api Called here
  const userListApi = async () => {
    try {
      const apiData = await getUserList(count);
      if (apiData?.status == 200) {
        const updatedUserList = apiData?.data?.results.map((user: any) => {
          return {
            thumbnail: user?.picture?.thumbnail || "",
            title: user?.name?.title || "",
            first: user?.name?.first || "",
            last: user?.name?.last || "",
            city: user?.location?.country || "",
            gender: user?.gender || "",
            isStared: false,
          };
        });
        // If refreshing, reset the user list
        // If no new data received, set hasMoreData to false
        if (!updatedUserList.length) {
          setHasMoreData(false);
        }
        // If fetching more, append to the existing list
        setUserList((prevList) => [...prevList, ...updatedUserList]);

        setLoading(false);
        setRefreshing(false);

        showToast(`Data fetch successfully ${userList.length + 10}`);
      }
    } catch (err) {
      console.log("API ERR: ", err);
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Called when Pull To refresh
  const pullToRefresh = () => {
    setCount((prevCount) => prevCount + 10);
    setRefreshing(true);
    setTimeout(() => {
      userListApi();
    }, 0);
  };

  // Star Image Click Event
  const handleStarClick = (index: number, userName: string) => {
    setUserList((prevUserList) => {
      const updatedUserList: any = [...prevUserList];
      updatedUserList[index] = {
        ...updatedUserList[index],
        isStared: !updatedUserList[index]?.isStared,
      };
      return updatedUserList;
    });

    showToast(
      `${userName} : ${
        !userList[index]?.isStared
          ? "added successfully  in favorite list"
          : "remove successfully  in favorite list"
      } `
    );
  };

  const RenderUserList = ({ item, index }: HomeFlatlistProps) => {
    const fullName = `${item?.title} ${item?.first} ${item?.last}`;
    return (
      <View key={index} style={styles.listItem}>
        <TouchableOpacity
          style={styles.imageBtn}
          onPress={() => {
            setImageUrl(item?.thumbnail);
            setIsShowImagePopup(true);
          }}
        >
          <Image
            style={styles.profileImage}
            source={{ uri: item?.thumbnail }}
          />
        </TouchableOpacity>

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
            handleStarClick(index, fullName);
            if (!item?.isStared) {
              dispatch(addToFavorite(item));
            }
          }}
        >
          <Image
            style={styles.starImage}
            source={item?.isStared ? FILL_STAR : STAR}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // Called when go to end of list view
  const handleEndReached = () => {
    if (hasMoreData && !isFetchingMore) {
      userListApi();
    }
  };

  // Bottom Loader
  const renderFooter = () => {
    return !isFetchingMore ? (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color="#0000ff"
      />
    ) : null;
  };

  // Handle Image Popup State
  const handleImagePopup = () => {
    setIsShowImagePopup(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.view}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={userList}
          renderItem={RenderUserList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={pullToRefresh}
              colors={["#0000ff"]}
              tintColor={"#0000ff"}
            />
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      )}

      {isShowImagePopup && (
        <ProfileImageModal
          handleImagePopup={handleImagePopup}
          imageUrl={imageUrl}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
