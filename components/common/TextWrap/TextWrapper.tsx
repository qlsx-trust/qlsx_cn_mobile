import React from 'react';
import RNText, { IRNTextProps } from '@freakycoder/react-native-custom-text';
import { useThemeContext } from '@/providers/ThemeProvider';
/**
 * ? Local Imports
 */

interface ITextWrapperProps extends IRNTextProps {
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    children?: React.ReactNode;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

const TextWrapper: React.FC<ITextWrapperProps> = ({
    color,
    fontSize,
    fontWeight,
    textAlign,
    children,

    ...rest
}) => {
    const { themeVariables } = useThemeContext();

    return (
        <RNText
            color={color || themeVariables.colors.textDefault}
            {...rest}
            style={[
                {
                    fontSize,
                    fontWeight,
                    textAlign,
                    flexShrink: 1,
                },
                rest.style,
            ]}
        >
            {children}
        </RNText>
    );
};

export default TextWrapper;
