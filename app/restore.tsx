import { View, Text } from "react-native";
import { Link, Stack } from "expo-router";
import { Colors } from "../shared/tokens";
import { Button } from "../shared/Button/button";

export default function Restore() {
  return (
    <View>
      <Link href={"/"}>
        <Text style={{ color: "white" }}>Restore password</Text>
        <Button text="Go back to login page" />
      </Link>
    </View>
  );
}
