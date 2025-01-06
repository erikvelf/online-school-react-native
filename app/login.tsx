import { Image, StyleSheet, View } from "react-native";
import { Input } from "../shared/Input/input";
import { Colors, Padding } from "../shared/tokens";
import { Button } from "../shared/Button/button";
import { ErrorNotification } from "../shared/ErrorNotification/errorNotification";
import { useEffect, useState } from "react";
import CustomLink from "../shared/customLink/customLink";
import { useAtom } from "jotai";
import { loginAtom } from "../entities/auth/model/auth.state";
import { router } from "expo-router";

export default function Login() {
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [{ accessToken, error, isLoading }, login] = useAtom(loginAtom);

  useEffect(() => {
    if (accessToken) {
      router.replace("/");
    }
  }, [accessToken]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const submitCredentials = () => {
    // Popup an error notification one or both information fields are empty
    if (!email || !password) {
      if (!email && !password) {
        setLocalError("Email and password not inserted");
      } else if (!email) {
        setLocalError("Email not inserted");
      } else {
        setLocalError("Password not inserted");
      }
      return;
    }

    login({ email: email, password: password });
  };

  return (
    <View style={styles.container}>
      <ErrorNotification error={localError} />
      <View style={styles.content}>
        <Image
          style={{ width: 200 }}
          source={require("../assets/app/logo.png")}
          resizeMode="contain"
        />
        <View style={styles.form}>
          <Input
            placeholder="email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Input isPassword placeholder="password" onChangeText={setPassword} />

          <Button
            isLoading={isLoading}
            text="Login"
            onPress={submitCredentials}
          />

          <CustomLink href={"/restore"} title={"Restore Password"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    fontFamily: "Fira-Sans-Semibold",
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: Padding.p48,
  },
  form: {
    alignSelf: "stretch",
    gap: 16,
  },
});
