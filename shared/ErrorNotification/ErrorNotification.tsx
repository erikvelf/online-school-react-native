// where ErrorNotificationProps are an Interface imported from another file:
import { Text, StyleSheet, Dimensions, Animated } from "react-native";
import type { ErrorNotificationProps } from "./ErrorNotificationProps";
import { useEffect, useState } from "react";
import { Colors, Fonts } from "../tokens";

export function ErrorNotification({ error }: ErrorNotificationProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  const animatedValue = new Animated.Value(-100);

  const onEnter = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (!error) {
      return undefined;
    }

    setIsShown(true);
    const timerId = setTimeout(() => setIsShown(false), 3000);

    return () => clearTimeout(timerId);
  }, [error]);

  if (!isShown) {
    return;
  }

  return (
    <Animated.View
      style={{ ...styles.error, transform: [{ translateY: animatedValue }] }}
      onLayout={onEnter}
    >
      <Text style={styles.errorText}>{error}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  error: {
    position: "absolute",
    width: Dimensions.get("window").width,
    backgroundColor: Colors.red,
    padding: 15,
    top: 50,
  },
  errorText: {
    fontSize: Fonts.f16,
    color: Colors.white,
    textAlign: "center",
    fontFamily: "FiraSans",
  },
});
