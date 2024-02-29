import React, { useState } from "react";
import {
  View,
  Image,
  Modal,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { profileImageType } from "../../types/profileImageModalType";

const ProfileImageModal = ({
  imageUrl,
  handleImagePopup,
}: profileImageType) => {
  console.log(imageUrl);

  return (
    <View>
      <Modal
        visible={true}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleImagePopup()}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleImagePopup()}
          style={styles.centerView}
        >
          <View style={styles.mainView}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  mainView: { backgroundColor: "transparent", padding: 20, borderRadius: 10 },
  image: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
});

export default ProfileImageModal;
