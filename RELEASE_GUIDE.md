# 📸 GIF Generation Guide

To create the perfect demo GIF for the README, follow these steps:

## 🛠️ Tools
- **Windows**: [ScreenToGif](https://www.screentogif.com/) (Recommended)
- **Mac**: [Kap](https://getkap.co/)
- **All**: [Loom](https://www.loom.com/) (Export to GIF)

## 🎞️ Recording Sequence
1. **Typing**: Type 3 digits, then backspace twice. Shows smart focus movement.
2. **Backspace Correction**: Move to the 4th box, press backspace. Shows previous character clearing.
3. **Smart Paste**: Copy "123456" from a text file. Focus on the **3rd** box in the demo and paste. Shows distribution starting from index 0.
4. **Completion**: Type the final digit. Shows the loading state and alert.

## 💾 Save Settings
- **Path**: `/assets/otp-demo.gif`
- **Dimensions**: ~800px width.
- **FPS**: 24 or 30 for smoothness.
- **Optimization**: Use "Lossy GIF" to keep file size under 2MB.

---

# 🚀 Release & Versioning Strategy

## 🔢 Semantic Versioning
- **Major (2.0.0)**: Initial stable release. Any future breaking changes (e.g., changing prop names).
- **Minor (1.1.0)**: New features (e.g., adding an Angular adapter).
- **Patch (1.0.1)**: Bug fixes or documentation updates.

## 📦 npm Publish Workflow
1. Ensure you are on the `main` branch and all tests pass: `npm test`.
2. Build the production assets: `npm run build`.
3. Bump the version:
   ```bash
   npm version 2.1.0
   ```
4. Push tags to GitHub:
   ```bash
   git push origin main --tags
   ```
5. Publish to the registry:
   ```bash
   npm publish --access public
   ```

## 🤖 GitHub Automation
The `publish.yml` workflow is configured to automatically publish to npm when you create a **New Release** on GitHub using the tag pushed in step 4.
