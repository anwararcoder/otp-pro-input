# Vue 3 Usage

## Installation

```ts
import { OTPInput } from '@ar-coder/otp-pro-input/vue';
```

## Example

```vue
<template>
  <OTPInput
    v-model="otp"
    :length="6"
    @complete="onComplete"
  />
</template>

<script setup>
import { ref } from 'vue';
import { OTPInput } from '@ar-coder/otp-pro-input/vue';

const otp = ref('');
const onComplete = (code) => {
  console.log('OTP complete:', code);
};
</script>
```
