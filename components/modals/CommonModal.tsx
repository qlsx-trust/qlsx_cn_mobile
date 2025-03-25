import FlexBox from '@/components/common/FlexBox';
import { useThemeContext } from '@/providers/ThemeProvider';
import { THEME_WS } from '@/shared/theme/themes';
import React from 'react';
import { Dimensions, ModalProps, Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

export interface CommonModalProps extends ModalProps {
    children?: React.ReactNode;
    previewImage?: boolean;
    onClose: () => void;
    closeOnClickOutside?: boolean;
}

const CommonModal = ({
    children,
    previewImage,
    transparent = true,
    onClose,
    closeOnClickOutside = false,
    ...props
}: CommonModalProps) => {
    const { themeVariables, theme } = useThemeContext();
    const styles = styling();

    return (
        <Modal
            isVisible={props.visible}
            onModalHide={onClose}
            avoidKeyboard
            onBackButtonPress={onClose}
            style={{ margin: 0 }}
        >
            <Pressable style={styles.overlay} onPressOut={() => closeOnClickOutside && onClose()}>
                {previewImage ? (
                    <>{children}</>
                ) : (
                    <FlexBox
                        direction="column"
                        width={'100%'}
                        height={'auto'}
                        backgroundColor={
                            theme === THEME_WS.DARK
                                ? themeVariables.colors.black50
                                : themeVariables.colors.white
                        }
                        borderRadius={16}
                        style={styles.modal}
                    >
                        {children}
                    </FlexBox>
                )}
            </Pressable>
        </Modal>
    );
};

export const styling = () =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modal: {
            padding: 16,
            maxWidth: Dimensions.get('window').width * 4/5,
        },
    });

export default CommonModal;
