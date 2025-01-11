import { Image, View, Text, Pressable } from "react-native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { Href, Link, LinkProps } from "expo-router";
import { StyleSheet } from "react-native";
import { ReactNode, useState } from "react";
import { PressableProps } from "react-native";
import { Colors, Fonts, Gaps, Padding } from "../../../../shared/tokens";

interface MenuItemProps {
  navigation: DrawerNavigationHelpers;
  icon: ReactNode;
  text: string;
  path: string;
  isActive?: boolean;
}

export function MenuItem({
  navigation,
  icon,
  text,
  path,
  isActive,
  ...rest
}: MenuItemProps & PressableProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const navigateToPath = () => {
    navigation.navigate(path);
  };
  return (
    <Pressable
      {...rest}
      onPress={navigateToPath}
      onPressIn={() => setIsClicked(true)}
      onPressOut={() => setIsClicked(false)}
    >
      <View
        style={{
          ...styles.menuItem,
          backgroundColor: isClicked ? Colors.violetDark : Colors.black,
        }}
      >
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
  menuItem: {
    flexDirection: "row",
    gap: Gaps.g20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontSize: Fonts.f20,
    fontFamily: Fonts.regular,
  },
});
