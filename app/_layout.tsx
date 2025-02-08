import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Colors } from "../shared/tokens";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Notification } from "../shared/Notification/Notification";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [loaded, error] = useFonts({
    FiraSans: require("../assets/fonts/FiraSans-Regular.ttf"),
    FiraSansSemiBold: require("../assets/fonts/FiraSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <SafeAreaProvider>
      {/* Notification is a handler for in app notifications */}
      <Notification />

      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarBackgroundColor: Colors.black,
          contentStyle: {
            backgroundColor: Colors.black,
            paddingTop: insets.top,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="restore"
          options={{
            title: "Reset password",
            presentation: "modal",
            contentStyle: {
              backgroundColor: Colors.black,
            },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
