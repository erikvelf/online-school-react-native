import { View, Text } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import { logoutAtom } from "../../entities/auth/model/auth.state";
import {
  courseAtom,
  loadCourseAtom,
} from "../../entities/course/model/course.state";
import { useEvent } from "expo";
import { useEffect } from "react";

export default function MyCoursesPage() {
  const { isLoading, error, courses } = useAtomValue(courseAtom);
  const loadCourses = useSetAtom(loadCourseAtom);

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <View>
      <Text>Index</Text>
      {courses.length > 0 &&
        courses.map((course) => {
          return (
            <View key={course.id}>
              <Text style={{ color: "white" }}>{course.title}</Text>
            </View>
          );
        })}
    </View>
  );
}
