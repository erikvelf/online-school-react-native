import { View, Text, Alert, Image } from "react-native";
import { StyleSheet } from "react-native";
import ImageUploader from "../../shared/ImageUploader.tsx/ImageUploader";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../shared/Button/Button";
import { useState } from "react";
import {
  useCameraPermissions,
  PermissionStatus,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import UserMenu from "../../features/layout/ui/UserMenu/UserMenu";
import { Gaps } from "../../shared/tokens";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <Image source={require("../../assets/images/avatar.png")} />
      )}
      <ImageUploader onUpload={setImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  container: {
    flexDirection: "row",
    gap: Gaps.g20,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,

    justifyContent: "space-around",
  },
});
