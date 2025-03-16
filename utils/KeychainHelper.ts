import { KEY_AUTH_TOKEN } from '@/constants/common';
import * as SecureStore from 'expo-secure-store';

export const setSecretStorage = async (data: any) => {
    try {
        await SecureStore.setItemAsync(KEY_AUTH_TOKEN, JSON.stringify(data));
    } catch (error) {
        console.log('setSecretStorage Error: ', error);
    }
};

export const setDataStorage = async (key: string, data: any) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(data));
    } catch (error) {
        console.log('setDataStorage Error: ', error);
    }
};

export const getDataStorage = async (key: string) => {
    try {
        const data: any = await SecureStore.getItemAsync(key);

        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.log('@getDataStorage Error: ', error);
    }
};

export const getSecretStorage = async () => {
    try {
        const credentials: any = await SecureStore.getItemAsync(KEY_AUTH_TOKEN);

        return credentials ? JSON.parse(credentials) : null;
    } catch (error) {
        console.log('@getSecretStorage Error: ', error);
    }
};

export const clearSecretStorage = async () => {
    try {
        await SecureStore.deleteItemAsync(KEY_AUTH_TOKEN);
    } catch (error) {
        console.log('@@clearSecretStorage Error: ', error);
    }
};

export const clearDataStorage = async (key: string) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('@@clearSecretStorage Error: ', error);
    }
};
