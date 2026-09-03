# IE! — Insubria Student Life Beta 0.3

Minimal, mobile-first student platform by Insubria Eventi.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000. Installation landing page: http://localhost:3000/install.

## Production web / PWA
```bash
npm run build
npm start
```
GitHub + Vercel deployment instructions are in `DEPLOYMENT.md`.

## Native wrappers
Capacitor is preconfigured with bundle/package id `it.insubriaeventi.ie`.

Android:
```bash
npm run cap:add:android
npm run cap:sync:android
npm run android:open
```

iOS/iPadOS (macOS + Xcode required):
```bash
npm run cap:add:ios
npm run cap:sync:ios
npm run ios:open
```

## Beta 0.3 additions
- installable PWA with offline app shell
- iPhone/iPad standalone metadata and safe-area support
- Android/iOS Capacitor wrapper configuration
- responsive layouts for phone/tablet/desktop and portrait/landscape
- `/install` device-aware installation page
- GitHub CI and Android APK workflow
- Vercel configuration
- deep-link association templates
- reduced-motion accessibility support
