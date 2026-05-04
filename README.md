# @ar-coder/otp-pro-input
> A smart, framework-agnostic OTP input library for React, Vue, and Vanilla JS.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/@ar-coder/otp-pro-input.svg)](https://badge.fury.io/js/@ar-coder/otp-pro-input)
[![Build Status](https://github.com/anwararcoder/otp-pro-input/actions/workflows/ci.yml/badge.svg)](https://github.com/anwararcoder/otp-pro-input/actions)

`@ar-coder/otp-pro-input` provides a seamless, high-performance OTP entry experience across different web frameworks. It handles the complex "edge cases" of OTP inputs—like smart backspace navigation, global paste distribution, and mobile SMS autofill—so you don't have to.

## ✨ Features

- 🧠 **Smart Backspace Behavior**: Intuitively handles focus and clearing, even on empty fields.
- 📋 **Global Paste Handling**: Treating every paste as a fresh OTP, starting from index 0.
- 📱 **Mobile Autofill Support**: Native support for "one-time-code" autofill on iOS and Android.
- 🏗️ **Multi-Framework**: First-class adapters for **React**, **Vue 3**, and **Vanilla JS**.
- 🛠️ **Fully Controlled & Uncontrolled**: Use it your way with standard `value`/`onChange` or `v-model`.
- ♿ **Accessibility Ready**: Built with ARIA standards and keyboard navigation in mind.
- 📦 **Zero Dependencies**: Lightweight and fast.

## 🚀 Installation

```bash
npm install @ar-coder/otp-pro-input
```

## 📖 Usage Examples

### React

```tsx
import { OTPInput } from '@ar-coder/otp-pro-input/react';

function App() {
  return (
    <OTPInput
      length={6}
      onComplete={(code) => console.log('OTP Verified:', code)}
    />
  );
}
```

### Vue 3

```vue
<template>
  <OTPInput v-model="otp" :length="4" @complete="onVerified" />
</template>

<script setup>
import { ref } from 'vue';
import { OTPInput } from '@ar-coder/otp-pro-input/vue';

const otp = ref('');
const onVerified = (code) => alert('Code: ' + code);
</script>
```

### Vanilla JS

```javascript
import { createOtpInput } from '@ar-coder/otp-pro-input/vanilla';

const otp = createOtpInput({
  container: '#otp-container',
  length: 5,
  onComplete: (code) => console.log(code)
});
```

## ⚙️ API Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length` | `number` | **Required** | Number of OTP digits. |
| `value` | `string` | `undefined` | Controlled value (v-model in Vue). |
| `onChange` | `function` | - | Callback triggered on every input change. |
| `onComplete` | `function` | - | Callback triggered when all digits are filled. |
| `disabled` | `boolean` | `false` | Disables all input fields. |
| `error` | `boolean` | `false` | Applies error styling to the component. |
| `shouldAutoFocus` | `boolean` | `true` | Automatically focuses the first input on mount. |

## 🧠 UX Behavior

### Smart Backspace Navigation
Most OTP components require two backspace presses to move back and clear. `@ar-coder/otp-pro-input` does it in one. If a field is empty, Backspace immediately jumps to the previous field and clears it, making corrections feel instant and natural.

### Global Paste Distribution
We ignore where you are focused when you paste. If you paste a code, we assume it's the *whole* code. We always distribute the pasted value from index 0, ensuring your users never end up with shifted or corrupted inputs.

### Mobile SMS Autofill
By setting the correct `autocomplete` and `inputmode` attributes, we trigger the native SMS code suggestions on mobile devices. Our engine treats these multi-character "autofills" exactly like a paste—cleaning and distributing them across all fields.

## 🌍 Browser Support

- **Chrome / Edge**: Full Support
- **Firefox**: Full Support
- **Safari (iOS & Desktop)**: Full Support (including SMS Autofill)

## 📄 License

MIT © [Anwar Ramadan](https://github.com/anwararcoder)
