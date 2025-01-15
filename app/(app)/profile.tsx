import { View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../shared/Button/Button";
import { useState } from "react";

export default function Profile() {
  const [image, setImage] = useState(null);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    console.log(result);
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button text="Select image" onPress={pickAvatar} />
    </View>
  );
}
