import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";

export function Notification() {
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
    const sub = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification.request.content.data);
      },
    );

    return () => {
      sub.remove();
    };
  }, []);

  return <></>;
}
