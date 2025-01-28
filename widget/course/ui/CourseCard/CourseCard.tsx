import { Text, View, Image, StyleSheet, Linking } from "react-native";
import { StudentCourseDescription } from "../../../../entities/course/model/course.model";
import { Chip } from "../../../../shared/Chip";
import { Button } from "../../../../shared/Button/Button";
import {
  Colors,
  Fonts,
  Gaps,
  Padding,
  Radius,
} from "../../../../shared/tokens";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { CourseProgress } from "../../../../entities/course/ui/CourseProgress/CourseProgress";

export function CourseCard({
  image,
  title,
  alias,
  tariffs,
  progress,
  price,
  length,
  id,
  courseOnDirection,
}: StudentCourseDescription) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        height={200}
      />
      <View style={styles.header}>
        <CourseProgress
          length={length}
          price={price}
          progress={progress}
          key={id}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.chips}>
          {courseOnDirection.length > 0 &&
            courseOnDirection.map(
              (c: { direction: Record<"name", string> }) => (
                <Chip key={c.direction.name} text={c.direction.name} />
              ),
            )}
        </View>

        {/* Gradient text for telling you tariff */}
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
      </View>

      <View style={styles.footer}>
        <Button
          text="Buy"
          onPress={() =>
            Linking.openURL(`https://purpleschool.ru/course/${alias}`)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: Radius.r10,
    backgroundColor: Colors.blackLight,
  },
  image: {
    borderRadius: Radius.r10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: Fonts.f21,
    color: Colors.white,
    fontFamily: Fonts.regularSemiBold,
    marginBottom: 12,
  },
  chips: {
    flexDirection: "row",
    gap: Gaps.g8,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    gap: Gaps.g16,
    paddingTop: 4,
  },
  footer: {
    backgroundColor: Colors.violetDark,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomLeftRadius: Radius.r10,
    borderBottomRightRadius: Radius.r10,
  },
  tariff: {
    marginTop: 10,
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
  },
  tariffWithOpacity: {
    opacity: 0,
  },
});
