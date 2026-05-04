import { OtpValidation } from './validation';

/**
 * Logic for distributing pasted content across OTP inputs.
 */

export const OtpPaste = {
  /**
   * Distributes a string of values across an array starting at a specific index.
   */
  distribute(
    pastedValue: string,
    startIndex: number,
    currentValues: string[],
    maxLength: number,
  ): { updatedValues: string[]; lastIndex: number } {
    const cleanValue = OtpValidation.numericOnly(pastedValue).split('');
    const newValues = [...currentValues];
    
    let lastIndex = startIndex;
    for (let i = 0; i < cleanValue.length && (startIndex + i) < maxLength; i++) {
      newValues[startIndex + i] = cleanValue[i];
      lastIndex = startIndex + i;
    }

    return {
      updatedValues: newValues,
      lastIndex,
    };
  },
};
