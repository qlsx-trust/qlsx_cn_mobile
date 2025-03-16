import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SuccessIcon from '@/assets/icons/success-notification.svg';

const renderCustomSuccess = (props: any) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);
    return (
        <View style={[styles.customToastContainer, styles.successToast]}>
            <SuccessIcon width={20} height={20} color={themeVariables.colors.textOnImageStrong} />
            <Text style={styles.customText}>{props.text1}</Text>
        </View>
    );
};

const renderCustomError = (props: any) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);
    return (
        <View style={[styles.customToastContainer, styles.errorToast]}>
            <FontAwesome
                name="times-circle"
                size={20}
                color={themeVariables.colors.textOnImageStrong}
            />
            <Text style={styles.customText}>{props.text1}</Text>
        </View>
    );
};

const renderCustomWarning = (props: any) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);
    return (
        <View style={[styles.customToastContainer, styles.warningToast]}>
            <AntDesign name="warning" size={20} color={themeVariables.colors.textOnImageStrong} />
            <Text style={styles.customText}>{props.text1}</Text>
        </View>
    );
};

const renderCustomInfo = (props: any) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);
    return (
        <View style={[styles.customToastContainer, styles.infoToast]}>
            <FontAwesome
                name="info-circle"
                size={20}
                color={themeVariables.colors.textOnImageStrong}
            />
            <Text style={styles.customText}>{props.text1}</Text>
        </View>
    );
};

export enum TOAST_STATUS {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
    SUCCESS_CUSTOM = 'successCustom',
    ERROR_CUSTOM = 'errorCustom',
    INFO_CUSTOM = 'infoCustom',
    SUCCESS_CUSTOM_SVG = 'successCustomSvg',
}

export const toastConfig = {
    [TOAST_STATUS.SUCCESS]: renderCustomSuccess,
    [TOAST_STATUS.INFO]: renderCustomInfo,
    [TOAST_STATUS.ERROR]: renderCustomError,
    [TOAST_STATUS.WARNING]: renderCustomWarning,
    [TOAST_STATUS.SUCCESS_CUSTOM]: renderCustomSuccess,
    [TOAST_STATUS.INFO_CUSTOM]: renderCustomInfo,
    [TOAST_STATUS.ERROR_CUSTOM]: renderCustomError,
};

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        toastContainer: {
            paddingHorizontal: 16,
        },
        toastTitle: {
            fontSize: 13,
            fontWeight: '500',
        },
        toastSubTitle: {
            fontSize: 12,
        },
        successToast: {
            backgroundColor: themeVariables.colors.bgGrey,
        },
        infoToast: {
            backgroundColor: themeVariables.colors.bgGrey,
        },
        errorToast: {
            backgroundColor: themeVariables.colors.bgGrey,
        },
        warningToast: {
            backgroundColor: themeVariables.colors.bgGrey,
            height: 'auto',
        },
        customToastContainer: {
            bottom: 80,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 20,
            overflow: 'hidden',
            minHeight: 55,
            maxHeight: 100,
            maxWidth: '95%',
            paddingLeft: 15,
            paddingRight: 5
        },
        customSuccessToast: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            height: 60,
            width: '100%',
        },
        icon: {
            marginLeft: 20,
        },
        customText: {
            paddingLeft: 10,
            fontSize: 14,
            color: themeVariables.colors.textOnImageStrong,
            marginRight: 15,
            paddingVertical: 5,
        },
    });
