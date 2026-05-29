# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

# Package manager

This project uses **Yarn** (classic, v1). Do not use npm. Do not create `package-lock.json`.

- Install: `yarn install`
- Add dependency: `yarn add <pkg>` (use `npx expo install <pkg>` only when you specifically need Expo's SDK-version pin; otherwise plain `yarn add`)
- Add dev dependency: `yarn add -D <pkg>`
- Remove: `yarn remove <pkg>`
- Run script: `yarn <script>` (e.g. `yarn start`, `yarn android`)

If you find a `package-lock.json` in the tree, delete it and reinstall with `yarn`.

# Git commits

Do **not** watermark commit messages. No `Co-Authored-By: Claude …` trailer,
no `🤖 Generated with …` line, no signature. Author the commit as the user.
