import { OS } from '@/constants/common';
import Config from '@/constants/config';
import { VERSON_CONTROL } from '@/versionControl';
import Constants from 'expo-constants';
import { Alert, Linking, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';

const appIdIOS = '6479838075';
const packageName = 'com.qlsx_cn';

const handleUpdateVersion = async () => {
    const deepLinkStore =
        Platform.OS === OS.IOS
            ? await VersionCheck.getAppStoreUrl({
                  appID: appIdIOS,
              })
            : await VersionCheck.getPlayStoreUrl({
                  packageName: packageName,
              });
    console.log('deepLinkStore: ', deepLinkStore);
    Linking.openURL(deepLinkStore);
};

export const checkAppVersionHelper = async () => {
    try {
        const isDev =
            process.env.EXPO_PUBLIC_ENV === 'development' ||
            Config.EXPO_PUBLIC_ENV === 'development';
        if (isDev) return;

        const isStaging =
            process.env.EXPO_PUBLIC_ENV === 'staging' || Config.EXPO_PUBLIC_ENV === 'staging';
        const currentVersion = Constants?.expoConfig?.version;
        if (!currentVersion) return;
        if (isStaging && currentVersion >= VERSON_CONTROL.STAGING) {
            return;
        }
        if (!isStaging && currentVersion >= VERSON_CONTROL.PRODUCTION) {
            return;
        }

        Alert.alert(
            `Update Required`,
            'A new version of the app is available. Please update to continue using the app.',
            [
                {
                    text: 'Update Now',
                    onPress: handleUpdateVersion,
                },
            ],
            { cancelable: false }
        );
    } catch (error) {
        console.error('Error checking app version:', error);
    }
};
