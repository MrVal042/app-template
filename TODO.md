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
curl -sSL https://raw.githubusercontent.com/mrval042/app-structure/expo-theme/main/bootstrap-expo-template.sh | bash
```

Or download manually:

```bash
curl -O https://raw.githubusercontent.com/mrval042/app-structure/expo-theme/main/bootstrap-expo-template.sh
chmod +x bootstrap-expo-template.sh
./bootstrap-expo-template.sh

```

## 📁 Resulting Structure

```pgsql
app-template/
├── bare-rn/
├── bare-rn-theme/
├── expo/
├── expo-theme/
├── nextjs/
│
├── .gitIgnore
└── README.md
```


## 🛠 Requirements

> Node.js ≥ 18
> npm or yarn
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

---

Would you like me to modify this README so it uses your real GitHub username and repo link automatically (e.g. `MrVal042/app-structure-expo-theme`)?
