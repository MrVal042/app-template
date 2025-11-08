# 🧰 App Template Monorepo

A curated collection of **production-ready app templates** for rapid development — built for founders, engineers, and studios who ship fast.

Each template is lightweight, modern, and wired with essential tooling for React Native, Expo, and Next.js.

---

### 📦 Available Templates

| Template                      | Command                                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Bare React Native + Theme** | <code>curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/bare-rn-theme/bootstrap.sh &#124; bash</code> |
| **Bare React Native**         | <code>curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/bare-rn/bootstrap.sh &#124; bash</code>       |
| **Expo + Theme**              | <code>curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/expo-theme/bootstrap.sh &#124; bash</code>    |
| **Expo**                      | <code>curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/expo/bootstrap.sh &#124; bash</code>          |
| **Next.js**                   | <code>curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/nextjs/bootstrap.sh &#124; bash</code>        |

---

### 🧱 Shared Utilities

Common utilities, scripts, and configs live in `/shared`.

Use them across templates by sourcing the script:

```bash
source ../shared/utils.sh
```

Examples of shared assets:

- `babel.base.js` — shared Babel alias config
- `tsconfig.base.json` — shared TS paths and compiler options
- `README-template.md` — base template documentation
- `utils.sh` — reusable setup helpers

---

### 🚀 Mobile & Web App Structure Template

A fast bootstrap for **Bare React Native, Expo & Next js with TypeScript** projects with smart file organization, pre-configured aliases, and all essential dependencies to go from setup → development in minutes.

### ⚙️ Features

- 🧱 Clean architecture (`app/`, `types/`, `__test__/`)
- 🎨 Path aliasing (`@components`, `@hooks`, etc.)
- 🧰 Preinstalled Expo SDK-compatible dependencies, Bare React Native, Expo & Next js
- ⚡ Ready for Zustand, React Query, and React Navigation
- 🔒 `.env` integration via `react-native-dotenv`
- 🧩 Automatic TypeScript + Babel setup
- 🧼 Runs `expo doctor` and dependency checks after setup

---

### 🧭 Quick Start

Run this one-line command in any empty folder:

> variant = bare-rn | bare-rn-theme | expo | expo-theme | nextjs

```bash
curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/[variant]/bootstrap.sh | bash
```

Or, download any variant and run manually:

```bash
curl -O https://raw.githubusercontent.com/MrVal042/app-template/main/[variant]/bootstrap.sh
chmod +x bootstrap.sh
./bootstrap.sh
```

---

### 📁 Repository Structure

```
app-template/
├── bare-rn-theme/
├── expo-theme/
├── bare-rn/
├── nextjs/
├── expo/
│
├── shared/
│   ├── README-template.md
│   ├── .env.development
│   ├── .env.production
│   ├── .env.preview
│   ├── utils.sh
│   └──__test__
│
├── .gitignore
├── README.md
└── LICENSE
```

---

### 🛠 Requirements

- Node.js **≥ 18**
- npm or yarn
- Git installed and configured

---

### 🔄 Versioning

Each template is versioned independently using suffix tags:

```bash
v1.0.0-expo
v1.0.0-expo-theme
v1.0.0-nextjs
v1.0.0-bare-rn
```

---

### 🧭 Future Extensions

- Add **Expo + Supabase** and **Next.js + Supabase** starters
- Introduce a CLI tool (`npx create-patterned-app`)
- Add **GitHub Actions** to auto-validate all templates weekly
- Add **Storybook + UI Kit** integration for theming templates

---

### 🤝 Contributing

Contributions welcome.
Fork, build, and open PRs for new templates, improvements, or setup enhancements.
Please follow:

- Clean, meaningful commit messages
- Consistent file naming and script style
- Keep dependencies minimal and Expo-SDK compatible

---

## 📜 License

MIT © [MrVal042](https://github.com/MrVal042)

---

### 💡 Pro Tip

You can alias any template installer to a short command:

```bash
alias create-expo-theme="curl -sSL https://raw.githubusercontent.com/MrVal042/app-template/main/expo-theme/bootstrap.sh | bash"
```

Then just run:

```bash
create-expo-theme
```

to spin up a new project instantly.

```

---

Would you like me to generate a **`README-template.md`** file in `/shared/` that dynamically injects template names and URLs, so adding new templates updates the README automatically?
```
