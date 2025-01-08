import { Pressable, StyleSheet, View } from "react-native";
import CloseIcon from "../../../../assets/icons/close";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";

export function CloseDrawer(navigation: DrawerNavigationHelpers) {
  const closeDrawer = () => navigation.closeDrawer();
  return (
    <Pressable onPress={closeDrawer}>
      <View style={styles.button}>
        <CloseIcon />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 20,
  },
});
