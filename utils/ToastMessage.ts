import Toast from 'react-native-toast-message';
import { TOAST_STATUS } from './ToastConfig';

const toastMessage = (status: TOAST_STATUS, title: string, message?: string) => {
    const duration =
        title.split(/(\s+)/).filter((e) => e.trim().length > 0).length > 6 ? 5000 : 3000;
    Toast.show({
        type: status,
        text1: title,
        text2: message || undefined,
        visibilityTime: duration,
        position: 'bottom',
        swipeable: false,
    });
};

export const toast = {
    success: (title: string, message?: string) =>
        toastMessage(TOAST_STATUS.SUCCESS, title, message),
    error: (title: string, message?: string) => toastMessage(TOAST_STATUS.ERROR, title, message),
    info: (title: string, message?: string) => toastMessage(TOAST_STATUS.INFO, title, message),
    warning: (title: string, message?: string) =>
        toastMessage(TOAST_STATUS.WARNING, title, message),
    errorCustom: (title: string, message?: string) =>
        toastMessage(TOAST_STATUS.ERROR_CUSTOM, title, message),
    successCustom: (title: string, message?: string) =>
        toastMessage(TOAST_STATUS.SUCCESS_CUSTOM, title, message),
    infoCustom: (title: string, message?: string) =>
        toastMessage(TOAST_STATUS.INFO_CUSTOM, title, message),
};
