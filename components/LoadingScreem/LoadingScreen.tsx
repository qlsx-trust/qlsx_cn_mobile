import SplashImage from '@/assets/splash.svg';
import ThreeDotsAnimation from '@/components/AnimationIcon/ThreeDotsPulse';
import TextWrap from '@/components/common/TextWrap';
import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
const Splash = require('@/assets/splash.png');

const LoadingScreen = () => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);

    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={Splash}>
                <View style={styles.wrapContent}>
                    <TextWrap
                        color={themeVariables.colors.textOnImageStrong}
                        style={styles.textHeader}
                    >
                        Vui lòng chờ trong giây lát, chúng tôi đang chuẩn bị dữ liệu ứng dụng
                    </TextWrap>
                    <ThreeDotsAnimation />
                </View>
            </ImageBackground>
        </View>
    );
};

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 100,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height,
        },
        backgroundImage: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            top: 0,
            left: 0,
            backgroundColor: themeVariables.colors.textDefault,
        },
        image: {
            flex: 1,
            width: '100%',
        },
        wrapContent: {
            position: 'absolute',
            top: '45%',
        },

        textHeader: {
            fontSize: 13,
            fontStyle: 'normal',
            fontWeight: '600',
            maxWidth: 250,
            textAlign: 'center',
        },
    });

export default LoadingScreen;
