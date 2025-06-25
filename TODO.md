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

````
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

## 🔄 Reuse Instructions

### 1. **Clone the repo** or copy folder:

```bash
git clone https://github.com/mrval042/Boilerplate/new-project
cd new-project
rm -rf .git
git init
````

### 2. **Update project names**:

- `app.json` → `name`, `slug`, `version`, `bundleIdentifier`, `package`
- `package.json` → `name`, `version`

### 3. **Update `.env`** with your API base URL

```
// .env (ignored in Git)
EXPO_PUBLIC_API_URL=https://example.com/api/v1
```

### 4. **Update `env.ts`** with your API base URL

```
// env.ts (ignored in Git)
export const API_URL = process.env.EXPO_PUBLIC_API_URL!;

```

### 5. **Update `babel.config.js`** with your API base URL

```
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

### 6. **Update `tsconfig.json`** with your API base URL

```
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

### 7. **Run the app**:

```bash
npm install
npx expo start
```

### 8. **Replace example screens & services** with your own.

## 🧠 Recommendations

- Use `Zustand` for state or replace with Redux Toolkit if needed.
- Add modules inside `features/` for better scalability.
- Use `react-query` or `tanstack-query` for server state (optional).

---

Happy Building 🚀

```bash
  npm install zustand axios dayjs react-hook-form yup react-native-screens react-native-safe-area-context react-navigation @react-navigation/native-stack react-query
  npm install -D eslint prettier husky lint-staged
```
