import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../../shared/tokens";
import CustomLink from "../../../../shared/customLink/CustomLink";

export function CustomDrawer(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}
    >
      <View>
        <Text>text</Text>
      </View>

      {/* future footer */}
      <View>
        <CustomLink title="Logout" href={"/login"} />
        <Image
          style={{ width: 200 }}
          source={require("../../../../assets/logo.png")}
          resizeMode="contain"
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
