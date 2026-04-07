# What belongs on GitHub (working Android app + Vercel preview)

Two outputs share one repo:

| Goal | What runs | How |
|------|-----------|-----|
| **Mobile app** | React Native on device/emulator | `npm install` → `npm run android` |
| **Recruiter preview** | Static web page (phone-frame prototype) | Vercel serves `public/` (built from `seva_app_design_preview.html`) |

Vercel does **not** run the native app; it shows the **interactive HTML preview** so designers/recruiters can click through flows in a browser.

---

## Include in Git (commit & push)

**Core app**

- `App.tsx`, `index.js`, `app.json`
- `package.json`, `package-lock.json`
- `tsconfig.json`, `babel.config.js`, `metro.config.js`
- `jest.config.js`, `jest.setup.js`, `__tests__/` (if you use tests)
- `.eslintrc.js`, `.prettierrc.js`, `.watchmanconfig` (tooling)

**Source & UI**

- `src/` (TypeScript app code, navigation, screens, theme, store, …)
- `screens/` (e.g. `SplashScreen.js`, `WelcomeScreen.js`)
- `assets/` (images, splash video, etc.)

**Android (required for emulator/device builds)**

- Whole `android/` folder **except** generated build outputs (see `.gitignore`)

**iOS (optional but recommended if you ever build for iPhone)**

- Whole `ios/` folder **except** `Pods/`, `build/` (see `.gitignore`)

**Admin web (optional — only if you want that sub-app in the same repo)**

- `admin/package.json`, `admin/package-lock.json`, `admin/vite.config.ts`, `admin/tsconfig.json`, `admin/index.html`, `admin/src/`
- Do **not** commit `admin/node_modules/` or `admin/dist/`

**Vercel / design preview**

- `vercel.json`
- `seva_app_design_preview.html` (source of truth for the prototype)
- `public/index.html` (generated copy — run `npm run build:vercel` before commit so Vercel or reviewers always have a file even if build is skipped)
- `public/.gitkeep`
- `scripts/copy-design-preview.js`

**Root branding / misc**

- `seva_logo.png`, `seva_logo_new.png` (if still used)
- `Gemfile` (if you use Ruby tooling for iOS)

**Do not rely on Git for:** `node_modules/`, Android `build/`, `.gradle`, APKs, secrets.

---

## Do **not** commit

- `node_modules/` (root and `admin/`)
- `android/app/build/`, `android/build/`, `android/.gradle/`, `android/.cxx/`
- `ios/build/`, `ios/Pods/`
- `admin/dist/`
- `.env` (API keys)
- `*.apk`, `*.aab`
- IDE/workspace files if you prefer: `*.code-workspace` (optional — harmless either way)

---

## After clone: run the Android app

```bash
npm install
cd android && ./gradlew clean && cd ..   # optional if builds act weird
npm run android
```

Start Metro in another terminal if needed: `npm start`

---

## After clone: recruiter preview locally

```bash
npm run build:vercel
npx --yes serve public -p 4173
```

Open `http://localhost:4173`

---

## Vercel (recruiter-facing marketing site)

Production deploy builds **`web-landing/`** (React + Vite + Tailwind) and serves **`web-landing/dist`**. Root `vercel.json` runs `cd web-landing && npm install && npm run build`.

**Framework preset:** Other. **Output directory:** leave blank in the dashboard (use repo `vercel.json`) or set to `web-landing/dist`.

The older **`public/index.html`** design lab (`seva_app_design_preview.html`) is still in the repo for reference; it is **not** what Vercel serves unless you change `vercel.json` back.

### Vercel shows 404

1. **Deployments → Build Logs** — confirm `cd web-landing && npm run build` completed.
2. **Framework Preset** — **Other**; remove custom overrides that replace `vercel.json`.
3. **Root Directory** — empty (repo root contains `vercel.json`).

---

## One-time: connect this folder to GitHub

```bash
git init
git add .
git commit -m "Initial commit: SEVA React Native app + Vercel preview"
git branch -M main
git remote add origin https://github.com/ashwathreya/Seva_App.git
git push -u origin main
```

Use your real repo URL if it differs.
