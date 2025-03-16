export const THEME_WS = {
    LIGHT: 'light',
    DARK: 'dark',
};

export const palette = {
    primary: '#427BBF',
    primary200: '#7bb6df',
    secondary: '#ff6a00',
    danger: '#E03C1B',
    danger100: '#FCECE8',
    success: '#25B773',
    info: '#1f78ad',
    light: '#F0F6FF',

    white: '#FFFFFF',
    black: '#62626B',
    yellow: '#f5b642',
    black50: '#2C2C33',

    secondary50: '#FAFAFA',
    secondary700: '#F4F4F5',

    bgDefault: '#FFFFFF',
    bgRevert: '#62626B',
    bgGrey: '#18181BB2',

    textDefault: '#2C2C33',
    textRevert: '#ffffff',
    subTextDefault: '#62626B',
    placeholder: 'rgba(169, 169, 169, 0.5)',
    textOnImageStrong: '#FFFFFF',
    textStrong: '#202024',

    borderColor: '#d0d7de',
    borderButtonColor: '#d0d7de',
    borderLightColor: '#d0d7de40',
    strongOutline: '#18181B2E',

    iconDisabled: '#A0A0AB',

    overlayModal: 'rgba(0,0,0,0.2)',
    BackgroundInputArea: 'rgba(255, 255, 255, 0.20)',
    outLineDefault: 'rgba(24, 24, 27, 0.10)',
    outlineStrong: 'rgba(24, 24, 27, 0.18)',

    btnDangerDisabled: '#E4E4E7',
};

export interface IThemeVariables {
    colors: typeof palette;
}

export const containerStyles = {
    paddingHorizontal: 20,
    paddingVertical: 20,
};

export const linkStyles = {
    color: palette.subTextDefault,
    textDecorator: 'underline',
};

export const LightTheme = {
    colors: {
        ...palette,
    },
};

export const DarkTheme = {
    colors: {
        ...LightTheme.colors,
        bgDefault: '#242429',
        bgRevert: '#FFFFFF',

        subTextDefault: '#D1D1D6',
        placeholder: 'rgba(169, 169, 169, 0.5)',
        textDefault: '#F4F4F5',
        textRevert: '#2C2C33',
        textStrong: '#FCFCFC',
        primary200: '#223149',
        secondary50: '#2C2C33',
        borderButtonColor: '#FFFFFF',
        borderColor: '#FFFFFF1F',
        borderLightColor: '#ffffff12',
        primary: '#5696D6',
        secondary700: '#303038',
        danger100: '#4B1409',
        overlayModal: '#00000087',
        light: '#132536',
        outlineStrong: 'rgba(255, 255, 255, 0.20)',
        iconDisabled: '#62626B',
        white: '#242429',
        btnDangerDisabled: '#242429',
    },
};

export const themeValues = {
    [THEME_WS.LIGHT]: LightTheme,
    [THEME_WS.DARK]: DarkTheme,
};
