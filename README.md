# Hello World Mobile POC

A simple mobile-first proof of concept using Next.js, TypeScript, Tailwind CSS, and Capacitor.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Capacitor Android wrapper

## 1. Install Dependencies

```powershell
npm install
```

## 2. Run as Web App

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

To test from another device on the same Wi-Fi:

```powershell
npm run dev -- --hostname 0.0.0.0
```

Then open:

```text
http://YOUR_LAPTOP_IP:3000
```

## 3. Build Static Web Output

Capacitor packages the static `out` folder.

```powershell
npm run mobile:build
```

## 4. Add Android Platform

Run once:

```powershell
npm run android:add
```

This creates the native Android project in:

```text
android/
```

## 5. Sync Web Build to Android

Run this whenever the Next.js UI changes:

```powershell
npm run android:sync
```

## 6. Open in Android Studio

```powershell
npm run android:open
```

From Android Studio, select a device/emulator and press Run.

## 7. Build Android Debug APK From Terminal

If Java and Android SDK are configured:

```powershell
cd android
.\gradlew.bat assembleDebug
```

The debug APK is generated at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Notes

- Android can be built and tested on Windows.
- iOS requires macOS with Xcode.
- The app UI is mobile-first and can also run in a normal browser.
