import { StyleSheet, View, ScrollView } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import {
  courseAtom,
  loadCourseAtom,
} from "../../entities/course/model/course.state";
import { useEffect } from "react";
import { CourseCard } from "../../entities/course/ui/CourseCard";
import { Gaps } from "../../shared/tokens";

export default function MyCoursesPage() {
  const { isLoading, error, courses } = useAtomValue(courseAtom);
  const loadCourses = useSetAtom(loadCourseAtom);

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {courses.length > 0 &&
          courses.map((course) => (
            <CourseCard key={course.id} {...course} title={course.shortTitle} />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: Gaps.g20,
    padding: 20,
  },
});
