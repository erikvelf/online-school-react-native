import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export function Notification() {
  const router = useRouter();
  Notifications.setNotificationHandler({
    // NOTE that the object is wrapped in '()' to tell that the function returns an object
    handleNotification: async () => ({
      // an object that tells how do we handle notifications
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    }),
  });

  useEffect(() => {
    const subReceived = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification.request.content.data);
      },
    );

    const subResponseReceived =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        const courseAlias = notification.notification.request.content.alias;
        router.push(`/(app)/course/${courseAlias}`);
      });

    return () => {
      subReceived.remove();
      subResponseReceived.remove();
    };
  }, []);

  return <></>;
}
