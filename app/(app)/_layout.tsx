import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { authAtom } from "../../entities/auth/model/auth.state";
import { Drawer } from "expo-router/drawer";
import { Colors, Fonts } from "../../shared/tokens";
import MenuIcon from "../../assets/icons/menu";

export default function AppLayout() {
  // Promp user to login if he isn't (without rendering the rest of the page)
  const { accessToken } = useAtomValue(authAtom);
  if (!accessToken) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.blackLight,
        },
        headerLeft: () => {
          return <MenuIcon />;
        },
        headerTitleStyle: {
          color: Colors.white,
          fontFamily: "FiraSans",
          fontSize: Fonts.f20,
        },
        headerTitleAlign: "center",
        sceneStyle: {
          backgroundColor: Colors.black,
        },
      })}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "My courses",
        }}
      />
    </Drawer>
  );
}
