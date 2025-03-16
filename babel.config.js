module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@/*': './*',
                        '@shared-constants': './constants',
                        '@font-size': './shared/theme/font-size',
                        '@api': './services/api/index',
                        '@fonts': './shared/theme/fonts',
                        '@theme/*': './shared/theme/*',
                        '@services/*': './services/*',
                        '@screens/*': './screens/*',
                        '@utils': './utils/',
                        '@assets': './assets/',
                    },
                },
            ],
        ],
    };
};
