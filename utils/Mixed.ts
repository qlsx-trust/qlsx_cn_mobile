import { OS } from '@/constants/common';
import { Platform } from 'react-native';

export const capitalizeFirstLetter = (str: string) => {
    return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

export const isAndroid = Platform.OS === OS.ANDROID;
export const isIOS = Platform.OS === OS.IOS;

export async function PromiseAllSettled(promises: Promise<any>[]) {
    try {
        const resAll = await Promise.allSettled(promises);
        return resAll.map((r) => (r.status === 'fulfilled' ? r.value : ({} as any)));
    } catch (e) {
        return [];
    }
}

export const isRouteActive = (pathName: string, key: string) => {
    return pathName.startsWith(`/${key}`);
};
