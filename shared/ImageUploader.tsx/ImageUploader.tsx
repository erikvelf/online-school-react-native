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
  onError: (error: string) => void;
}

export default function ImageUploader({
  onUpload,
  onError,
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [libraryPermissions, requestLibraryPermissions] =
    useMediaLibraryPermissions();

  const upload = async () => {
    const isPermissionGranted = await verifyMediaPermissions();
    if (!isPermissionGranted) {
      onError("Not enough permissions");
      return;
    }
    const asset = await pickImage();
    if (!asset) {
      onError("Image wasn't picked");
      return;
    }
    const uploadedUrl = await uploadToServer(asset.uri, asset?.fileName ?? "");
    if (!uploadedUrl) {
      onError("Failed to upload the image");
      return;
    }
    onUpload(uploadedUrl);
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
      return data.urls.original;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
      }
      return null;
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.assets) {
      return null;
    }
    return result.assets[0];
  };

  return (
    <Pressable onPress={upload}>
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
