import { View, Text } from "react-native";
import CustomLink from "../../shared/customLink/customLink";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { profileAtom } from "../../entities/user/model/user.state";
import axios from "axios";
import { API } from "../../entities/auth/api/api";
import { useEffect } from "react";
import { AuthResponse } from "../../entities/auth/model/auth.interfaces";
import {
  authAtom,
  loginAtom,
  logoutAtom,
} from "../../entities/auth/model/auth.state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRootNavigationState } from "expo-router";

export default function MyCoursesPage() {
  const { accessToken } = useAtomValue(authAtom);

  // A hook that allows us to mount our component after the RootLayout appears
  const state = useRootNavigationState();

  useEffect(() => {
    // Don't redirect until we have the key
    if (!state?.key) {
      return;
    }

    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, state]);

  return (
    <View>
      <Text>Index</Text>
    </View>
  );
}
