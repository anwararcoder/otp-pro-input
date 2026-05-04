# React Usage

## Installation

```tsx
import { OTPInput } from '@ar-coder/otp-pro-input/react';
```

## Example

```tsx
import React, { useState } from 'react';
import { OTPInput } from '@ar-coder/otp-pro-input/react';

function App() {
  const [otp, setOtp] = useState('');

  return (
    <OTPInput
      length={6}
      value={otp}
      onChange={setOtp}
      onComplete={(code) => console.log('Final Code:', code)}
      error={false}
    />
  );
}
```

### Custom Rendering

Use the `renderInput` prop to customize the look of each input:

```tsx
<OTPInput
  length={4}
  renderInput={(props, index) => (
    <input {...props} className="my-custom-input-class" />
  )}
/>
```
