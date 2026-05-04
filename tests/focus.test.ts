import { describe, it, expect } from 'vitest';
import { OtpFocus } from '../src/features/focus';

describe('OtpFocus Feature', () => {
  it('should calculate next index correctly', () => {
    expect(OtpFocus.next(0, 4)).toBe(1);
    expect(OtpFocus.next(3, 4)).toBe(3); // capped at max
  });

  it('should calculate previous index correctly', () => {
    expect(OtpFocus.previous(2)).toBe(1);
    expect(OtpFocus.previous(0)).toBe(0); // capped at min
  });

  it('should determine if focus should move forward', () => {
    expect(OtpFocus.shouldMoveForward(0, 4)).toBe(true);
    expect(OtpFocus.shouldMoveForward(3, 4)).toBe(false);
  });
});
