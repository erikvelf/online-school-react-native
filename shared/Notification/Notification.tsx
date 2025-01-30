import * as Notifications from "expo-notifications";
import React from "react";

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
  return <></>;
}
