import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import EyeOpenedIcon from "../../assets/icons/eye-open";
import EyeClosedIcon from "../../assets/icons/eye-closed";
import { Colors, Fonts, Radius } from "../tokens";

export function Input(props: TextInputProps & { isPassword?: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { isPassword, style, ...rest } = props;

  const toggleIsPasswordVisible = () => {
    setIsPasswordVisible((state) => !state);
  };

  return (
    <View style={style}>
      <TextInput
        style={styles.input}
        {...rest}
        secureTextEntry={isPassword && !isPasswordVisible}
        placeholderTextColor={Colors.gray}
      />

      {isPassword && (
        <Pressable style={styles.eyeIcon} onPress={toggleIsPasswordVisible}>
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.violetDark,
    fontSize: Fonts.f16,
    height: 48,
    paddingHorizontal: 48,
    borderRadius: Radius.r10,
    color: Colors.white,
    fontFamily: Fonts.regular,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    //bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
