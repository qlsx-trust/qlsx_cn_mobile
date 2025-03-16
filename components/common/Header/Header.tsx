import UserIcon from '@/assets/icons/user.svg';
import FlexBox from '@/components/common/FlexBox';
import { Feather, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import TextWrap from '../TextWrap';
import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables, THEME_WS, containerStyles } from '@/shared/theme/themes';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { KEY_THEME_APP, SCREEN_KEY } from '@/constants/common';
import { setDataStorage } from '@/utils/KeychainHelper';
import { router } from 'expo-router';
import DeleteAccountModal from '@/components/modals/DeleteAccountModal';
import { useAuthContext } from '@/providers/UserProvider';

interface HeaderProps {
    isShowActionRight?: boolean;
    children?: ReactNode;
    styleWrapper?: any;
}

const Header = ({ children, isShowActionRight, styleWrapper }: HeaderProps) => {
    const { themeVariables, theme, setTheme } = useThemeContext();
    const styles = styling(themeVariables);
    const { logout } = useAuthContext();
    const [showDeleteAccountModal, setShowDeleteAccountModal] = React.useState(false);

    const changeTheme = () => {
        const themeUpdated = theme === THEME_WS.LIGHT ? THEME_WS.DARK : THEME_WS.LIGHT;
        setTheme?.(themeUpdated);
        setDataStorage(KEY_THEME_APP, themeUpdated);
    };

    const handleConfigPrivacy = () => {
        router.push(SCREEN_KEY.consent);
    };

    return (
        <View style={[styles.container, styleWrapper]}>
            {children}
            {isShowActionRight && (
                <Menu>
                    <MenuTrigger>
                        <UserIcon
                            width={30}
                            height={30}
                            color={themeVariables.colors.textDefault}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={changeTheme} style={styles.menuOptionWrap}>
                            {theme === THEME_WS.LIGHT ? (
                                <FlexBox gap={5} justifyContent="flex-start">
                                    <View
                                        style={[
                                            styles.wrapTheme,
                                            { backgroundColor: '#F4F4F5', minWidth: 30 },
                                        ]}
                                    >
                                        <Feather name="moon" size={18} color="#6444b8" />
                                    </View>
                                    <TextWrap fontSize={15}>Dark Mode</TextWrap>
                                </FlexBox>
                            ) : (
                                <FlexBox gap={5} justifyContent="flex-start">
                                    <View
                                        style={[
                                            styles.wrapTheme,
                                            { backgroundColor: '#ca85044d', minWidth: 30 },
                                        ]}
                                    >
                                        <Feather name="sun" size={18} color="#eaaa08" />
                                    </View>
                                    <TextWrap fontSize={15}>Light Mode</TextWrap>
                                </FlexBox>
                            )}
                        </MenuOption>

                        <MenuOption
                            onSelect={handleConfigPrivacy}
                            style={[styles.menuOptionWrap, styles.logoutGroup]}
                        >
                            <FlexBox gap={5} justifyContent="flex-start">
                                <Ionicons
                                    name="shield-checkmark-outline"
                                    size={24}
                                    color={themeVariables.colors.textDefault}
                                    style={{ minWidth: 30 }}
                                />

                                <TextWrap fontSize={15}>Privacy</TextWrap>
                            </FlexBox>
                        </MenuOption>

                        <MenuOption
                            onSelect={() => setShowDeleteAccountModal(true)}
                            style={[styles.menuOptionWrap, styles.logoutGroup]}
                        >
                            <FlexBox gap={5} justifyContent="flex-start">
                                <AntDesign
                                    name="deleteuser"
                                    size={24}
                                    color={themeVariables.colors.textDefault}
                                    style={{ minWidth: 30 }}
                                />

                                <TextWrap fontSize={15}>Delete account</TextWrap>
                            </FlexBox>
                        </MenuOption>

                        <MenuOption
                            onSelect={logout}
                            style={[styles.menuOptionWrap, styles.logoutGroup]}
                        >
                            <FlexBox gap={5} justifyContent="flex-start">
                                <MaterialIcons
                                    name="logout"
                                    size={24}
                                    color={themeVariables.colors.textDefault}
                                    style={{ minWidth: 30 }}
                                />
                                <TextWrap fontSize={15}>Log out</TextWrap>
                            </FlexBox>
                        </MenuOption>
                    </MenuOptions>
                    {showDeleteAccountModal && (
                        <DeleteAccountModal
                            visible={showDeleteAccountModal}
                            onClose={() => setShowDeleteAccountModal(false)}
                        />
                    )}
                </Menu>
            )}
        </View>
    );
};

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        container: {
            width: Dimensions.get('window').width,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: containerStyles.paddingHorizontal,
            backgroundColor: themeVariables.colors.bgDefault,
            position: 'relative',
        },
        menuOptionWrap: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: themeVariables.colors.bgDefault,
        },
        logoutGroup: {
            width: '100%',
            borderTopWidth: 1,
            borderTopColor: themeVariables.colors.borderColor,
        },
        wrapTheme: {
            padding: 6,
            borderRadius: 30,
        },
    });

export default Header;
