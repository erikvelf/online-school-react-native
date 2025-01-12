import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Button } from "../shared/Button/Button";

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
