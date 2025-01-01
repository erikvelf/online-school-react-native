import { Image, StyleSheet, Text, View } from "react-native";
import CustomLink from "../shared/customLink/customLink";
import { Colors, Fonts, Padding } from "../shared/tokens";

export default function UnmatchedCustom() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/not-found.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.text}>
        Ooo... something went wrong. Try to go back to the app's main screen
      </Text>
      <CustomLink href={"/"} title={"Go to the main screen"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: Padding.p48,
  },
  image: {
    width: 204,
    height: 282,
  },
  text: {
    color: Colors.white,
    fontSize: Fonts.f18,
    textAlign: "center",
  },
});
