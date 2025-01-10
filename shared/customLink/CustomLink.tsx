import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { LinkProps } from "expo-router";
import { Colors, Fonts } from "../tokens";

export default function CustomLink(props: LinkProps & { title: string }) {
  const { title, ...rest } = props;
  return (
    <Link {...rest} style={styles.link}>
      <Text>{title}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    fontFamily: Fonts.regular,
    color: Colors.link,
    fontSize: Fonts.f18,
    alignSelf: "center",
    padding: 10,
  },
});
