import { BUTTON_COMMON_TYPE, BUTTON_LOADING_ICON_COLOR } from '@/constants/common';
import { useThemeContext } from '@/providers/ThemeProvider';
import React from 'react';
import {
    ActivityIndicator,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import styling from './styles';

type Props = {
    label?: string;
    onPress: () => void;
    viewStyle?: ViewStyle;
    labelStyle?: TextStyle;
    type?: string;
    disabled?: boolean;
    variant?: string;
    children?: any;
    isLoading?: boolean;
};

const AppButton: React.FC<Props> = ({
    label,
    onPress,
    labelStyle,
    viewStyle,
    disabled = false,
    variant = 'primary',
    children,
    isLoading,
}) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);

    const buttonPresent = () => {
        switch (variant) {
            case BUTTON_COMMON_TYPE.DELETE_WITH_CHILDREN:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.deleteOutlineButton,
                            viewStyle,
                            disabled && styles.disableButton,
                            disabled && {
                                backgroundColor: themeVariables.colors.btnDangerDisabled,
                                borderWidth: 0,
                            },
                        ]}
                    >
                        <View
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.container,
                                styles.wrapChildren,
                            ]}
                        >
                            {children}
                        </View>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            case BUTTON_COMMON_TYPE.PRIMARY_WITH_CHILDREN:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.primaryButton,
                            viewStyle,
                            disabled && styles.disableButton,
                        ]}
                    >
                        <View
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.container,
                                styles.wrapChildren,
                            ]}
                        >
                            {children}
                        </View>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            case BUTTON_COMMON_TYPE.PRIMARY_OUTLINE_WITH_CHILDREN:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.primaryOutlineButton,
                            viewStyle,
                            disabled && styles.disableButton,
                        ]}
                    >
                        <View
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.container,
                                styles.wrapChildren,
                            ]}
                        >
                            {children}
                        </View>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            case BUTTON_COMMON_TYPE.CANCEL:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.cancelButton,
                            viewStyle,
                            disabled && styles.disableButton,
                        ]}
                    >
                        <Text
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.labelCancelButton,
                                styles.label,
                                labelStyle,
                            ]}
                        >
                            {label}
                        </Text>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            case BUTTON_COMMON_TYPE.CANCEL_BLACK:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.cancelBlackButton,
                            viewStyle,
                            disabled && styles.disableButton,
                        ]}
                    >
                        <Text
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.labelCancelBlackButton,
                                styles.label,
                                labelStyle,
                            ]}
                        >
                            {label}
                        </Text>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            case BUTTON_COMMON_TYPE.CANCEL_WITH_CHILDREN:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.cancelButton,
                            viewStyle,
                            disabled && styles.disableButton,
                            { flexDirection: 'row', gap: 2, justifyContent: 'center' },
                        ]}
                    >
                        {!isLoading && children}
                        <Text
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.labelCancelButton,
                                styles.label,
                                labelStyle,
                            ]}
                        >
                            {label}
                        </Text>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            case BUTTON_COMMON_TYPE.PRIMARY_OUTLINE:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.primaryOutlineButton,
                            viewStyle,
                            disabled && styles.disableButton,
                        ]}
                    >
                        <Text
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.labelOutlinePrimaryButton,
                                styles.label,
                                labelStyle,
                            ]}
                        >
                            {label}
                        </Text>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={onPress}
                        style={[
                            styles.container,
                            styles.primaryButton,
                            viewStyle,
                            disabled && styles.disableButton,
                        ]}
                    >
                        <Text
                            style={[
                                isLoading && styles.hiddenTextMain,
                                styles.labelPrimaryButton,
                                styles.label,
                                labelStyle,
                            ]}
                        >
                            {label}
                        </Text>
                        {isLoading && (
                            <View style={[styles.loadingWrapper]}>
                                <ActivityIndicator color={BUTTON_LOADING_ICON_COLOR[variant]} />
                            </View>
                        )}
                    </TouchableOpacity>
                );
        }
    };

    return <>{buttonPresent()}</>;
};

export default AppButton;
