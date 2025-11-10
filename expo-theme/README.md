# 🚀 Expo + theme App Structure Template

A ready-to-scale Expo + TypeScript boilerplate for production-grade mobile apps — clean, modular, and built to grow.

## ⚙️ Core Features

- 🧱 Organized Architecture → app/, types/, **tests**/, and alias support
- ⚡ Pre-configured Setup → TypeScript, Babel aliases, React Navigation, Zustand, React Query
- 🎨 Theme-Ready UI → Dark & light modes, reusable components, Expo vector icons
- 🧰 Built-in Environments → .env.development, .env.preview, .env.production, env.d.ts
- 🪄 Quality-of-Life Tools → Project doctor, strict typing, automated dependency install

## 🧭 Quick Start

Run this one command in an empty folder:

```bash
curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/expo-theme/bootstrap.sh | bash

```

#### Or install manually:

```bash
curl -O https://raw.githubusercontent.com/MrVal042/app-template/main/expo-theme/bootstrap.sh
chmod +x bootstrap.sh
./bootstrap.sh

```

## 📁 Project Structure

```pgsql

folder-name/
├── app/
│   ├── api/                 # API clients & endpoints
│   ├── components/          # Reusable UI and Form elements
│   ├── constants/           # Colors, fonts, layout
│   ├── data/                # Mock or static data
│   ├── features/            # Core app modules (auth, control, app, etc.)
│   ├── hooks/               # Reusable logic hooks
│   ├── navigation/          # Stack, Tabs, and navigation utilities
│   ├── store/               # Zustand global stores
│   ├── types/               # Shared TypeScript definitions
│   └── utils/               # Helper functions and formatters
│
├── __tests__/               # Unit, component, and integration tests
├── .env.*                   # Environment variables
├── app.json
├── App.tsx
├── babel.config.js
├── env.d.ts
├── tsconfig.json
└── README.md

```

## 🧩 Available Scripts

```bash
npm run start      # Launch Expo dev server
npm run android    # Run app on Android
npm run ios        # Run app on iOS
npm tsc            # TypeScript Compiler

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

Pull requests welcome for:

- New templates (Supabase, Wallet, AI etc.)
- Documentation and test coverage improvements
- Follow clean commit messages and maintain script consistency.

## 📜 License

MIT © [MrVal042](https://github.com/MrVal042)
