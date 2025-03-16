import AppButton from '@/components/common/AppButton';
import FlexBox from '@/components/common/FlexBox';
import TextWrap from '@/components/common/TextWrap';
import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import { BUTTON_COMMON_TYPE } from '@/constants/common';
import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import { useEffect } from 'react';
import { BackHandler, DeviceEventEmitter, StyleSheet } from 'react-native';

interface IConfirmScanCodeModalProps {
    scanResult: string;
    modalProps: CommonModalProps;
}

const ConfirmScanCodeModal = ({ scanResult, modalProps }: IConfirmScanCodeModalProps) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);

    const handleConfirmCode = () => {
        modalProps.onClose();
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
            <FlexBox gap={16} direction="column" width={'100%'}>
                <TextWrap style={styles.header} color={themeVariables.colors.textDefault}>
                    Xác nhận
                </TextWrap>

                <TextWrap style={styles.title} color={themeVariables.colors.textDefault}>
                    Mã máy ép:{' '}
                    <TextWrap color={themeVariables.colors.primary}> {scanResult} </TextWrap>
                </TextWrap>

                <FlexBox justifyContent="space-between" gap={16} style={{ marginTop: 16 }}>
                    <AppButton
                        viewStyle={styles.button}
                        variant={BUTTON_COMMON_TYPE.CANCEL}
                        label="Đóng"
                        onPress={modalProps.onClose}
                    />
                    <AppButton
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
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 26,
        },
        header: {
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
