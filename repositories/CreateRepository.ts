import { KEY_TENANT_REFERRER, TIMEOUT_REQUEST, WHITELIST_ERROR_KEY } from '@/constants/common';
import i18n from '@/shared/localization';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ERROR_CODE, URLS_IGNORE_AUTHEN, URLS_IGNORE_ERROR } from 'constants/httpResponse';
import { PUB_TOPIC } from 'constants/pubTopic';
import { mapValues } from 'lodash';
import { AuthSession } from 'model';
import PubSub from 'pubsub-js';
import { toast } from 'utils/ToastMessage';
import { getDataStorage, getSecretStorage, setSecretStorage } from '@/utils/KeychainHelper';
import { RefreshTokenRequestConfig, TokenResponse } from 'expo-auth-session';
import Config from '@/constants/config';

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
    // format response: {key: string, body: any}
    const messageKey = response.data?.key;
    if (messageKey) {
        const messageFormat = i18n.t(`success.${messageKey}`);
        toast.success(messageFormat);
    }
    return {
        ...response,
        data: response?.data.body,
    };
};

// config reasponse handler
axiosInstance.interceptors.response.use(responseHandler, undefined);

let sessionRequest: Promise<TokenResponse> | null = null;

const refreshToken = async (tokenResponse: TokenResponse) => {
    const refreshConfig: RefreshTokenRequestConfig = {
        clientId: Config.EXPO_PUBLIC_ZITADEL_CLIENT_ID!,
        refreshToken: tokenResponse.refreshToken,
    };

    if (!sessionRequest) {
        // Avoid multiple requests to refresh the token
        sessionRequest = tokenResponse.refreshAsync(refreshConfig, {
            tokenEndpoint: Config.EXPO_PUBLIC_ZITADEL_ISSUER + '/oauth/v2/token',
        });
    }
    const newToken = await sessionRequest;

    // Delete the promise from the cache after 10 seconds for the next requests to await the promise
    setTimeout(() => (sessionRequest = null), 1000 * 10);

    return newToken;
};

const getAuthToken = async (authInfo: AuthSession) => {
    const tokenResponse = new TokenResponse(authInfo);

    if (tokenResponse.shouldRefresh()) {
        const response = await refreshToken(tokenResponse);
        const sessionInfo = { ...authInfo, ...response.getRequestConfig() };

        await setSecretStorage(sessionInfo);
        return sessionInfo.accessToken;
    } else {
        return authInfo?.accessToken;
    }
};

export const fetcher = async <ResponseData = any>(
    url: string,
    config?: AxiosRequestConfig
): Promise<RequestResponse<ResponseData>> => {
    const authInfo: AuthSession = await getSecretStorage();

    const refererMapping = await getDataStorage(KEY_TENANT_REFERRER);

    const authToken = await getAuthToken(authInfo);

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
                Referer: `${refererMapping}`,
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
            let messageKey;
            let showMessage = true;
            if (error?.response?.status == ERROR_CODE.UNAUTHORIZED) {
                // 401
                // refresh token
                const refreshToken = authInfo?.refreshToken;
                if (refreshToken) {
                    messageKey = 'authentication-error';
                    PubSub.publish(PUB_TOPIC.UNAUTHORIZED_REQUEST);
                }
            } else if (error?.response?.status == ERROR_CODE.FORBIDDEN) {
                // 403
                messageKey = 'forbidden-error';
            } else if (error?.response?.status == ERROR_CODE.QUOTA_LIMIT_ERROR) {
                // quota limit
                showMessage = false;
                PubSub.publish(PUB_TOPIC.QUOTA_LIMIT_REQUEST);
            } else if (error?.response?.status === ERROR_CODE.ENTITY_TOO_LARGE) {
                // quota limit
                showMessage = false;
                PubSub.publish(PUB_TOPIC.ENTITY_TOO_LARGE);
            } else if (error?.response?.status >= 500) {
                // error network
                PubSub.publish(PUB_TOPIC.NETWORK_ERROR);
                messageKey = 'network-error';
            } else if (error?.response?.status !== undefined) {
                messageKey = error?.response?.data?.key || 'default-error';
            }
            if (showMessage && messageKey && !WHITELIST_ERROR_KEY.includes(messageKey)) {
                const messageFormat = i18n.t(`errors.${messageKey}`);
                toast.errorCustom(messageFormat);
            }
            return { error } as any;
        });
};
