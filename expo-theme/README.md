# 🚀 Expo App Structure Template

A fast bootstrap script to spin up a **ready-to-scale Expo + TypeScript project** with organized folders, aliases, and essential dependencies.

---

## ⚙️ Features

- 🧱 Clean file structure (`app/`, `types/`, `__test__/`) with alias
- 🎨 Pre-configured path aliases and Babel setup
- 📦 Expo SDK–compatible dependency install
- ⚡ TypeScript + React Navigation + Zustand + React Query
- 🧰 Built-in `.env`, `env.ts`, and project doctor check

---

## 🧭 Quick Start

Run this one-line command in any empty folder:

```bash
curl -sSL https://raw.githubusercontent.com/mrval042/app-structure/expo-theme/main/template.sh | bash
```

Or download manually:

```bash
curl -O https://raw.githubusercontent.com/mrval042/app-structure/expo-theme/main/template.sh
chmod +x bootstrap-expo-template.sh
./bootstrap-expo-template.sh

```

## 📁 Resulting Structure

```pgsql

mobile/
├── app/
│  ├── api/
│  │   ├── auth.service.ts
│  │   ├── endpoint.ts
│  │   └── index.ts
│  │
│  ├── components/
│  │   ├── Element/
│  │   │   ├── ThemeText.tsx
│  │   │   ├── ThemeView.tsx
│  │   │   ├── Button.tsx
│  │   │   └── index.ts
│  │   │
│  │   ├── Form/
│  │   │   ├── Dropdown/
│  │   │   ├── useInputStyle.tsx
│  │   │   ├── SearchField.tsx
│  │   │   ├── DatePicker.tsx
│  │   │   ├── LabelInput.tsx
│  │   │   ├── FormField.tsx
│  │   │   ├── validators.ts
│  │   │   ├── OTPField.tsx
│  │   │   └── index.ts
│  │   │
│  │   ├── EmptyComponent.tsx
│  │   ├── BottomSheet.tsx
│  │   ├── ComingSoon.tsx
│  │   ├── Divider.tsx
│  │   ├── Avatar.tsx
│  │   ├── Header.tsx
│  │   ├── Icon.tsx
│  │   ├── LoadingList.tsx
│  │   ├── RootContainer.tsx
│  │   ├── ShadowStyles.ts
│  │   ├── Skeletal.tsx
│  │   ├── BgImage.tsx
│  │   └── index.ts
│  │
│  ├── constants/
│  │   ├── fonts.ts
│  │   ├── index.ts
│  │   ├── colors.ts
│  │   ├── layout.ts
│  │   └── types.d.ts
│  │
│  ├── data/
│  │   ├── layout.ts
│  │   ├── auth.ts
│  │   └── user.ts
│  │
│  ├── features/
│  │   ├── app/
│  │   │   ├── Account/
│  │   │   ├── Explore/
│  │   │   ├── Home/
│  │   │   └── index.ts
│  │   │
│  │   ├── auth/
│  │   │   ├── components/
│  │   │   ├── ForgotPassword.tsx
│  │   │   ├── ResetPassword.tsx
│  │   │   ├── VerifyClaim.tsx
│  │   │   ├── SingUp.tsx
│  │   │   ├── SingIn.tsx
│  │   │   └── index.ts
│  │   │
│  │   ├── control/
│  │   │   ├── ErrorBoundary.tsx
│  │   │   ├── Analysis.tsx
│  │   │   ├── Welcome.tsx
│  │   │   ├── Onboard.tsx
│  │   │   └── index.ts
│  │   │
│  │   ├── notification/
│  │   │   ├── NotificationDetails.tsx
│  │   │   ├── Notification.tsx
│  │   │   ├── config.ts
│  │   │   └── index.ts
│  │   │
│  │   └── index.ts
│  │
│  ├── hooks/
│  │   ├── useChangeTracker.ts
│  │   ├── useRequestClient.ts
│  │   ├── useExistApp.ts
│  │   ├── useKeyboard.ts
│  │   ├── useTheme.ts
│  │   ├── useApp.ts
│  │   ├── useApi.ts
│  │   └── index.ts
│  │
│  ├── navigation/
│  │   ├── navigationRef.tsx
│  │   ├── AuthNavigator.tsx
│  │   ├── AppNavigator.tsx
│  │   ├── BottomTabs.tsx
│  │   ├── LoadApp.tsx
│  │   ├── Toaster.tsx
│  │   ├── types.d.ts
│  │   └── index.ts
│  │
│  ├── store/
│  │   ├── securedStore.tsx
│  │   ├── useAuthStore.ts
│  │   ├── useAppStore.ts
│  │   └── index.ts
│  │
│  ├── types/
│  │   ├── screen.d.ts
│  │   ├── types.d.ts
│  │   └── user.d.ts
│  │
│  └── utils/
│      ├── dataController.tsx
│      ├── dateController.tsx
│      ├── errorController.tsx
│      ├── helper.tsx
│      └── index.ts
│
├── __tests__/
│  ├── components/
│  ├── constants/
│  ├── features/
│  ├── hooks/
│  ├── navigation/
│  ├── store/
│  └── utils/
│
├── .env.development
├── .env.preview
├── .env.production
├── .gitIgnore
├── app.json
├── App.tsx
├── babel.config.js
├── env.d.ts
├── README.md
└── tsconfig.json

```

## 🧩 Next Steps

```bash
npm run start   # Launch dev server
npm run android # Run on Android
npm run ios     # Run on iOS
npm run web     # Run on web
```

## 🛠 Requirements

> Node.js ≥ 18
> npm or yarn
> Expo CLI ≥ 6
> Git

## 🔖 Versioning

Tag a release after each stable update:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 🤝 Contributing

PRs welcome for new templates (auth flow, Supabase, etc.).
Follow clean commit messages and script consistency.

## 📜 License

MIT © MrVal042
