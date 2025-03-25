import { SCREEN_KEY, UserRole } from '@/constants/common';
import { clearSecretStorage, getSecretStorage } from '@/utils/KeychainHelper';
import { router, usePathname } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

import PubSub from 'pubsub-js';
import { PUB_TOPIC } from '@/constants/pubTopic';

const initialState: StateType = {
    user: null,
    session: null,
    loading: true,
    setUser() {},
    setSession() {},
    logout() {},
};

export const AuthContext = createContext<StateType>(initialState);

export interface IUserInfo {
    token: string;
    refreshToken: string;
    userName: string;
    role: UserRole;
    tokenValidTo: Date;
    refreshTokenValidTo: Date;
}

type StateType = {
    user: IUserInfo | null;
    session: IUserInfo | null;
    loading: boolean;
    setUser(user: IUserInfo | null): void;
    logout(): void;
    setSession(session: IUserInfo | null): void;
};

export interface UserProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<IUserInfo | null>(null);
    const [session, setSession] = useState<IUserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const pathName = usePathname();
    const appState = useRef(AppState.currentState);
    const pathNameRef = useRef<string>('');

    useEffect(() => {
        pathNameRef.current = pathName;
    }, [pathName]);

    const getSessionUserFromStorage = async () => {
        try {
            setLoading(true);
            const authInfo: any = await getSecretStorage();

            if (!authInfo) {
                logout();
                return;
            }
            setSession(authInfo);
        } catch (error) {
            console.log('@@getSessionUserFromStorage Error: ', error);
            setSession(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSessionUserFromStorage();
    }, []);

    const logout = async () => {
        await clearSecretStorage();
        setSession(null);
        setUser(null);
        setLoading(false);

        router.replace(SCREEN_KEY.login);
    };

    // ========== Handle logout when not authorize ============
    useEffect(() => {
        PubSub.subscribe(PUB_TOPIC.UNAUTHORIZED_REQUEST, logout);
    }, []);

    const userContextValues = useMemo(
        () => ({
            user,
            session,
            loading,
            setUser,
            logout,
            setSession,
        }),
        [user, session, loading, logout]
    );

    return <AuthContext.Provider value={userContextValues}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error('useAuthContext should be used within a AuthContextProvider ');

    return context;
};
