import { Text, View, Image, StyleSheet } from "react-native";
import { StudentCourseDescription } from "../model/course.model";
import { Chip } from "../../../shared/Chip";
import { Button } from "../../../shared/Button/Button";
import { Colors, Gaps, Radius } from "../../../shared/tokens";

export function CourseCard({
  id,
  image,
  title,
  tariffs,
  progress,
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
            courseOnDirection.map((c) => <Chip text={c.direction.name} />)}
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
    backgroundColor: Colors.violetDark,
  },
  image: {},
  title: {},
  chips: {
    flexDirection: "row",
  },
  header: {},
  footer: {},
});
