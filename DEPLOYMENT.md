# IE! deployment

## 1. GitHub
1. Create an empty GitHub repository.
2. In this folder run `git init`, `git add .`, `git commit -m "IE Beta 0.3"`.
3. Add the remote and push `main`.

## 2. Vercel (free tier)
1. Import the GitHub repository in Vercel.
2. Framework: Next.js (auto-detected).
3. Build command: `npm run build`.
4. No output directory is needed.
5. Every push to `main` creates a new production deployment when Git integration is enabled.

## 3. PWA
Visit `/install` from the target device.
- Android/Chromium: use the install prompt when available.
- iPhone/iPad: Safari > Share > Add to Home Screen > enable Open as Web App.

## 4. Android APK
The repository includes Capacitor and a GitHub Actions workflow.
- Run the `Android APK` workflow manually, or push a tag such as `v0.3.0`.
- Download `IE-Android-APK` from the workflow artifacts.
- The CI APK is a debug-signed installable build for testing/community beta.
- For public production distribution, configure a protected release keystore and build a release-signed APK/AAB.

## 5. iOS/iPadOS native build
Capacitor config is ready, but Apple-native distribution requires a Mac/Xcode plus Apple signing/provisioning.
Run on macOS:
`npm ci`
`npm run cap:add:ios`
`npm run cap:sync:ios`
`npm run ios:open`
Then configure Team, bundle ID and signing in Xcode.

Direct public installation from a website is not created by arbitrary configuration profiles. Use PWA immediately, App Store/TestFlight, or Apple's authorized EU Web Distribution flow if the developer account qualifies.

## 6. Deep links
Templates are in `native/`. Replace package/team IDs and certificate fingerprint after signing, then publish the resulting files in `public/.well-known/`.
