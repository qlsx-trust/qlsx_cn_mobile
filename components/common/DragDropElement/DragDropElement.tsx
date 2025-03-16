import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet } from 'react-native';

type Props = {
    children: any;
    left?: number;
    bottom?: number;
};

const DragDropElement: React.FC<Props> = ({
    children,
    left = Dimensions.get('window').width - 80,
    bottom = 30,
}) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables, left, bottom);
    const positionAnimate = useRef(new Animated.ValueXY());
    const position = useRef({
        x: 0,
        y: 0,
    });

    const panResponder = useRef<any>(null);

    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        position.current = { x: 0, y: 0 };
        positionAnimate.current.addListener((value) => {
            position.current = value;
        });
        panResponder.current = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                setDragging(true);
                positionAnimate.current.setOffset({
                    x: position.current.x,
                    y: position.current.y,
                });
                positionAnimate.current.setValue({ x: 0, y: 0 });
            },
            onPanResponderRelease: () => {
                setDragging(false);
            },
            onPanResponderMove: Animated.event(
                [null, { dx: positionAnimate.current.x, dy: positionAnimate.current.y }],
                { useNativeDriver: false }
            ),
        });
    }, []);
    return (
        <>
            {/* create folder button */}
            <Animated.View
                style={[
                    styles.buttonWrap,
                    {
                        transform: positionAnimate.current.getTranslateTransform(),
                        opacity: dragging ? 0.8 : 1,
                    },
                ]}
                {...panResponder?.current?.panHandlers}
            >
                {children}
            </Animated.View>
        </>
    );
};

export const styling = (themeVariables: IThemeVariables, left: number, bottom: number) =>
    StyleSheet.create({
        buttonWrap: {
            width: 60,
            height: 60,
            shadowOffset: { width: 0, height: 4 },
            shadowColor: themeVariables.colors.black50,
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
            zIndex: 99,
            position: 'absolute',
            bottom: bottom,
            left: left,
        },
    });

export default DragDropElement;
