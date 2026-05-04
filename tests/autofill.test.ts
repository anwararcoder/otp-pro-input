import { describe, it, expect } from 'vitest';
import { OtpAutofill } from '../src/features/autofill';

describe('OtpAutofill Feature', () => {
  it('should handle multi-character input and always distribute from index 0 on clean state', () => {
    const currentValues = ['9', '9', '9', '9'];
    const result = OtpAutofill.handle('123', 2, currentValues, 4);
    expect(result).not.toBeNull();
    expect(result?.updatedValues).toEqual(['1', '2', '3', '']);
    expect(result?.nextIndex).toBe(2);
  });

  it('should return null for single character input', () => {
    const result = OtpAutofill.handle('1', 0, ['', ''], 2);
    expect(result).toBeNull();
  });
});
