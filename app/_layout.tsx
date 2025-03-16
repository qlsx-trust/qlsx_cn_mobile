import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SCREEN_KEY, SCREEN_STACK_DESCRIPTION } from '@/constants/common';
import { ThemeContexProvider } from '@/providers/ThemeProvider';
import { toastConfig } from '@/utils/ToastConfig';
import { onFetchUpdateAsync } from '@/utils/updateVersionHelper';
import { checkAppVersionHelper } from '@/utils/VersionAppHelper';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { AuthContextProvider } from '@/providers/UserProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/Montserrat/Montserrat-Black.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        if (!__DEV__) {
            onFetchUpdateAsync();
        }
    }, []);

    useEffect(() => {
        checkAppVersionHelper();
    }, []);

    // authenticate screen
    const screenToDisplay = () => {
        return Object.keys(SCREEN_KEY).map((screenKey: string) => (
            <Stack.Screen
                key={`screen-key-${screenKey}`}
                name={SCREEN_KEY[screenKey as keyof typeof SCREEN_KEY]}
                options={{
                    title: SCREEN_STACK_DESCRIPTION[screenKey],
                }}
            />
        ));
    };

    if (!loaded) {
        return null;
    }

    return (
        <ThemeContexProvider>
            <AuthContextProvider>
                <SafeAreaProvider>
                    <MenuProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <Stack
                                screenOptions={{
                                    headerShown: false,
                                }}
                            >
                                {screenToDisplay()}
                            </Stack>
                        </GestureHandlerRootView>
                        <Toast config={toastConfig} />
                    </MenuProvider>
                </SafeAreaProvider>
            </AuthContextProvider>
        </ThemeContexProvider>
    );
}
