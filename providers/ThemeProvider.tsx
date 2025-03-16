import { KEY_THEME_APP } from '@/constants/common';
import { IThemeVariables, THEME_WS, themeValues } from '@/shared/theme/themes';
import { getDataStorage } from '@/utils/KeychainHelper';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContexState {
    theme: string;
    setTheme?: (theme: string) => void;
    themeVariables: IThemeVariables;
}

const initialState: ThemeContexState = {
    theme: THEME_WS.LIGHT,
    themeVariables: themeValues[THEME_WS.LIGHT],
};

const ThemeContex = createContext<ThemeContexState>(initialState);

export const ThemeContexProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>(THEME_WS.LIGHT);

    useEffect(() => {
        const getThemeDefault = async () => {
            const themeStorage = await getDataStorage(KEY_THEME_APP);
            setTheme(themeStorage || THEME_WS.LIGHT);
        };
        getThemeDefault();
    }, []);

    const themeVariables = useMemo(() => {
        return themeValues[theme];
    }, [theme]);

    const themeContextValues = useMemo(
        () => ({ theme, setTheme, themeVariables }),
        [theme, themeVariables]
    );

    return <ThemeContex.Provider value={themeContextValues}>{children}</ThemeContex.Provider>;
};

export const useThemeContext = () => useContext(ThemeContex);
