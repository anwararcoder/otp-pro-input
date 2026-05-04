/**
 * Core OTP Engine Logic
 * Framework-agnostic logic for managing OTP input state and behavior.
 */

import { OtpValidation } from '../features/validation';
import { OtpPaste } from '../features/paste';
import { OtpAutofill } from '../features/autofill';
import { OtpFocus } from '../features/focus';

export interface OtpEngineOptions {
  length: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  shouldAutoFocus?: boolean;
}

export class OtpEngine {
  private values: string[];
  private activeIndex: number = 0;
  private length: number;
  private onChange?: (value: string) => void;
  private onComplete?: (value: string) => void;

  constructor(options: OtpEngineOptions) {
    this.length = options.length;
    this.values = new Array(this.length).fill('');
    this.onChange = options.onChange;
    this.onComplete = options.onComplete;

    if (options.value) {
      this.handlePaste(options.value, 0);
    }
  }

  public getValues() {
    return [...this.values];
  }

  public getActiveIndex() {
    return this.activeIndex;
  }

  /**
   * Handles individual character input or multi-character autofill.
   */
  public handleInput(index: number, input: string): void {
    const autofillResult = OtpAutofill.handle(input, index, this.values, this.length);

    if (autofillResult) {
      this.values = autofillResult.updatedValues;
      this.activeIndex = autofillResult.nextIndex;
      this.notifyChange();
      this.checkComplete();
      return;
    }

    const cleanInput = OtpValidation.numericOnly(input);
    if (!cleanInput) return;

    // Single char input
    this.values[index] = cleanInput;
    this.notifyChange();

    // Move focus forward
    if (OtpFocus.shouldMoveForward(index, this.length)) {
      this.activeIndex = OtpFocus.next(index, this.length);
    }

    this.checkComplete();
  }

  /**
   * Handles backspace and arrow navigation.
   */
  public handleKeyDown(index: number, key: string): void {
    if (key === 'Backspace') {
      if (this.values[index] === '' && index > 0) {
        // Move focus back and clear the previous value
        const prevIndex = OtpFocus.previous(index);
        this.activeIndex = prevIndex;
        this.values[prevIndex] = '';
        this.notifyChange();
      } else {
        // Clear current value and stay in place
        this.values[index] = '';
        this.activeIndex = index;
        this.notifyChange();
      }
    } else if (key === 'ArrowLeft') {
      this.activeIndex = OtpFocus.previous(index);
    } else if (key === 'ArrowRight') {
      this.activeIndex = OtpFocus.next(index, this.length);
    }
  }

  /**
   * Distributes pasted content. Always starts from index 0 and overrides current state.
   */
  public handlePaste(pastedValue: string, _startIndex?: number): void {
    const emptyValues = new Array(this.length).fill('');
    const { updatedValues, lastIndex } = OtpPaste.distribute(
      pastedValue,
      0,
      emptyValues,
      this.length,
    );

    this.values = updatedValues;
    this.notifyChange();
    // Focus the last filled input
    this.activeIndex = Math.min(lastIndex, this.length - 1);
    this.checkComplete();
  }

  public setActiveIndex(index: number) {
    if (index >= 0 && index < this.length) {
      this.activeIndex = index;
    }
  }

  private notifyChange() {
    this.onChange?.(this.values.join(''));
  }

  private checkComplete() {
    const val = this.values.join('');
    if (val.length === this.length) {
      this.onComplete?.(val);
    }
  }
}

/**
 * Hook-like utility for state management.
 * Can be wrapped by React/Vue/etc.
 */
export function createOtpEngine(options: OtpEngineOptions) {
  return new OtpEngine(options);
}
