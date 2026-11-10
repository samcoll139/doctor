# Suha Care — Modern Hospital, Doctor & Lab Booking Application

A modern, production-grade cross-platform mobile application converted from the prototype into **Modern TypeScript + Vite** with a **Native Android Gradle Project** (powered by Capacitor, **strictly no Flutter**) and a **relational SQLite database backend**.

---

## Key Improvements Made

1. **Mobile Mock Background Removed**:
   - The artificial desktop phone frame (`.phone`, `.phone-screen`, `.notch`, fake status bar) has been completely removed.
   - The UI now renders full-screen edge-to-edge as a true native mobile app with full support for safe area insets (`env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`).

2. **SQLite Database Backend**:
   - Built on a real SQLite database (`backend/suhacare.db`).
   - Tables: `hospitals`, `doctors`, `doctor_slots`, `appointments`, `prescriptions`, `pharmacy_stock`, `pharmacy_orders`, `lab_reports`, `home_collections`, `doubts`, and `family_members`.
   - Dedicated Express REST API (`backend/server.js`) providing full CRUD endpoints.
   - Includes local storage fallback for offline standalone mode on mobile devices.

3. **Modern TypeScript & Modular Architecture**:
   - Modern, modular component structure (`src/views/`, `src/db/`, `src/types/`, `src/styles/`).
   - Bundled with Vite for instant builds and hot module reloading.
   - Multi-language support: English and Tamil (தமிழ்).

4. **Native Android Project (No Flutter)**:
   - Complete native Android project inside `android/` directory.
   - Ready to build into an installable `.apk` file (`app-debug.apk`).

---

## Project Structure

```
d:\project\
├── backend/
│   ├── database.js          # SQLite connection, schema tables & initial seed data
│   ├── server.js            # Express REST API server
│   └── suhacare.db          # SQLite database file
├── src/
│   ├── styles/main.css      # Edge-to-edge mobile responsive CSS
│   ├── db/sqliteService.ts  # Client-side SQLite data adapter
│   ├── types/index.ts       # TypeScript models & interfaces
│   ├── i18n.ts              # English & Tamil translations
│   ├── views/
│   │   ├── patientViews.ts  # Patient screens (Search, Booking, Pharmacy, AI Assistant)
│   │   ├── doctorViews.ts   # Doctor screens (Dashboard, Reschedule, Patient Records)
│   │   └── labViews.ts      # Lab screens (Report Upload, Home Sample Collection)
│   └── main.ts              # App router & controller
├── android/                 # Native Android Gradle Project
│   ├── app/
│   │   ├── build.gradle     # Android SDK & APK configuration
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── java/com/suhacare/app/MainActivity.java
│   └── gradlew / gradlew.bat # Gradle wrapper for building APK
├── .github/workflows/
│   └── build-apk.yml        # 1-click cloud APK build workflow
├── index.html               # Clean HTML root
├── package.json             # Scripts & dependencies
└── vite.config.ts           # Bundler config
```

---

## How to Run the Project Locally

### 1. Start the SQLite Backend Server
```powershell
npm run server
```
The SQLite REST API will run at `http://localhost:5000`.

### 2. Start the Frontend App (in a separate terminal)
```powershell
npm run dev
```
Open `http://localhost:3000` in your browser. You can test all user personas (Patient, Doctor, Lab) and switch languages between English and Tamil.

---

## How to Create the APK File to Run on Your Phone

You have **3 convenient methods** to generate your `.apk` file:

### Method 1: Using Android Studio (Recommended & Easiest)
1. Download and install [Android Studio](https://developer.android.com/studio) (if not already installed).
2. Open Android Studio and click **Open**.
3. Select the folder: `D:\project\android`.
4. Wait for Gradle to finish syncing (takes ~1-2 minutes on first open).
5. In the top menu, go to:
   **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
6. Once finished, a notification popup will appear at the bottom right. Click **locate**.
7. Your APK will be at:
   ```
   D:\project\android\app\build\outputs\apk\debug\app-debug.apk
   ```

---

### Method 2: Command Line (Gradle)
Whenever you make changes to your TypeScript/HTML code:
```powershell
# 1. Compile the latest web app
npm run build

# 2. Sync files to the Android project
npx cap sync android

# 3. Build the APK using Gradle
cd android
.\gradlew.bat assembleDebug
```
The generated APK file will be ready at:
```
D:\project\android\app\build\outputs\apk\debug\app-debug.apk
```

---

### Method 3: Cloud Build via GitHub Actions (Zero Local Setup)
If you prefer not to install Android Studio or SDKs on your computer:
1. Push this project to your GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Suha Care App"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. In your GitHub repo, go to the **Actions** tab.
3. The **Build Android APK** workflow will automatically run and compile the APK on GitHub's cloud servers.
4. Once completed (approx. 2-3 minutes), click on the completed run and download the **`suha-care-debug-apk`** zip file.
5. Extract it to get `app-debug.apk` directly!

---

## How to Install the APK on Your Phone

Once you have `app-debug.apk`:
1. **Via USB / ADB**:
   Connect your Android phone with USB debugging enabled and run:
   ```powershell
   adb install D:\project\android\app\build\outputs\apk\debug\app-debug.apk
   ```
2. **Via WhatsApp / Google Drive / Email**:
   - Send `app-debug.apk` to your phone via WhatsApp, Google Drive, or email.
   - Tap on the APK file on your phone.
   - If prompted, tap **Settings** and enable **"Allow from this source"**.
   - Tap **Install**, and the Suha Care app will install and open natively on your phone!
"# doctors" 
"# doctor" 
