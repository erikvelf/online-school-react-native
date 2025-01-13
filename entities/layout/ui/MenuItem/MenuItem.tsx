import { Image, View, Text, Pressable } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { Href, Link, LinkProps } from "expo-router";
import { StyleSheet } from "react-native";
import { ReactNode, useState } from "react";
import { PressableProps } from "react-native";
import { Colors, Fonts, Gaps, Padding } from "../../../../shared/tokens";

interface MenuItemProps {
  drawer: DrawerContentComponentProps;
  icon: ReactNode;
  text: string;
  path: string;
  isActive?: boolean;
}

export function MenuItem({
  drawer,
  icon,
  text,
  path,
  ...rest
}: MenuItemProps & PressableProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  // from all routes we select the currently focused route and compare it to the given path to apply a styling that shows if a MenuItem is selected
  const isActive = drawer.state.routes[drawer.state.index].name === path;

  const navigateToPath = () => {
    drawer.navigation.navigate(path);
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
          borderColor: isActive ? Colors.primary : Colors.black,
          backgroundColor:
            isClicked || isActive ? Colors.violetDark : Colors.black,
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
    borderRightWidth: 5,
  },
  text: {
    color: Colors.white,
    fontSize: Fonts.f20,
    fontFamily: Fonts.regular,
  },
});
