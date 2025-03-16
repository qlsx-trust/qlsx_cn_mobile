import { SCREEN_KEY } from '@/constants/common';
import { Redirect, useRootNavigationState } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function Page() {
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;

    return <Redirect href={SCREEN_KEY.home} />;
}
