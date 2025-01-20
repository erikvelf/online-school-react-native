import { View, Text, Alert, Image } from "react-native";
import { StyleSheet } from "react-native";
import ImageUploader from "../../shared/ImageUploader.tsx/ImageUploader";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../shared/Button/Button";
import { useEffect, useState } from "react";
import {
  useCameraPermissions,
  PermissionStatus,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import UserMenu from "../../widget/user/ui/UserMenu/UserMenu";
import { Gaps } from "../../shared/tokens";
import Avatar from "../../entities/user/ui/Avatar/Avatar";
import { useAtom } from "jotai";
import { updateProfileAtom } from "../../entities/user/model/user.state";
import { Path } from "react-native-svg";

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [profile, updateProfile] = useAtom(updateProfileAtom);

  useEffect(() => {
    if (profile && profile.profile?.photo) {
      setImage(profile.profile?.photo);
    }
  }, [profile]);

  const submitProfile = () => {
    if (!image) {
      return;
    }
    updateProfile({ photo: image });
  };

  return (
    <View>
      <View style={styles.container}>
        <Avatar image={image} />
        <ImageUploader
          onUpload={setImage}
          onError={(error) => console.log(error)}
        />
      </View>
      <Button text="Save" onPress={submitProfile} />
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
