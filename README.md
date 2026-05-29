# Ember — Dating App Prototype

A minimalist React Native (Expo) dating-app prototype built for the Lead /
Senior React Native assessment.

> **Status:** scaffold. Three screens stubbed, swipe gesture not yet wired,
> APK build not yet produced. See `notes/assessment.md` for the working plan
> (not committed).

## Screens

1. **Welcome** — brand, tagline, single CTA into the swipe stack.
2. **Swipe** — Tinder-style profile card stack with left/right swipe.
3. **Match** — post-like detail view with message + keep-swiping actions.

## Tech stack

- React Native via **Expo SDK 56**
- TypeScript
- React Navigation (native-stack) for routing
- `react-native-reanimated` + `react-native-gesture-handler` for the swipe
- No backend — mock profile data ships in `src/data/profiles.ts`

## Folder structure

```
src/
  navigation/    React Navigation stack
  screens/       Welcome, Swipe, Match
  components/    ProfileCard (reused by Swipe and Match)
  data/          Mock profile deck
  theme/         Palette, spacing, radii, typography
  types/         Domain types (Profile)
```

## Local setup

This project uses **Yarn (classic, v1)** — do not use npm.

```bash
yarn install
yarn start          # Metro
yarn android        # run on Android emulator / device
yarn ios            # run on iOS simulator
```

## APK

_To be produced via EAS build. Link will be added here when ready._

## Assumptions

- Mock data only — no auth, no backend, no persistence between sessions.
- Android-first per assessment brief. iOS works via Expo but is not the
  submission target.
- Images are pulled from Unsplash (public CDN) with stable photo IDs so the
  same person renders across reloads.

## Known limitations

- Swipe gesture is not yet implemented in this scaffold revision — the Swipe
  screen renders the top card statically. The component layout and data flow
  are in place; the gesture layer is the next commit.
- No empty-state when the deck is exhausted (TODO).
- No accessibility buttons paired with the gesture (TODO — required for a
  Lead-level deliverable).

## Repository

_TBD — add link after `git remote add origin …`._
