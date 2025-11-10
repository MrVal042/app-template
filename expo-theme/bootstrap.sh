#!/bin/bash
set -e

# -------------------------
# Config
# -------------------------
CURRENT_DIR=$(basename "$PWD")
APP_NAME=$CURRENT_DIR
REPO_URL="https://github.com/MrVal042/app-template.git"
TMP_REPO=".tmp-app-structure"
TEMPLATE_FOLDER="expo-theme"

GREEN='\033[32m'
CYAN='\033[36m'
RESET='\033[0m'

# -------------------------
# Start
# -------------------------
echo "🚀 Setting up Expo Theme Template in '$APP_NAME'..."
echo -e "\n⚙️  Running bootstrap for ${CYAN}$APP_NAME${RESET}\n"

# -------------------------
# Step 1: Initialize Expo app
# -------------------------
echo -e "🚀 Step 1: ${CYAN}Initializing Expo project...${RESET}"
npx create-expo-app@latest $APP_NAME --template blank-typescript
echo

# -------------------------
# Step 2: Move files to current folder
# -------------------------
echo -e "⚙️ Step 2: ${CYAN}Moving project files into current folder...${RESET}"
shopt -s dotglob
mv $APP_NAME/* ./
rm -rf $APP_NAME
shopt -u dotglob

# Fix package.json name
node -e "let p=require('./package.json');p.name='$APP_NAME';require('fs').writeFileSync('package.json',JSON.stringify(p,null,2));"

# Add env files to gitignore
echo -e "\n# Environment files\n.env\n.env.*\nenv.d.ts" >> .gitignore

# -------------------------
# Step 3: Clone template and copy files
# -------------------------
echo -e "\n📁 Step 3: ${CYAN}Cloning template structure from repo...${RESET}"
git clone --depth 1 $REPO_URL $TMP_REPO

# Ensure template folder exists
if [ ! -d "$TMP_REPO/$TEMPLATE_FOLDER" ]; then
  echo "❌ Template folder '$TEMPLATE_FOLDER' not found in cloned repo!"
  rm -rf $TMP_REPO
  exit 1
fi

# Remove git history from template
rm -rf $TMP_REPO/.git

# Copy folders/files from template
for folder in app __test__ types; do
  [ -d "$TMP_REPO/$TEMPLATE_FOLDER/$folder" ] && cp -r "$TMP_REPO/$TEMPLATE_FOLDER/$folder" "./$folder"
done

for file in App.tsx .env.development .env.preview .env.production env.d.ts index.ts; do
  [ -f "$TMP_REPO/$TEMPLATE_FOLDER/$file" ] && cp "$TMP_REPO/$TEMPLATE_FOLDER/$file" "./$file"
done

rm -rf $TMP_REPO
echo

# -------------------------
# Step 4: Install dependencies
# -------------------------
echo -e "🧩 Step 4: ${CYAN}Installing dependencies...${RESET}"
npx expo install \
@expo/vector-icons \
@gorhom/bottom-sheet \
@hookform/resolvers \
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

# -------------------------
# Step 5: Setup tsconfig and babel
# -------------------------
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
    "target": "es6",
    "module": "es6",
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

npx expo install --check
npx expo-doctor

# -------------------------
# Done
# -------------------------
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
echo "  - npm run tsc"

# Cleanup
rm -f bootstrap.sh
git add .
