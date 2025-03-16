import { IThemeVariables } from '@/shared/theme/themes';
import { StyleSheet } from 'react-native';

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        container: {
            marginVertical: 8,
            marginHorizontal: -4,
            borderRadius: 8,
            minWidth: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        primaryButton: {
            backgroundColor: themeVariables.colors.primary,
        },
        primaryOutlineButton: {
            backgroundColor: themeVariables.colors.bgDefault,
            borderWidth: 1,
            borderColor: themeVariables.colors.primary,
        },
        deleteOutlineButton: {
            backgroundColor: themeVariables.colors.danger,
            borderWidth: 1,
            borderColor: themeVariables.colors.danger,
        },
        cancelButton: {
            backgroundColor: themeVariables.colors.bgDefault,
            borderColor: themeVariables.colors.borderButtonColor,
            borderWidth: 1,
        },
        cancelBlackButton: {
            backgroundColor: themeVariables.colors.bgRevert,
            borderColor: themeVariables.colors.bgDefault,
        },
        wrapChildren: {
            paddingVertical: 5,
        },
        label: {
            textAlign: 'center',
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.1,
            paddingVertical: 10,
            textTransform: 'none',
        },
        labelPrimaryButton: {
            color: themeVariables.colors.textOnImageStrong,
        },
        labelOutlinePrimaryButton: {
            color: themeVariables.colors.primary,
        },
        labelCancelButton: {
            color: themeVariables.colors.textDefault,
        },
        labelCancelBlackButton: {
            color: themeVariables.colors.textDefault,
        },
        labelDeleteOutlineButton: {
            color: themeVariables.colors.textOnImageStrong,
        },
        loadingWrapper: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        hiddenTextMain: {
            opacity: 0,
        },
        textLoading: {
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.1,
            marginRight: 5,
            paddingVertical: 10,
        },
        disableButton: {
            opacity: 0.7,
        },
    });

export default styling;
