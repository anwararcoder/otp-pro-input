import { describe, it, expect } from 'vitest';
import { OtpPaste } from '../src/features/paste';

describe('OtpPaste Feature', () => {
  it('should distribute values correctly starting from an index', () => {
    const currentValues = ['', '', '', ''];
    const { updatedValues, lastIndex } = OtpPaste.distribute('123', 0, currentValues, 4);
    expect(updatedValues).toEqual(['1', '2', '3', '']);
    expect(lastIndex).toBe(2);
  });

  it('should handle offset start index', () => {
    const currentValues = ['a', 'b', '', ''];
    const { updatedValues, lastIndex } = OtpPaste.distribute('12', 2, currentValues, 4);
    expect(updatedValues).toEqual(['a', 'b', '1', '2']);
    expect(lastIndex).toBe(3);
  });

  it('should truncate when pasted value is longer than remaining length', () => {
    const currentValues = ['', '', '', ''];
    const { updatedValues, lastIndex } = OtpPaste.distribute('12345', 1, currentValues, 4);
    expect(updatedValues).toEqual(['', '1', '2', '3']);
    expect(lastIndex).toBe(3);
  });

  it('should ignore non-numeric characters', () => {
    const currentValues = ['', '', '', ''];
    const { updatedValues } = OtpPaste.distribute('1a2b3', 0, currentValues, 4);
    expect(updatedValues).toEqual(['1', '2', '3', '']);
  });
});
