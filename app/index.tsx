import LoadingScreen from '@/components/LoadingScreem';
import { SCREEN_KEY } from '@/constants/common';
import { useAuthContext } from '@/providers/UserProvider';
import { Redirect, useRootNavigationState } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function Page() {
    const rootNavigationState = useRootNavigationState();
    const { loading, session } = useAuthContext();

    if (!rootNavigationState?.key) return null;
    if (!loading && session) {
        return <Redirect href={SCREEN_KEY.home} />;
    }

    return <LoadingScreen />;
}
