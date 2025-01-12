import {
  Animated,
  PressableProps,
  Pressable,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

export function Button({
  text,
  isLoading,
  ...rest
}: PressableProps & { text: string; isLoading?: boolean }) {
  const fadingSpeed: number = 100;
  const animatedValue = new Animated.Value(100);
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors.primaryHover, Colors.primary],
  });

  const fadeIn = () =>
    Animated.timing(animatedValue, {
      duration: fadingSpeed,
      toValue: 0,
      useNativeDriver: true,
    }).start();

  const fadeOut = () =>
    Animated.timing(animatedValue, {
      duration: fadingSpeed,
      toValue: 100,
      useNativeDriver: true,
    }).start();

  return (
    <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...rest}>
      <Animated.View style={{ ...styles.button, backgroundColor: color }}>
        {!isLoading && <Text style={styles.text}>{text}</Text>}
        {isLoading && <ActivityIndicator size={"large"} color={Colors.white} />}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.r10,
  },
  text: {
    color: Colors.white,
    fontWeight: "500",
    fontSize: Fonts.f18,
    fontFamily: Fonts.regular,
  },
});
