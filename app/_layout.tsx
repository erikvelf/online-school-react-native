import { Slot, SplashScreen, Stack, Tabs} from "expo-router";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Colors } from "../shared/tokens";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const insets = useSafeAreaInsets()

    const [loaded, error] = useFonts({
        FiraSans: require('../assets/fonts/fira-sans.regular.ttf'),
        FiraSansSemiBold: require('../assets/fonts/fira-sans.semibold.ttf')
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])


    useEffect(() => {
        if (error) {
            throw error
        }
    }, [error])
    
    return (
        <SafeAreaProvider>
            {/* Slot is a placeholder to load any page that now is rendered in the layout */}
            {/* <Slot/> */}
            {/* <Stack/> */}
            {/* <Tabs /> */}
            <StatusBar style="light"/>
            <Stack screenOptions={{
                headerShown: false,
                statusBarBackgroundColor: Colors.black,
                contentStyle: {
                    backgroundColor: Colors.black,
                    paddingTop: insets.top 
                }
            }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='restore'
                    options={{
                            title: 'Reset password',
                            presentation: 'modal',
                            contentStyle: {
                                backgroundColor: Colors.black,
                            }
                        }}
                />
            </Stack>

        </SafeAreaProvider>
    )
}