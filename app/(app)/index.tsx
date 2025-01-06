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
import { Button } from "../../shared/Button/button";

export default function MyCoursesPage() {
  const logout = useSetAtom(logoutAtom);
  return (
    <View>
      <Text>Index</Text>
      <Button text="Logout" onPress={logout} />
    </View>
  );
}
