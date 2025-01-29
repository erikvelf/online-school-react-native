import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";
import { authAtom } from "../../entities/auth/model/auth.state";
import { Drawer } from "expo-router/drawer";
import { Colors, Fonts } from "../../shared/tokens";
import { MenuButton } from "../../features/layout/ui/MenuButton/MenuButton";
import { CustomDrawer } from "../../widget/layout/ui/CustomDrawer/CustomDrawer";
import React from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  // NOTE that the object is wrapped in '()' to tell that the function returns an object
  handleNotification: async () => ({
    // an object that tells how do we handle notifications
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
});

export default function AppLayout() {
  // Promp user to login if he isn't (without rendering the rest of the page)
  const { accessToken } = useAtomValue(authAtom);
  if (!accessToken) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.blackLight,
        },
        headerLeft: () => {
          return <MenuButton navigation={navigation} />;
        },
        headerTitleStyle: {
          color: Colors.white,
          fontFamily: Fonts.regular,
          fontSize: Fonts.f20,
        },
        headerTitleAlign: "center",
        sceneStyle: {
          backgroundColor: Colors.black,
        },
        drawerContentStyle: {
          backgroundColor: Colors.black,
        },
        drawerItemStyle: {
          marginLeft: 0,
          width: "100%",
        },
      })}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "My courses",
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Drawer>
  );
}
