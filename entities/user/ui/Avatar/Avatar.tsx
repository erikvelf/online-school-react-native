import { Image, StyleSheet } from "react-native";
import React from "react";

export default function Avatar({ image }: { image: string | null }) {
  return (
    <>
      {image ? (
        <Image source={{ uri: image }} />
      ) : (
        <Image source={require("../../../../assets/images/avatar.png")} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    marginTop: 30,
    marginBottom: 40,
  },
});
