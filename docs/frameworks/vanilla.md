# Vanilla JS Usage

## Installation

```ts
import { createOtpInput } from '@ar-coder/otp-pro-input/vanilla';
```

## Example

```html
<div id="otp-container"></div>

<script type="module">
  import { createOtpInput } from '@ar-coder/otp-pro-input/vanilla';

  const otp = createOtpInput({
    container: '#otp-container',
    length: 4,
    onComplete: (code) => alert('Code: ' + code)
  });
</script>
```

### API Methods

The `createOtpInput` function returns an instance with the following methods:

- `getValue()`: Returns current OTP string.
- `setValue(val)`: Programmatically set value.
- `focus()`: Focus active input.
- `destroy()`: Remove from DOM and cleanup listeners.
