/**
 * Validation logic for OTP inputs.
 */

export const OtpValidation = {
  /**
   * Cleans input to only include numeric digits.
   */
  numericOnly(input: string): string {
    return input.replace(/[^0-9]/g, '');
  },

  /**
   * Checks if a string is a valid numeric digit.
   */
  isDigit(char: string): boolean {
    return /^[0-9]$/.test(char);
  },
};
