import MaskedView from "@react-native-masked-view/masked-view";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Radius, Colors, Gaps } from "../tokens";
import { Tariff } from "../../entities/course/model/course.model";
import React from "react";

export function TariffStatus({ tariffs }: { tariffs: Tariff[] }) {
  return (
    <MaskedView
      maskElement={
        <Text style={styles.tariff}>
          Tariff &laquo;{tariffs ? tariffs[0].name : "non existent"}&raquo;
        </Text>
      }
    >
      <LinearGradient
        colors={["#D77BE5", "#6C38CC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={{ ...styles.tariff, ...styles.tariffWithOpacity }}>
          Tariff &laquo;{tariffs ? tariffs[0].name : ""}&raquo;
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  tariff: {
    marginTop: 10,
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
  },
  tariffWithOpacity: {
    opacity: 0,
  },
});
