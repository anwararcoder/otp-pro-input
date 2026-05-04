# ⚙️ Release Notes: v2.1.0 (Stable Release)

We are proud to announce the first stable release of **@ar-coder/otp-pro-input**! 🚀

This library was built to solve the frustration of implementing OTP inputs across different frameworks while maintaining a consistent, high-quality user experience.

### 🌟 Key Features
- **Smart Backspace Navigation**: Focus and clearing happen in a single, intuitive keypress.
- **Global Paste Override**: Pasting always starts from index 0, preventing shifted inputs.
- **Multi-Framework Adapters**: First-class support for React, Vue 3, and Vanilla JS.
- **Mobile Autofill Fix**: Native "one-time-code" support for seamless mobile onboarding.
- **Full TypeScript Support**: Ship with confidence with exhaustive type definitions.

### 🚀 UX Improvements
- **Zero-Friction Corrections**: Backspacing on an empty field automatically targets the previous digit.
- **Paste Sanitization**: Automatically strips non-numeric characters on paste and autofill.
- **Intelligent Focus**: Post-paste focus automatically jumps to the correct next field.

### 📦 Supported Packages
- `@ar-coder/otp-pro-input`: Core engine and Vanilla adapter.
- `@ar-coder/otp-pro-input/react`: React component adapter.
- `@ar-coder/otp-pro-input/vue`: Vue 3 component adapter.

---
*Special thanks to all early testers! If you find any issues, please report them on our [GitHub Issues](https://github.com/anwararcoder/otp-pro-input/issues) page.*
