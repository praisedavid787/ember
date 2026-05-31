# Ember — React Native Dating App Prototype

A minimalist, Tinder-style dating-app prototype built with React Native and
Expo. Three screens, a gesture-driven swipe deck, and a clean
white / grey / black / red palette.

> Built as a Lead / Senior React Native technical assessment. The package name
> in the repo is `dating-app`; **Ember** is the in-app brand.

---

## Project Overview

Ember lets you browse a deck of profiles and swipe through them the way you'd
expect from a modern dating app:

1. **Welcome** — branding, a one-line pitch, and a single call-to-action.
2. **Swipe** — the core screen: a stack of profile cards you drag left to pass
   or right to like, with smooth gesture animations and on-screen buttons for
   the same actions.
3. **Match** — when you like someone, a match screen presents that profile in a
   calmer, fuller layout with a message call-to-action.

The focus is on the things a reviewer actually feels: a swipe that animates
smoothly, a clean and consistent UI, reusable components, and sensible state
management — without over-engineering a three-screen app.

---

## Features Implemented

- **Tinder-style swipe deck**
  - Drag-to-swipe with live card tilt and a 3-card stack that springs forward as
    the top card leaves.
  - Fading **LIKE** / **NOPE** overlays that track drag distance.
  - Commit on a distance threshold *or* a fast flick (velocity); springs back to
    center otherwise.
- **Accessible by design** — Pass / Like buttons drive the *same* fly-out
  animation as the gesture, so the app is fully usable without swiping. All
  interactive elements have accessibility roles and labels.
- **Match flow** — a right swipe records the like and routes to the Match screen
  with the selected profile.
- **Empty state** — when the deck is exhausted, a friendly "all caught up"
  screen offers a *Start over*.
- **Shared profile card** — one `ProfileCard` component is reused by both the
  Swipe deck and the Match screen (with a `compact` variant).
- **Lightweight state management** — a React Context (`MatchesProvider`) holds
  liked profiles and is shared across screens.
- **Typed navigation** — `@react-navigation/native-stack` with a typed route
  param contract.
- **Centralized theme** — colours, spacing, radii, and typography live in a
  single source of truth (`src/theme/colors.ts`).

---

## Tech Stack

| Area | Choice |
|---|---|
| Framework | Expo SDK **56**, React Native **0.85**, React **19** |
| Language | TypeScript |
| Navigation | `@react-navigation/native` + `native-stack` |
| Gestures | `react-native-gesture-handler` (v2 `Gesture` API) |
| Animation | `react-native-reanimated` v4 (+ `react-native-worklets`) |
| State | React Context (no Redux — intentionally light for 3 screens) |
| Package manager | **Yarn** (classic / v1) |

**Why Reanimated + Gesture Handler over a swipe library?** Driving the
animation directly keeps the swipe feel fully under our control (tilt, overlays,
fling threshold, programmatic button-triggered swipes) and is the toolset a Lead
would reach for. It's a deliberate, defensible choice rather than the first npm
result.

---

## Folder Structure

```
src/
├── components/
│   ├── ProfileCard.tsx     # shared card (Swipe deck + Match screen)
│   └── SwipeCard.tsx       # gesture + animation wrapper around ProfileCard
├── data/
│   └── profiles.ts         # mock profile deck
├── navigation/
│   └── AppNavigator.tsx    # typed native-stack navigator
├── screens/
│   ├── Welcome/
│   ├── Swipe/
│   └── Match/
├── state/
│   └── MatchesProvider.tsx # Context store for liked profiles
├── theme/
│   └── colors.ts           # colours, spacing, radii, typography
└── types/
    └── profile.ts          # Profile type
```

---

## Setup & Installation

**Prerequisites:** Node 18+ and Yarn (classic). This project uses Yarn — please
do not use npm.

```bash
# 1. Install dependencies
yarn install

# 2. Start the Expo dev server
yarn start

# then press:
#   a  → open on Android (emulator or connected device)
#   i  → open on iOS simulator (macOS)
```

You can also launch a platform directly:

```bash
yarn android   # build & open on Android
yarn ios       # build & open on iOS (macOS only)
```

Type-check the project at any time:

```bash
yarn tsc --noEmit
```

> **Note:** Reanimated v4 requires `react-native-worklets`; both are pinned to
> the Expo SDK 56 versions. The Reanimated Babel plugin is configured
> automatically by `babel-preset-expo` — no manual Babel config needed.

### Building the APK (EAS)

The Android APK is produced with EAS Build:

```bash
# one-time
npm i -g eas-cli
eas login

# build an installable APK
eas build --platform android --profile preview
```

The `preview` profile is configured to output an `.apk` (rather than an
app-bundle), suitable for direct install on a device.

---

## Assumptions Made

- **Mock data only.** Profiles are local JavaScript (`src/data/profiles.ts`)
  using public Unsplash placeholder images. There is no backend or API.
- **No authentication.** The app opens straight into the experience; the
  Welcome CTA is the only gate.
- **A like always "matches."** For demo purposes every right swipe routes to the
  Match screen. A real app would resolve this server-side.
- **Single-session.** Liked profiles live in memory via Context; there is no
  persistence between app launches.
- **Android-first.** The build target for submission is Android (APK). The code
  is cross-platform and runs on iOS, but iOS is not the deliverable.

---

## Known Limitations

- No persistence — relaunching the app resets the deck and matches.
- No real chat — the Match screen's "Send a message" is a placeholder.
- No networking, loading, or image-error states beyond the deck's empty state.
- The deck is finite (the mock set); "Start over" replays the same profiles.

---

## APK Download

- **Google Drive link:** _TODO — paste the shared Drive link to the APK here._

**Install instructions (Android):**

1. Open the Drive link on your Android device and download the `.apk`.
2. When prompted, allow installs from this source (Settings →
   *Install unknown apps* → enable for your browser / Files app).
3. Open the downloaded file and tap **Install**.
4. Launch **Ember** from your app drawer.

---

## Repository

- **Repository link:** https://github.com/praisedavid787/ember

No additional configuration is required to run the project beyond the
[Setup & Installation](#setup--installation) steps above.
