import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import {
  courseAtom,
  loadCourseAtom,
} from "../../entities/course/model/course.state";
import { useEffect } from "react";
import { CourseCard } from "../../widget/course/ui/CourseCard/CourseCard";
import { FlatList } from "react-native";
import { StudentCourseDescription } from "../../entities/course/model/course.model";
import React from "react";
import { Colors } from "../../shared/tokens";
import { Button } from "../../shared/Button/Button";
// importing all code from expo-notifications
import * as Notifications from "expo-notifications";

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

  const scheduleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget to leart this course",
        body: "Don't forget to learn every day!",
        // When our notification will be processed by our app
        // 'data' can be any key value
        data: { success: true },
      },
      // when our notification will trigger
      trigger: {
        seconds: 5,
      },
    });
  };

  return (
    // using FlatList instead of ScrollView because it lazy-loads its elements
    <>
      <Button text="Notify" onPress={scheduleNotification} />
      {/* Showing activity indicator when courses are loading */}
      {isLoading && (
        <ActivityIndicator
          style={styles.activity}
          color={Colors.primary}
          size={"large"}
        />
      )}
      {/* Adding refreshControl to add 'pull to refresh' functionality */}
      {courses.length > 0 && (
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={loadCourses}
              tintColor={Colors.primary}
              refreshing={isLoading}
            />
          }
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
  activity: {
    marginTop: 40,
  },
});
