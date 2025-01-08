import { View, Text } from "react-native";
import { useSetAtom } from "jotai";
import { logoutAtom } from "../../entities/auth/model/auth.state";
import { Button } from "../../shared/Button/Button";

export default function MyCoursesPage() {
  const logout = useSetAtom(logoutAtom);
  return (
    <View>
      <Text>Index</Text>
      <Button text="Logout" onPress={logout} />
    </View>
  );
}
