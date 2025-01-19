import { Text, Alert, Pressable, Linking } from "react-native";
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
import FormData from "form-data";
import axios, { AxiosError } from "axios";
import { FILE_API } from "../api";
import { UploadResponse } from "./ImageUploader.interface";

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

  const askToOpenSettings = async (message: string) => {
    Alert.alert(
      "Open settings", // Title of the alert
      message, // Message to display
      [
        {
          text: "No", // First option text
          onPress: () => {
            return;
          },
        },
        {
          text: "Yes", // Second option text
          onPress: () => Linking.openSettings(), // Action to perform when Option 2 is pressed
        },
      ],
      { cancelable: false },
    );
  };

  const verifyMediaPermissions = async () => {
    if (
      libraryPermissions?.status === PermissionStatus.UNDETERMINED &&
      libraryPermissions.accessPrivileges === "none"
    ) {
      const res = await requestLibraryPermissions();
      return res.granted;
    }

    if (
      libraryPermissions?.status === PermissionStatus.DENIED &&
      libraryPermissions?.accessPrivileges === "none"
    ) {
      await askToOpenSettings("To change media library permissions");
      return false;
    }
    return true;
  };

  const uploadToServer = async (
    uri: string,
    fileName: string,
  ): Promise<null | any> => {
    const formData = new FormData();
    formData.append("files", {
      uri,
      fileName,
      type: "image/jpeg",
    });

    try {
      const { data } = await axios.post<UploadResponse>(
        FILE_API.uploadImage,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      onUpload(data.urls.original);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
      }
      return null;
    }
  };

  const captureAvatar = async () => {
    const isPermissionGranted = await verifyCameraPermissions();
    if (!isPermissionGranted) {
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
    const isPermissionGranted = await verifyMediaPermissions();
    if (!isPermissionGranted) {
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

    const pickedImageData = result.assets[0];
    // nullish coalescing operator '??' providing a fallback value if the first value is null or undefined
    await uploadToServer(pickedImageData.uri, pickedImageData.fileName ?? "");
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
