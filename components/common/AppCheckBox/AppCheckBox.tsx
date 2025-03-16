import { useThemeContext } from '@/providers/ThemeProvider';
import React from 'react';
import BouncyCheckbox, { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox';

interface Props extends IBouncyCheckboxProps {
    value: boolean;
    size?: number;
    fillColor?: string;
    unfillColor?: string;
}

const AppCheckBox: React.FC<Props> = ({
    value,
    size = 20,
    fillColor = useThemeContext().themeVariables.colors.primary,
    unfillColor = useThemeContext().themeVariables.colors.bgDefault,
    ...props
}) => {
    return (
        <BouncyCheckbox
            size={size}
            isChecked={value}
            fillColor={fillColor}
            unfillColor={unfillColor}
            {...props}
        />
    );
};

export default AppCheckBox;
