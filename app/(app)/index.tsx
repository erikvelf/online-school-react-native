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

  const requestPermissions = async () => {
    return Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowSound: true,
        allowBadge: true,
      },
    });
  };

  const allowsNotification = async () => {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted ||
      settings.ios?.status == Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  };

  const scheduleNotification = async () => {
    const granted = await allowsNotification();
    if (!granted) {
      await requestPermissions();
    }
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New TypeScript",
        body: "Start learning now!",
        // When our notification will be processed by our app
        // 'data' can be any key value
        data: { alias: "typescript" },
      },
      // when our notification will trigger
      trigger: {
        type: "timeInterval",
        seconds: 5,
      },
    });
    console.log("notification scheduled");
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
