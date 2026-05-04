import { describe, it, expect, vi } from 'vitest';
import { OtpEngine } from '../src/core/otp-engine';

describe('OtpEngine', () => {
  it('should initialize with empty values', () => {
    const engine = new OtpEngine({ length: 4 });
    expect(engine.getValues()).toEqual(['', '', '', '']);
    expect(engine.getActiveIndex()).toBe(0);
  });

  it('should handle single digit input and move focus', () => {
    const engine = new OtpEngine({ length: 4 });
    engine.handleInput(0, '1');
    expect(engine.getValues()).toEqual(['1', '', '', '']);
    expect(engine.getActiveIndex()).toBe(1);
  });

  it('should handle multi-digit input (autofill) and distribute from index 0 on clean state', () => {
    const engine = new OtpEngine({ length: 4 });
    engine.handleInput(2, '12');
    expect(engine.getValues()).toEqual(['1', '2', '', '']);
    expect(engine.getActiveIndex()).toBe(1);
  });

  it('should handle paste and distribute from index 0 on clean state', () => {
    const onChange = vi.fn();
    const engine = new OtpEngine({ length: 4, onChange });
    engine.handleInput(0, '9');
    engine.handlePaste('567', 2); // Ignore startIndex 2
    expect(engine.getValues()).toEqual(['5', '6', '7', '']);
    expect(onChange).toHaveBeenCalledWith('567');
    expect(engine.getActiveIndex()).toBe(2);
  });

  it('should handle backspace on empty input and clear previous', () => {
    const engine = new OtpEngine({ length: 4 });
    engine.handleInput(0, '1');
    engine.handleInput(1, '2');
    // activeIndex is 2, values: ['1', '2', '', '']
    engine.handleKeyDown(2, 'Backspace');
    expect(engine.getValues()).toEqual(['1', '', '', '']);
    expect(engine.getActiveIndex()).toBe(1);
  });

  it('should handle backspace on filled input and stay in place', () => {
    const engine = new OtpEngine({ length: 4 });
    engine.handleInput(0, '1');
    engine.handleInput(1, '2');
    // activeIndex is 2
    engine.handleKeyDown(1, 'Backspace');
    expect(engine.getValues()).toEqual(['1', '', '', '']);
    expect(engine.getActiveIndex()).toBe(1);
  });

  it('should call onComplete when all digits are filled', () => {
    const onComplete = vi.fn();
    const engine = new OtpEngine({ length: 3, onComplete });
    engine.handleInput(0, '1');
    engine.handleInput(1, '2');
    engine.handleInput(2, '3');
    expect(onComplete).toHaveBeenCalledWith('123');
  });

  it('should ignore non-numeric input', () => {
    const engine = new OtpEngine({ length: 4 });
    engine.handleInput(0, 'a');
    expect(engine.getValues()).toEqual(['', '', '', '']);
  });

  it('should handle arrow navigation', () => {
    const engine = new OtpEngine({ length: 4 });
    engine.handleKeyDown(0, 'ArrowRight');
    expect(engine.getActiveIndex()).toBe(1);
    engine.handleKeyDown(1, 'ArrowLeft');
    expect(engine.getActiveIndex()).toBe(0);
  });
});
