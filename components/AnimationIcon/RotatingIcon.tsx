import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleProp, ViewStyle } from 'react-native';

interface RotatingIconProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const RotatingIcon: React.FC<RotatingIconProps> = ({ children, style }) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        spin();
    }, []);

    const spin = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => spin());
    };

    const spinInterpolated = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={[style]}>
            <Animated.View style={{ transform: [{ rotate: spinInterpolated }] }}>
                {children}
            </Animated.View>
        </View>
    );
};

export default RotatingIcon;
