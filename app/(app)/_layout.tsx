import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { authAtom } from "../../entities/auth/model/auth.state";

export default function AppLayout() {
  // Promp user to login if he isn't (without rendering the rest of the page)
  const { accessToken } = useAtomValue(authAtom);
  if (!accessToken) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
