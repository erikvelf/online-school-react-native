import {
  Animated,
  PressableProps,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Colors, Fonts, Radius } from "../../../../shared/tokens";
import MenuIcon from "../../../../assets/icons/menu";
import { useState } from "react";

export function MenuButton({
  navigation,
  ...rest
}: PressableProps & { navigation: any }) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const startClickButton = () => {
    setIsClicked(() => !isClicked);
  };

  return (
    <Pressable
      onPressIn={startClickButton}
      onPressOut={startClickButton}
      onPress={navigation.toggleDrawer}
      {...rest}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: isClicked ? Colors.violetDark : Colors.blackLight,
        }}
      >
        <MenuIcon />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.r10,
    flex: 1,
  },
});
