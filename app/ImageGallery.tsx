import { images } from "@/data/Images";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (url: string) => {
    console.log("pressed", url);

    setSelectedImage(url);
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>ImageGallery</Text>
      <View>
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.imageContainer}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => handlePress(item.url)}>
                <Image source={{ uri: item.url }} style={styles.image} />
              </Pressable>
            );
          }}
        />
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedImage! }} style={styles.modalImage} />
            <Pressable
              onPress={() => {
                setModalVisible(false);
                setSelectedImage(null);
              }}
            >
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedImage(null);
                }}
              >
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </Pressable>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 15,
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingBottom: 20,
  },

  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
    margin: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalImage: {
    width: 320,
    height: 320,
    borderRadius: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
  },

  closeText: {
    fontWeight: "bold",
  },
});
