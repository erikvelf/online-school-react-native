import { Text, Alert, Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  useCameraPermissions,
  PermissionStatus,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { Colors, Fonts, Gaps, Radius } from "../tokens";
import { View } from "react-native";
import UploadIcon from "../../assets/icons/upload";
import { Button } from "../Button/Button";

interface ImageUploaderProps {
  onUpload: (uri: string) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
  const [libraryPermissions, requestLibraryPermissions] =
    useMediaLibraryPermissions();

  const verifyCameraPermissions = async () => {
    if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
      const res = await requestCameraPermission();
      return res.granted;
    }
    if (cameraPermissions?.status === PermissionStatus.DENIED) {
      Alert.alert("Not enough permissions to acces the camera");
      return false;
    }
    return true;
  };

  const verifyMediaPermissions = async () => {
    if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
      const res = await requestLibraryPermissions();
      return res.granted;
    }

    if (libraryPermissions?.status === PermissionStatus.DENIED) {
      Alert.alert("Not enough permissions to acces the media library");
      return false;
    }
    return true;
  };

  const captureAvatar = async () => {
    const isPerissionGranted = await verifyCameraPermissions();
    if (!isPerissionGranted) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.assets) {
      return;
    }
    setImage(result?.assets[0].uri);
  };

  const pickImage = async () => {
    const isPerissionGranted = await verifyMediaPermissions();
    if (!isPerissionGranted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.assets) {
      return;
    }
    onUpload(result?.assets[0].uri);
  };

  return (
    <Pressable onPress={pickImage}>
      <View style={styles.container}>
        <Text style={styles.text}>Upload Image</Text>
        <UploadIcon />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.white,
  },
  container: {
    flexDirection: "row",
    backgroundColor: Colors.violetDark,
    gap: Gaps.g8,
    borderRadius: Radius.r10,
    paddingHorizontal: 20,
    paddingVertical: 17,

    alignItems: "center",
  },
});
