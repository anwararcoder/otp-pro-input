<template>
  <div class="example">
    <h1>Vue 3 OTP Example</h1>
    <p>Enter your 4-digit code:</p>

    <OTPInput v-model="otp" :length="4" @complete="onComplete" />

    <div class="status"><strong>Current Value:</strong> {{ otp }}</div>

    <button @click="otp = ''">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { OTPInput } from '../../src/adapters/vue';

const otp = ref('');
const onComplete = (code) => {
  alert(`Vue OTP Complete: ${code}`);
};
</script>

<style scoped>
.example {
  padding: 20px;
  font-family: sans-serif;
}
.status {
  margin-top: 20px;
}
button {
  margin-top: 10px;
  padding: 8px 16px;
}
</style>
