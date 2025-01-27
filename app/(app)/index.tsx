import { StyleSheet, View } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import {
  courseAtom,
  loadCourseAtom,
} from "../../entities/course/model/course.state";
import { useEffect } from "react";
import { CourseCard } from "../../entities/course/ui/CourseCard";
import { FlatList } from "react-native";
import { StudentCourseDescription } from "../../entities/course/model/course.model";
import React from "react";

export default function MyCoursesPage() {
  const { isLoading, error, courses } = useAtomValue(courseAtom);
  const loadCourses = useSetAtom(loadCourseAtom);

  useEffect(() => {
    loadCourses();
  }, []);

  const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
    return (
      <View style={styles.item}>
        <CourseCard {...item} />
      </View>
    );
  };

  return (
    // using FlatList instead of ScrollView because it lazy-loads its elements
    <>
      {courses.length > 0 && (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCourse}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
});
