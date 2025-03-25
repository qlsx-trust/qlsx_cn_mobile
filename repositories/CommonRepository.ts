import Config from '@/constants/config';
import createRepository from './CreateRepository';

export const CommonRepository = createRepository({
    login(fetch, payload: any) {
        return fetch<any>(`${Config.EXPO_PUBLIC_BACKEND_URL}/api/v1/users/login`, {
            method: 'POST',
            data: payload,
        });
    },

    confirmMold(fetch, payload: any) {
        return fetch<any>(`${Config.EXPO_PUBLIC_BACKEND_URL}/api/v1/mold-assignment`, {
            method: 'POST',
            data: payload,
        });
    },
    confirmMaterialDrying(fetch, payload: any) {
        return fetch<any>(`${Config.EXPO_PUBLIC_BACKEND_URL}/api/v1/plastic-drying-material`, {
            method: 'POST',
            data: payload,
        });
    },
});
