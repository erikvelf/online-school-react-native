import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function CoursePage() {
  const { alias } = useLocalSearchParams();
  return (
    <View>
      <Text style={{ color: "white" }}>{alias}</Text>
    </View>
  );
}
