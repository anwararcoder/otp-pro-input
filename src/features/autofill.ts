import { OtpPaste } from './paste';

/**
 * Logic for handling mobile OTP autofill (which often comes as a single multi-character string).
 */

export const OtpAutofill = {
  /**
   * Handles multi-character input by distributing it.
   */
  /**
   * Handles multi-character input by distributing it from index 0.
   */
  handle(
    input: string,
    _index: number,
    _currentValues: string[],
    maxLength: number,
  ): { updatedValues: string[]; nextIndex: number } | null {
    if (input.length <= 1) return null;

    const emptyValues = new Array(maxLength).fill('');
    const { updatedValues, lastIndex } = OtpPaste.distribute(
      input,
      0,
      emptyValues,
      maxLength,
    );

    return {
      updatedValues,
      nextIndex: Math.min(lastIndex, maxLength - 1),
    };
  },
};
