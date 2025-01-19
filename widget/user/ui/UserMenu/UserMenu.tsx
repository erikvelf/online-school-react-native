import { View, Text, StyleSheet } from "react-native";
import { User } from "../../../../entities/user/model/user.model";
import { Colors, Fonts, Gaps } from "../../../../shared/tokens";
import Avatar from "../../../../entities/user/ui/Avatar/Avatar";

export default function UserMenu({ user: user }: { user: User | null }) {
  if (!user) {
    return;
  }
  return (
    <View style={styles.container}>
      <Avatar image={user.photo ?? null} />
      <Text style={styles.name}>{`${user.name} ${user.surname}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: Gaps.g16,
  },
  name: {
    color: Colors.white,
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
  },
});
