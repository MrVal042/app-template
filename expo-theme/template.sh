#!/bin/bash
set -e

CURRENT_DIR=$(basename "$PWD")
APP_NAME=$CURRENT_DIR
REPO_URL="https://github.com/MrVal042/app-structure-expo-theme"
TMP_REPO=".tmp-app-structure"
GREEN='\033[32m'
CYAN='\033[36m'
RESET='\033[0m'

echo -e "\n⚙️  Running template for ${CYAN}$APP_NAME${RESET}\n"

echo -e "🚀 Step 1: ${CYAN}Initializing...${RESET}"
npx create-expo-app@latest $APP_NAME --template blank-typescript
echo

echo -e "⚙️ Step 2: ${CYAN}Validating and moving files...${RESET}"
shopt -s dotglob
mv $APP_NAME/* ./
rm -rf $APP_NAME
shopt -u dotglob

node -e "let p=require('./package.json');p.name='$APP_NAME';require('fs').writeFileSync('package.json',JSON.stringify(p,null,2));"
echo -e "\n\n# Environment files\n.env\n.env.*" >> .gitignore

echo -e "\n📁 Step 3: ${CYAN}Cloning structure from repo...${RESET}"
git clone --depth 1 $REPO_URL $TMP_REPO

mkdir -p app __test__ types
[ -d "$TMP_REPO/app" ] && cp -r $TMP_REPO/app/* ./app
[ -d "$TMP_REPO/__test__" ] && cp -r $TMP_REPO/__test__/* ./__test__
[ -f "$TMP_REPO/App.tsx" ] && cp $TMP_REPO/App.tsx ./App.tsx
[ -f "$TMP_REPO/.env.development" ] && cp $TMP_REPO/.env.development ./.env.development
[ -f "$TMP_REPO/.env.preview" ] && cp $TMP_REPO/.env.preview ./.env.preview
[ -f "$TMP_REPO/.env.production" ] && cp $TMP_REPO/.env.production ./.env.production
[ -f "$TMP_REPO/env.d.ts" ] && cp $TMP_REPO/env.d.ts ./env.d.ts
[ -f "$TMP_REPO/index.ts" ] && cp $TMP_REPO/index.ts ./index.ts
rm -rf $TMP_REPO
echo

echo -e "🧩 Step 4: ${CYAN}Installing dependencies...${RESET}"
npx expo install \
@expo/vector-icons \
@gorhom/bottom-sheet \
@react-native-async-storage/async-storage \
@react-native-community/datetimepicker \
@react-navigation/bottom-tabs \
@react-navigation/elements \
@react-navigation/native \
@react-navigation/native-stack \
@tanstack/react-query \
axios \
dayjs \
expo-device \
expo-font \
expo-image \
expo-linking \
expo-image-picker \
expo-notifications \
expo-secure-store \
expo-splash-screen \
react-hook-form \
react-native-dotenv \
react-native-edge-to-edge \
react-native-gesture-handler \
react-native-modal-datetime-picker \
react-native-otp-entry \
react-native-reanimated \
react-native-safe-area-context \
react-native-screens \
react-native-worklets \
yup \
zustand

npx expo install --dev \
@types/yup \
@types/jest \
@types/react \
babel-plugin-dotenv-import \
babel-plugin-module-resolver \
typescript
echo

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "typeRoots": ["./app/@types", "./node_modules/@types"],
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "bundler",
    "types": ["jest", "node"],
    "resolveJsonModule": true,
    "lib": ["dom", "esnext"],
    "esModuleInterop": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "jsx": "react-native",
    "skipLibCheck": true,
    "target": "esnext",
    "module": "esnext",
    "allowJs": true,
    "noEmit": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@components": ["app/components"],
      "@navigation": ["app/navigation"],
      "@constants": ["app/constants"],
      "@features": ["app/features"],
      "@styles": ["app/@styles"],
      "@utils": ["app/utils"],
      "@store": ["app/store"],
      "@hooks": ["app/hooks"],
      "@data": ["app/data"],
      "@assets": ["assets"],
      "@api": ["app/api"],
      "@env": ["env.d.ts"]
    }
  },
  "include": ["app", "App.tsx", "__test__"],
  "extends": "expo/tsconfig.base"
}
EOF

cat > babel.config.js << 'EOF'
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
            '@features': './app/features',
            '@styles': './app/@styles',
            '@hooks': './app/hooks',
            '@store': './app/store',
            '@utils': './app/utils',
            '@data': './app/data',
            '@assets': './assets',
            '@env': './env.d.ts',
            '@api': './app/api',
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
EOF

echo
npx expo install --check
echo
echo -e "⚙️ Step 5: ${CYAN}Running Expo Doctor...${RESET}"
npx expo-doctor
echo

echo -e "- App structure with theme ${GREEN}passed ✅${RESET}"
echo -e "- Dependencies installed   ${GREEN}passed ✅${RESET}"
echo -e "- No leftover codes        ${GREEN}passed ✅${RESET}"
echo -e "- Test folder added        ${GREEN}passed ✅${RESET}"
echo -e "- Alias configured         ${GREEN}passed ✅${RESET}"
echo
echo -e "✅ ${GREEN}Your Expo app '$APP_NAME' is ready!${RESET}"
echo
echo "Next steps:"
echo "  - npm run start"
echo "  - npm run android"
echo "  - npm run ios"
echo "  - npm run web"
echo

rm -f template.sh
git add .
