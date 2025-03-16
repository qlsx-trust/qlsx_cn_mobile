import AppButton from '@/components/common/AppButton';
import FlexBox from '@/components/common/FlexBox';
import TextWrap from '@/components/common/TextWrap';
import CommonModal, { CommonModalProps } from '@/components/modals/CommonModal';
import { BUTTON_COMMON_TYPE } from '@/constants/common';
import { useThemeContext } from '@/providers/ThemeProvider';
import { IThemeVariables } from '@/shared/theme/themes';
import { StyleSheet } from 'react-native';

interface IConfirmModalProps {
    title: string;
    description?: string;
    modalProps: CommonModalProps;
    onConfirm: () => void;
}

const ConfirmModal = ({ title,description, onConfirm, modalProps }: IConfirmModalProps) => {
    const { themeVariables } = useThemeContext();
    const styles = styling(themeVariables);

    return (
        <CommonModal {...modalProps}>
            <FlexBox gap={16} direction="column" width={'100%'}>
                <TextWrap style={styles.title} color={themeVariables.colors.textDefault}>
                    {title}
                </TextWrap>

               {description && <TextWrap style={styles.description} color={themeVariables.colors.textDefault}>
                    {description}
                </TextWrap>}

                <FlexBox justifyContent="space-between" gap={16}>
                    <AppButton
                        viewStyle={styles.button}
                        variant={BUTTON_COMMON_TYPE.CANCEL}
                        label="Đóng"
                        onPress={modalProps.onClose}
                    />
                    <AppButton viewStyle={styles.button} label="Xác nhận" onPress={onConfirm} />
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
            fontSize: 20,
            fontWeight: '400',
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

export default ConfirmModal;
