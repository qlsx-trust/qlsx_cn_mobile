import { useThemeContext } from '@/providers/ThemeProvider';
import { ActivityIndicator, View } from 'react-native';

const Loading = ({
    size,
    icon = false,
    color,
}: {
    size?: number;
    icon?: boolean;
    color?: string;
}) => {
    const { themeVariables } = useThemeContext();

    return (
        <View
            style={[
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                icon && size
                    ? { width: size, height: size }
                    : { flex: 1, width: '100%', height: '100%' },
            ]}
        >
            <ActivityIndicator
                color={color || themeVariables.colors.bgRevert}
                size={size || 'large'}
            />
        </View>
    );
};

export default Loading;
