import TextWrap from '@/components/common/TextWrap';
import { useThemeContext } from '@/providers/ThemeProvider';
import { StyleSheet } from 'react-native';
import EmptyImage from '@/assets/images/empty.svg';
import FlexBox from '@/components/common/FlexBox';

const EmptyList = ({ title, description }: { title: string; description: string }) => {
    const { themeVariables } = useThemeContext();

    return (
        <FlexBox direction="column" gap={8} height="80%">
            <EmptyImage style={{ padding: 8 }} width={205} height={129} />
            <TextWrap style={styles.title} color={themeVariables.colors.textDefault}>
                {title}
            </TextWrap>
            <TextWrap style={styles.description} color={themeVariables.colors.subTextDefault}>
                {description}
            </TextWrap>
        </FlexBox>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
    },
    description: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
});

export default EmptyList;
