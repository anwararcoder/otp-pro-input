# API Reference

## OtpOptions

Shared configuration for all adapters.

| Prop              | Type                            | Default      | Description                                              |
| ----------------- | ------------------------------- | ------------ | -------------------------------------------------------- |
| `length`          | `number`                        | **Required** | Number of OTP digits.                                    |
| `shouldAutoFocus` | `boolean`                       | `true`       | Automatically focus the first input on mount.            |
| `onChange`        | `(value: string) => void`       | -            | Callback when any digit changes.                         |
| `onComplete`      | `(value: string) => void`       | -            | Callback when all digits are filled.                     |
| `type`            | `'tel' \| 'text' \| 'password'` | `'tel'`      | Input type. `'tel'` is recommended for mobile keyboards. |
| `error`           | `boolean`                       | `false`      | Visual error state.                                      |
| `disabled`        | `boolean`                       | `false`      | Disable all inputs.                                      |
