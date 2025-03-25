import AppButton from '@/components/common/AppButton';
import AppSafeAreaBottom from '@/components/common/AppSafeAreaBottom';
import FlexBox from '@/components/common/FlexBox';
import { default as TextWrap, default as TextWrapper } from '@/components/common/TextWrap';
import { SCREEN_KEY } from '@/constants/common';
import { useThemeContext } from '@/providers/ThemeProvider';
import { useAuthContext } from '@/providers/UserProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import { setSecretStorage } from '@/utils/KeychainHelper';
import { toast } from '@/utils/ToastMessage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface IntroScreenProps {}
const IntroScreen: React.FC<IntroScreenProps> = () => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);
    const { loading, session, setSession } = useAuthContext();

    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleLogin = async () => {
        try {
            setLoadingSubmit(true);
            const sessionStore = {
                data: 'here',
            };
            setSession(sessionStore);
            await setSecretStorage(sessionStore);
            toast.success('Đăng nhập thành công!');
            router.replace(SCREEN_KEY.home);
        } catch (error) {
            console.log('@@Error: ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    if (!loading && session) return <Redirect href={SCREEN_KEY.home} />;

    return (
        <AppSafeAreaBottom>
            <View style={styles.container}>
                <TextWrapper h1>Đăng nhập</TextWrapper>
                <FlexBox
                    direction="column"
                    style={{ marginTop: 30, width: 400 }}
                    gap={10}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <TextWrap h3>Tài khoản:</TextWrap>
                    <TextInput
                        style={[
                            styles.noteTitle,
                            { borderWidth: 1, borderColor: themeVariables.colors.borderColor },
                        ]}
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor={themeVariables.colors.bgGrey}
                        placeholder="Tài khoản"
                        onBlur={Keyboard.dismiss}
                        onEndEditing={Keyboard.dismiss}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </FlexBox>
                <FlexBox
                    direction="column"
                    style={{ marginTop: 30, width: 400 }}
                    gap={10}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <TextWrap h3>Mật khẩu:</TextWrap>
                    <View style={{ width: '100%' }}>
                        <TextInput
                            style={[
                                styles.noteTitle,
                                {
                                    borderWidth: 1,
                                    borderColor: themeVariables.colors.borderColor,
                                    paddingRight: 50,
                                },
                            ]}
                            secureTextEntry={isPasswordSecure}
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor={themeVariables.colors.bgGrey}
                            placeholder="Mật khẩu"
                            onBlur={Keyboard.dismiss}
                            onEndEditing={Keyboard.dismiss}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 10,
                            }}
                            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                        >
                            <MaterialCommunityIcons
                                name={isPasswordSecure ? 'eye-off' : 'eye'}
                                size={28}
                                color={themeVariables.colors.black}
                            />
                        </TouchableOpacity>
                    </View>
                </FlexBox>

                <FlexBox justifyContent="space-between" gap={16} style={{ marginTop: 30 }}>
                    <AppButton
                        disabled={!username || !password || loadingSubmit}
                        isLoading={loadingSubmit}
                        viewStyle={{}}
                        label="Đăng nhập"
                        onPress={handleLogin}
                    />
                </FlexBox>
            </View>
        </AppSafeAreaBottom>
    );
};

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: themeVariables.colors.bgDefault,
        },

        noteTitle: {
            paddingHorizontal: 16,
            width: '100%',
            height: 48,
            fontSize: 16,
            fontWeight: '400',
            borderRadius: 6,
            color: themeVariables.colors.textDefault,
            backgroundColor: 'transparent',
        },
        loginButton: {
            width: 180,
        },
    });

export default IntroScreen;
