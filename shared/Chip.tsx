import { View, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Radius } from "./tokens";
export function Chip({ text }: { text: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: Colors.violetDark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: Colors.border,
    borderRadius: Radius.r17,
    borderWidth: 1,
    borderStyle: "solid",
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.white,
  },
});
