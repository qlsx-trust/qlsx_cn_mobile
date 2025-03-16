import { useThemeContext } from '@/providers/ThemeProvider';
import { Switch, SwitchProps } from 'react-native';

export const ToggleSwitch = ({ value, trackColor, ...props }: SwitchProps) => {
    const { themeVariables } = useThemeContext();

    const getThumbColor = () => {
        if (value) {
            return props.disabled
                ? themeVariables.colors.iconDisabled
                : themeVariables.colors.primary;
        }
        return themeVariables.colors.textOnImageStrong;
    };

    return (
        <Switch
            value={value}
            trackColor={{
                false: themeVariables.colors.secondary700,
                true: themeVariables.colors.secondary700,
            }}
            ios_backgroundColor={themeVariables.colors.secondary700}
            thumbColor={getThumbColor()}
            {...props}
            style={[
                {
                    borderWidth: 1,
                    borderColor: themeVariables.colors.outLineDefault,
                    borderRadius: 16,
                },
                props.style,
            ]}
        />
    );
};
