import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../../../../entities/user/model/user.model";
import { Colors, Fonts, Gaps } from "../../../../shared/tokens";

export default function UserMenu({ user: user }: { user: User | null }) {
  //const userImage = photo?
  if (!user) {
    return;
  }

  return (
    <View style={styles.container}>
      {user.photo ? (
        <Image source={{ uri: user.photo }} />
      ) : (
        <Image source={require("../../../../assets/images/avatar.png")} />
      )}
      <Text style={styles.name}>{`${user.name} ${user.surname}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginTop: 30,
    marginBottom: 40,
  },
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
