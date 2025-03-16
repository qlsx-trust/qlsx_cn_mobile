import * as Updates from 'expo-updates';

// LOCAL
let Config = {
    EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV,
    EXPO_PUBLIC_BACKEND_URL: process.env.EXPO_PUBLIC_BACKEND_URL,
};

// STAGING
if (Updates.channel === 'staging') {
    Config.EXPO_PUBLIC_ENV = 'staging';
    Config.EXPO_PUBLIC_BACKEND_URL = 'https://qa';
}

if (Updates.channel === 'main') {
    Config.EXPO_PUBLIC_ENV = 'production';
    Config.EXPO_PUBLIC_BACKEND_URL = 'https://prod';
}

export default Config;
