import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ERROR_CODE, URLS_IGNORE_AUTHEN, URLS_IGNORE_ERROR } from 'constants/httpResponse';
import { PUB_TOPIC } from 'constants/pubTopic';
import { mapValues } from 'lodash';
import PubSub from 'pubsub-js';
import { toast } from 'utils/ToastMessage';
import { getDataStorage, getSecretStorage, setSecretStorage } from '@/utils/KeychainHelper';
import Config from '@/constants/config';
import { TIMEOUT_REQUEST } from '@/constants/common';
import { IUserInfo } from '@/providers/UserProvider';

export type RequestResponse<ResponseData> = AxiosResponse<ResponseData> & {
    error?: any;
};

type InputFunction<P extends any[], D> = (fetch: typeof fetcher, ...args: P) => Promise<D>;

type CreateRepositoryInput = {
    [key: string]: InputFunction<any, any>;
};

type CreateRepositoryOutput<
    Input extends CreateRepositoryInput,
    Keys extends keyof Input = keyof Input,
> = {
    [P in Keys]: Input[P] extends InputFunction<infer P, infer D>
        ? (...args: P) => Promise<D>
        : never;
};

export default function createRepository<Input extends CreateRepositoryInput>(
    input: Input
): CreateRepositoryOutput<Input> {
    return mapValues(input, (resourceCreator) => {
        return (...args: any[]) => {
            return resourceCreator(fetcher, ...args);
        };
    }) as CreateRepositoryOutput<Input>;
}

const axiosInstance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

const responseHandler = (response: any) => {
    return {
        ...response,
        data: response?.data?.data,
    };
};

// config reasponse handler
axiosInstance.interceptors.response.use(responseHandler, undefined);


export const fetcher = async <ResponseData = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<RequestResponse<ResponseData>> => {
    const authInfo: IUserInfo = await getSecretStorage();

    const authToken = authInfo?.token;

    return axiosInstance
        .request<ResponseData>({
            ...config,
            url,
            params: {
                ...config?.params,
            },
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${authToken}`,
            },
            timeout: config?.timeout || TIMEOUT_REQUEST.NORMAL,
        })
        .catch(async (error: any) => {
            // case logout and check whitelist
            if (
                error?.response?.status == ERROR_CODE.UNAUTHORIZED &&
                error?.response?.request?.responseURL &&
                URLS_IGNORE_AUTHEN.findIndex(
                    (ur: string) => error?.response?.request?.responseURL.indexOf(ur) >= 0
                ) >= 0
            ) {
                return;
            }

            if (
                URLS_IGNORE_ERROR.findIndex(
                    (ur: string) => error?.response?.request?.responseURL.indexOf(ur) >= 0
                ) >= 0
            )
                return;
            // error other case
            if (error?.response?.status == ERROR_CODE.UNAUTHORIZED) {
                // 401
                // refresh token
                const refreshToken = authInfo?.refreshToken;
                PubSub.publish(PUB_TOPIC.UNAUTHORIZED_REQUEST);
            } 
            return { error } as any;
        });
};
