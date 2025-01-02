import { View, Text } from "react-native";
import CustomLink from "../../shared/customLink/customLink";
import { useAtom, useSetAtom } from "jotai";
import { profileAtom } from "../../entities/user/model/user.state";
import axios from "axios";
import { API } from "../../entities/auth/api/api";
import { useEffect } from "react";
import { AuthResponse } from "../../entities/auth/model/auth.interfaces";
import { loginAtom, logoutAtom } from "../../entities/auth/model/auth.state";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyCoursesPage() {
  const [profile, setProfile] = useAtom(profileAtom);
  // useAtom hook returns a 'value' and a 'setValue' like in useState
  const [auth, login] = useAtom(loginAtom);
  // Getting only the setter function from the atom because it's read-only
  const logout = useSetAtom(logoutAtom);

  useEffect(() => {
    // Veryfying that logout() resets our access token
    logout();
    AsyncStorage.getItem("auth").then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <View>
      <Text>Index</Text>
      <CustomLink href="/login" title="Login" />
    </View>
  );
}
