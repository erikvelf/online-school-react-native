import { Text, View, Image, StyleSheet } from "react-native";
import { StudentCourseDescription } from "../model/course.model";
import { Chip } from "../../../shared/Chip";
import { Button } from "../../../shared/Button/Button";
import { Colors, Fonts, Gaps, Radius } from "../../../shared/tokens";

export function CourseCard({
  image,
  title,
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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.chips}>
          {courseOnDirection.length > 0 &&
            courseOnDirection.map((c) => (
              <Chip key={c.direction.name} text={c.direction.name} />
            ))}
        </View>
      </View>
      <View style={styles.footer}>
        <Button text="Buy" />
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
    gap: Gaps.g10,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  footer: {
    backgroundColor: Colors.violetDark,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomLeftRadius: Radius.r10,
    borderBottomRightRadius: Radius.r10,
  },
});
