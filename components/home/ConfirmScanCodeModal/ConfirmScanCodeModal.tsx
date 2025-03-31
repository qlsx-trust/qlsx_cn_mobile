import AppButton from '@/components/common/AppButton';
import FlexBox from '@/components/common/FlexBox';
import TextWrapper from '@/components/common/TextWrap';
import TextWrap from '@/components/common/TextWrap';
import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import { BUTTON_COMMON_TYPE, UserRole } from '@/constants/common';
import { useThemeContext } from '@/providers/ThemeProvider';
import { useAuthContext } from '@/providers/UserProvider';
import { CommonRepository } from '@/repositories/CommonRepository';
import { IThemeVariables } from '@/shared/theme/themes';
import { toast } from '@/utils/ToastMessage';
import { useEffect, useState } from 'react';
import {
    BackHandler,
    DeviceEventEmitter,
    Keyboard,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

interface IConfirmScanCodeModalProps {
    scanResult: string;
    modalProps: CommonModalProps;
}

const ConfirmScanCodeModal = ({ scanResult, modalProps }: IConfirmScanCodeModalProps) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);
    const { session: userData } = useAuthContext();

    const [machineCode, setMachineCode] = useState<string>('');
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

    const handleConfirmCode = async () => {
        try {
            Keyboard.dismiss();
            setIsLoadingSubmit(true);
            const payloadMold = {
                confirmationTime: `2025-03-25T16:55:56.866`,
                moldCode: scanResult,
                machineCode: machineCode,
                employeeCode: userData?.userName,
                notes: '',
            };

            const payloadMaterialDrying = {
                confirmationTime: `2025-03-25T16:55:56.866`,
                materialCode: scanResult,
                machineCode: machineCode,
                employeeCode: userData?.userName,
                notes: '',
            };

            console.log('@@payloadMold: ', payloadMold);

            const response =
                userData?.role == UserRole.MoldSupply
                    ? await CommonRepository.confirmMold(payloadMold)
                    : await CommonRepository.confirmMaterialDrying(payloadMaterialDrying);
            console.log(response.error)
            if (response.error) {
                toast.error('Xác nhận thất bại');
                return;
            }

            modalProps.onClose();
            toast.success('Xác nhận thành công!');
        } catch (error) {
            console.log('@@Error: ', error);
        } finally {
            setIsLoadingSubmit(false);
        }
    };

    // Handle hardware buttons
    useEffect(() => {
        // Subscribe to hardware button events
        const subscription = DeviceEventEmitter.addListener('keydown', (e) => {
            // Log the key event during development
            console.log('Key pressed:', e);
            // ENTER key
            if (e.keyCode == 66 || e.keyCode == 133) {
                handleConfirmCode();
                return;
            } else if (e.keyCode == 4) {
                // BACK BUTTON
                modalProps.onClose();
            }
        });

        // Handle back button and function keys
        const handleKeyDown = () => {
            // Get the pressed key from native module or device events
            // Return true to prevent default behavior
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', handleKeyDown);

        // Cleanup
        return () => {
            subscription.remove();
            BackHandler.removeEventListener('hardwareBackPress', handleKeyDown);
        };
    }, []);

    return (
        <CommonModal {...modalProps}>
            <FlexBox
                gap={16}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                width={'100%'}
            >
                <TextWrap style={styles.header} color={themeVariables.colors.textDefault}>
                    Xác nhận
                </TextWrap>

                <TextWrap h3 style={styles.title} color={themeVariables.colors.textDefault}>
                    {userData?.role == UserRole.MaterialSupply ? 'Mã nguyên liệu' : 'Mã khuôn'}:{' '}
                    <TextWrap color={themeVariables.colors.primary}> {scanResult} </TextWrap>
                </TextWrap>

                <FlexBox
                    direction="column"
                    style={{ width: '100%' }}
                    gap={10}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <TextWrap h3>Mã máy:</TextWrap>
                    <TextInput
                        style={[
                            styles.noteTitle,
                            {
                                borderWidth: 1,
                                borderColor: themeVariables.colors.borderColor,
                                width: '100%',
                            },
                        ]}
                        value={machineCode}
                        onChangeText={setMachineCode}
                        placeholderTextColor={themeVariables.colors.bgGrey}
                        placeholder={'Mã máy'}
                        onBlur={Keyboard.dismiss}
                        onEndEditing={Keyboard.dismiss}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </FlexBox>

                <FlexBox justifyContent="space-between" gap={16} style={{ marginTop: 16 }}>
                    <AppButton
                        viewStyle={styles.button}
                        variant={BUTTON_COMMON_TYPE.CANCEL}
                        label="Đóng"
                        onPress={modalProps.onClose}
                    />
                    <AppButton
                        disabled={!machineCode || isLoadingSubmit}
                        isLoading={isLoadingSubmit}
                        viewStyle={styles.button}
                        label="Xác nhận"
                        onPress={handleConfirmCode}
                    />
                </FlexBox>
            </FlexBox>
        </CommonModal>
    );
};

export const styling = (themeVariables: IThemeVariables) =>
    StyleSheet.create({
        title: {
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 26,
        },
        header: {
            width: '100%',
            textAlign: 'center',
            fontSize: 26,
            fontWeight: '600',
        },
        description: {
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
            textAlign: 'center',
        },
        textButton: {
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 24,
            textAlign: 'center',
            width: '100%',
        },
        button: {
            width: '49%',
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
    });

export default ConfirmScanCodeModal;
