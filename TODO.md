// README.md

# React Native Boilerplate (Expo + TypeScript + Zustand)

This is a **production-ready boilerplate** for building scalable React Native apps using [Expo](https://expo.dev/), [Zustand](https://github.com/pmndrs/zustand), and [React Navigation](https://reactnavigation.org/).

## 🚀 Features

- Modular architecture
- Zustand for global state management
- Custom hooks for logic isolation
- Organized folder structure
- Environment variable support
- TypeScript strict mode
- Global error handler
- Global error handler

## 📁 Folder Structure

```bash
project-root/
  ├── app/
  │  ├── assets/          # Fonts, images, etc.
  │  │  ├── fonts/
  │  │  ├── Images/
  │  │  └── index.ts
  │  │
  │  ├── components/       # Reusable UI components (Button, Text, etc.)
  │  │   ├── Element/
  │  │   │   ├── Button.tsx
  │  │   │   ├── IText.tsx
  │  │   │   ├── IView.tsx
  │  │   │   └── index.ts
  │  │   │
  │  │   ├── Form/          # Reusable Form
  │  │   │   ├── FormField.tsx
  │  │   │   ├── FormInput.tsx
  │  │   │   ├── DatePicker.tsx
  │  │   │   ├── OTPField.tsx
  │  │   │   ├── SearchField.tsx
  │  │   │   ├── validators.ts
  │  │   │   └── index.ts
  │  │   │
  │  │   ├── EmptyComponent.tsx
  │  │   ├── RootContainer.tsx
  │  │   ├── BottomSheet.tsx
  │  │   ├── ShadowStyles.ts
  │  │   ├── LoadingList.tsx
  │  │   ├── ComingSoon.tsx
  │  │   ├── Skeletal.tsx
  │  │   ├── Divider.tsx
  │  │   ├── BgImage.tsx
  │  │   ├── Header.tsx
  │  │   ├── Icon.tsx
  │  │   └── index.ts
  │  │
  │  ├── constants/         # App-wide constants (colors, fonts, sizes)
  │  │   ├── colors.ts
  │  │   ├── layout.ts
  │  │   ├── index.ts
  │  │   └── types.d.ts
  │  │
  │  ├── features/          # Feature-based separation
  │  │   ├── auth/
  │  │   │   ├── components/
  │  │   │   ├── screens/
  │  │   │   │   ├── LoginScreen.tsx
  │  │   │   │   ├── RegisterScreen.tsx
  │  │   │   │   └── index.ts
  │  │   │   │
  │  │   │   ├── store/              # Zustand/Redux slices or hooks
  │  │   │   │   ├── authStore.ts
  │  │   │   │   ├── useAuth.ts      # Handles login, logout, auth status
  │  │   │   │   └── index.ts
  │  │   │   │
  │  │   │   ├── auth.service.ts    # API calls related to auth
  │  │   │   ├── index.ts
  │  │   │   └── types.ts
  │  │   │
  │  │   ├── app/
  │  │   │   ├── components/
  │  │   │   ├── screens/
  │  │   │   │   ├── Home.tsx
  │  │   │   │   ├── Account.tsx
  │  │   │   │   └── index.ts
  │  │   │   │
  │  │   │   ├── services/
  │  │   │   │   ├── app.service.ts
  │  │   │   │   └── index.ts
  │  │   │   │
  │  │   │   ├── store/
  │  │   │   │   ├── appStore.ts
  │  │   │   │   ├── useApp.ts
  │  │   │   │   └── index.ts
  │  │   │   │
  │  │   │   ├── index.ts
  │  │   │   └── types.ts
  │  │   │
  │  │   ├── notification/
  │  │   │   ├── config.ts
  │  │   │   ├── screens/
  │  │   │   │   ├── Entry.tsx
  │  │   │   │   ├── details.tsx
  │  │   │   │   └── index.ts
  │  │   │   │
  │  │   │   ├── notice.service.ts
  │  │   │   ├── index.ts
  │  │   │   └── types.ts
  │  │   │
  │  │   ├── control/         # Global controllers modules
  │  │   │   ├── ErrorBoundary.tsx
  │  │   │   ├── Analysis.tsx
  │  │   │   ├── Welcome.tsx
  │  │   │   ├── Onboard.tsx
  │  │   │   └── index.ts
  │  │   │
  │  │   └── index.ts
  │  │
  │  ├── hooks/                # Global custom hooks (useDebounce, useAuth, etc.)
  │  │
  │  ├── navigation/           # React Navigation setup
  │  │   ├── navigationRef.tsx
  │  │   ├── AuthNavigator.tsx
  │  │   ├── AppNavigator.tsx
  │  │   ├── Toaster.tsx
  │  │   ├── types.d.ts
  │  │   └── index.ts
  │  │
  │  ├── services/              # Global service modules (API clients, error handler)
  │  │   ├── api.ts
  │  │   ├── types.d.ts
  │  │   └── index.ts
  │  │
  │  ├── store/                  # Global app state (user, theme, config)
  │  │   ├── useStore.tsx
  │  │   └── index.ts
  │  │
  │  ├── theme/                  # Global theme config
  │  │   ├── themeColors.ts
  │  │   └── index.ts
  │  │
  │  └── utils/                  # Utility functions (formatters, validators)
  │      ├── helper.tsx
  │      ├── dateController.tsx
  │      ├── dataController.tsx
  │      └── index.ts
  │
  ├── __tests__/
  │  ├── components/
  │  ├── control/
  │  ├── features/
  │  ├── hooks/
  │  ├── navigation/
  │  ├── screens/
  │  ├── services/
  │  ├── store/
  │  ├── theme/
  │  └── utils/
  │
  ├── App.tsx                 # Root App
  ├── .env                    # Environment variables
  ├── env.ts                  # Environment variables
  └── types/                  # Shared types/interfaces
```

# 🔄 Reuse Instructions

## 1. **Clone the repo** or copy folder:

```bash
# bash

# 1. Create and switch to a new branch
git checkout -b addStructure

# 2. Clone the boilerplate repository
git clone https://github.com/mrval042/Boilerplate.git new-project

# 3. Move into the cloned folder
cd new-project

# 4. Remove .git to prevent repo conflicts
rm -rf .git

# 5. Move required files to parent directory
mv app ../ && mv assets ../ &&  mv .env ../ && mv App.tsx ../ && mv babel.config.js ../ && mv env.d.ts ../ && mv eslint.config.js ../ && mv TODO.md ../ && mv tsconfig.json ../

# 6. Go back to parent folder
cd ..

# 7. Remove the cloned boilerplate folder
rm -rf new-project

# 8. Add TODO.md, .env, and env.d.ts to .gitignore (if not already there)
touch .gitignore
for f in TODO.md .env env.d.ts; do grep -qxF "$f" .gitignore || echo "$f" >> .gitignore; done

# 9. Install dependencies
npm install zustand axios dayjs react-hook-form yup \
  react-native-screens react-native-safe-area-context \
  @react-navigation/native @react-navigation/native-stack \
  @react-navigation/bottom-tabs @gorhom/bottom-sheet \
  react-native-modal-datetime-picker react-native-otp-entry \
  expo-secure-store @react-native-async-storage/async-storage \
  react-native-dotenv @tanstack/react-query

# 10. Install dev dependencies
npm install -D eslint prettier husky lint-staged
npm install --save-dev babel-plugin-module-resolver
npm install --save-dev babel-plugin-dotenv-import
npm install eslint-import-resolver-babel-module --save-dev


# 11. Check for file changes
git status

# 12. Stage all changes
git add .

# 13. Commit the changes
git commit -m "Initial project setup with app structure"

# 14. Push changes to remote (assumes remote `origin` is already set)
git push -u origin addStructure

# 15. Confirm status
git status

# 16. Check for TypeScript errors
tsc

```

## 2. **Update project names**:

- `package.json` → `main: node_modules/expo/AppEntry.js`

## 3. **Add or Update `babel.config.js`** with:

```ts
// babel.config.js
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
            '@assets': './app/assets',
            '@hooks': './app/hooks',
            '@store': './app/store',
            '@data': './app/data',
            '@utils': ['./utils'],
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
```

## 4. **Update `tsconfig.json`** with:

```ts
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "lib": ["dom", "esnext"],
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "module": "ES6",
    "target": "es6",
    "noEmit": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@navigation": ["app/navigation"],
      "@components": ["app/components"],
      "@constants": ["app/constants"],
      "@services": ["app/services"],
      "@features": ["app/features"],
      "@screens": ["app/screens"],
      "@control": ["app/control"],
      "@assets": ["app/assets"],
      "@utils": ["app/utils"],
      "@hooks": ["app/hooks"],
      "@store": ["app/store"],
      "@data": ["app/data"]
    },
    "types": ["react", "react-native", "./env.d.ts"]
  },
  "include": ["**/*", "**/*.ts", "**/*.tsx", "env.d.ts", "../App.tsx"],
  "exclude": ["node_modules"]
}
```

## 5. **Add or Update `App.tsx`** with"

```ts
// App.tsx
import { LoadApp } from '@navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoadApp />
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
```

## 5. **Add or Update `eslintrc.config.js`** with"

```ts
// eslintrc.config.js
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    settings: {
      'import/resolver': {
        'babel-module': {},
      },
    },
  },
])
```

## 6. **Check for dependencies compatibility**:

```bash
npx expo-doctor
npx expo install --check
```

## 6. **Run the app**:

```bash
npm install
npx expo install
npx expo start
```

## 🧠 Recommendations

- Use `Zustand` for state or replace with Redux Toolkit if needed.
- Add modules inside `features/` for better scalability.
- Use `react-query` or `tanstack-query` for server state (optional).

## Happy Building 🚀
