import { View, Text } from "react-native";
import CustomLink from "../../shared/customLink/customLink";
import { useAtom } from "jotai";
import { profileAtom } from "../../entities/user/model/user.state";
import axios from "axios";
import { API } from "../../entities/auth/api/api";
import { useEffect } from "react";
import { AuthResponse } from "../../entities/auth/model/auth.interfaces";
import { loginAtom } from "../../entities/auth/model/auth.state";

export default function MyCoursesPage() {
  const [profile, setProfile] = useAtom(profileAtom);
  // useAtom hook returns a value an an setValue like in useState
  const [auth, login] = useAtom(loginAtom);

  useEffect(() => {
    console.log("Sending login details");
    login({ email: "test@test.com", password: "password1234" });
  }, []);

  return (
    <View>
      <Text>Auth token: {auth?.accessToken}</Text>
      <CustomLink href="/login" title="Login" />
    </View>
  );
}
