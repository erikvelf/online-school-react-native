import { Share, View, StyleSheet } from "react-native";
import ImageUploader from "../../shared/ImageUploader.tsx/ImageUploader";
import { Button } from "../../shared/Button/Button";
import { useEffect, useState } from "react";
import { Gaps } from "../../shared/tokens";
import Avatar from "../../entities/user/ui/Avatar/Avatar";
import { useAtom } from "jotai";
import { updateProfileAtom } from "../../entities/user/model/user.state";
// import * as Sharing from "expo-sharing";

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

  const shareProfile = async () => {
    const shareOptions = {
      title: "Share this awesome course platform",
      message: "https://purpleschool.ru",
    };
    await Share.share(shareOptions);
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
      <Button text="Share" onPress={shareProfile} />
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
