import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    style?: ViewStyle;
    children?: any;
};

const AppSafeAreaBottom: React.FC<Props> = ({ style, children, ...rest }) => {
    const insets = useSafeAreaInsets();
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);
    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }, style]} {...rest}>
            {children}
        </View>
    );
};

export default AppSafeAreaBottom;

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeVariables.colors.bgDefault,
        },
    });
