import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../../shared/tokens";
import CustomLink from "../../../../shared/customLink/CustomLink";
import { CloseDrawer } from "../CloseDrawer/CloseDrawer";
import { useAtom, useSetAtom } from "jotai";
import { logoutAtom } from "../../../auth/model/auth.state";
import { loadProfileAtom } from "../../../user/model/user.state";
import { useEffect } from "react";
import UserMenu from "../../../user/ui/UserMenu";
import { MenuItem } from "../MenuItem/MenuItem";

import ProfileIcon from "../../../../assets/menu/profile";
import CoursesIcon from "../../../../assets/menu/courses";
import ClubIcon from "../../../../assets/menu/club";

export function CustomDrawer(props: DrawerContentComponentProps) {
  const logout = useSetAtom(logoutAtom);
  const [profile, loadProfile] = useAtom(loadProfileAtom);

  const Menu = [
    { text: "Profile", icon: <ProfileIcon />, path: "/(app)" },
    { text: "Courses", icon: <CoursesIcon />, path: "/profile" },
    { text: "Club", icon: <ClubIcon />, path: "/club" },
  ];

  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.content}>
        <CloseDrawer {...props.navigation} />
        <UserMenu user={profile.profile} />

        <View>
          {Menu.map((menuProps) => (
            <MenuItem
              key={menuProps.path}
              {...menuProps}
              navigation={props.navigation}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <CustomLink title="Logout" href={"/login"} onPress={logout} />
        <Image
          style={styles.logo}
          source={require("../../../../assets/images/logo.png")}
          resizeMode="contain"
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
  },
  footer: {
    gap: 50,
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 160,
  },
});
