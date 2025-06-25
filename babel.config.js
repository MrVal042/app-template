module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@navigation': './app/navigation',
            '@components': './app/components',
            '@constants': './app/constants',
            '@services': './app/services',
            '@features': './app/features',
            '@screens': './app/screens',
            '@control': './app/control',
            '@utils': ['./app/utils'],
            '@hooks': './app/hooks',
            '@store': './app/store',
            '@data': './app/data',
            '@assets': './assets',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      [
        'dotenv-import',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  }
}
