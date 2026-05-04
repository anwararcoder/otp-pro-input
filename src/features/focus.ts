/**
 * Logic for managing focus navigation in OTP inputs.
 */

export const OtpFocus = {
  /**
   * Calculates the next index based on current movement.
   */
  next(currentIndex: number, maxLength: number): number {
    return Math.min(currentIndex + 1, maxLength - 1);
  },

  /**
   * Calculates the previous index.
   */
  previous(currentIndex: number): number {
    return Math.max(currentIndex - 1, 0);
  },

  /**
   * Determines if focus should move forward after an input.
   */
  shouldMoveForward(currentIndex: number, maxLength: number): boolean {
    return currentIndex < maxLength - 1;
  },
};
