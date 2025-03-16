import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ThreeDotsAnimation = () => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);

    const pulseValues = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        animatePulse();
    }, []);

    const animatePulse = () => {
        pulseValues.forEach((value, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(value, {
                        toValue: 1,
                        duration: 1200 + index * 200, // Adjust timing for each dot
                        useNativeDriver: true,
                    }),
                    Animated.timing(value, {
                        toValue: 0,
                        duration: 1200 + index * 200, // Adjust timing for each dot
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.dotContainer}>
                <Animated.View style={[styles.dot, styles.dot1, { opacity: pulseValues[0] }]} />
                <Animated.View style={[styles.dot, styles.dot2, { opacity: pulseValues[1] }]} />
                <Animated.View style={[styles.dot, styles.dot3, { opacity: pulseValues[2] }]} />
            </View>
        </View>
    );
};

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        dotContainer: {
            flexDirection: 'row',
            marginTop: 14,
        },
        dot: {
            width: 4,
            height: 4,
            borderRadius: 4,
            backgroundColor: themeVariables.colors.textOnImageStrong,
            marginHorizontal: 2,
        },
        dot1: {
            opacity: 0.5,
        },
        dot2: {
            opacity: 0.7,
        },
        dot3: {
            opacity: 1,
        },
    });

export default ThreeDotsAnimation;
