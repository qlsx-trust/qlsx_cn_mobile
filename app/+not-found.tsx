import TextWrap from '@/components/common/TextWrap';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <TextWrap fontSize={15}>This screen doesn't exist.</TextWrap>
                <Link href="/" style={styles.link}>
                    <TextWrap>Go to home screen!</TextWrap>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
