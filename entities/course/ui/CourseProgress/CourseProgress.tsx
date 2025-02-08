import { Text, View, StyleSheet } from "react-native";
import { Progress } from "../../model/course.model";
import { Colors, Fonts, Radius } from "../../../../shared/tokens";

export function CourseProgress({
  progress,
  price,
  length,
}: {
  progress: Progress;
  length: number;
  price: number;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.progressPercent}>{progress.progressPercent}%</Text>
        <Text style={styles.progressCount}>
          {progress.userViewedLessonsCount}/{length}
        </Text>
      </View>

      <View style={styles.courseProgressBarContainer}>
        <View
          style={{
            ...styles.completedProgress,
            width: `${progress.progressPercent}%`,
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 18,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressPercent: {
    color: Colors.secondary,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
  },
  progressCount: {
    color: Colors.grayLight,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f12,
  },
  courseProgressBarContainer: {
    backgroundColor: Colors.gray,
    width: "100%",
    height: 4,
    borderRadius: Radius.r17,
  },
  completedProgress: {
    backgroundColor: Colors.secondary,
    height: "100%",
  },
});
