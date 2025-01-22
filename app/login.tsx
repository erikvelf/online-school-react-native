import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Input } from "../shared/Input/Input";
import { Colors, Fonts, Gaps, Padding } from "../shared/tokens";
import { Button } from "../shared/Button/Button";
import { ErrorNotification } from "../shared/ErrorNotification/ErrorNotification";
import { useEffect, useState } from "react";
import CustomLink from "../shared/customLink/CustomLink";
import { useAtom } from "jotai";
import { loginAtom } from "../entities/auth/model/auth.state";
import { router } from "expo-router";
import { useScreenOrientation } from "../shared/hooks";
import { Orientation } from "expo-screen-orientation";

export default function Login() {
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const orientation = useScreenOrientation();

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
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
        />
        <View style={styles.form}>
          <View
            style={{
              ...styles.inputs,
              flexDirection:
                orientation === Orientation.PORTRAIT_UP ? "column" : "row",
            }}
          >
            <Input
              style={{
                width:
                  orientation === Orientation.PORTRAIT_UP
                    ? "auto"
                    : Dimensions.get("window").width / 2 - 16 - 2 * 20,
              }}
              placeholder="email"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Input
              style={{
                width:
                  orientation === Orientation.PORTRAIT_UP
                    ? "auto"
                    : Dimensions.get("window").width / 2 - 16 - 2 * 20,
              }}
              isPassword
              placeholder="password"
              onChangeText={setPassword}
            />
          </View>

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
    fontFamily: Fonts.regularSemiBold,
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
  inputs: {
    gap: Gaps.g16,
  },
  input: {
    width: Dimensions.get("window").width / 2 - 16 - 2 * 20,
  },
});
