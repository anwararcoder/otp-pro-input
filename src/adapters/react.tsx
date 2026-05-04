import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OtpEngine, OtpEngineOptions } from '../core/otp-engine';

export interface ReactOtpInputProps extends Omit<OtpEngineOptions, 'onChange' | 'onComplete'> {
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  error?: boolean;
  disabled?: boolean;
  type?: 'text' | 'password' | 'tel';
  renderInput?: (props: React.ComponentPropsWithRef<'input'>, index: number) => React.ReactNode;
}

export const OTPInput: React.FC<ReactOtpInputProps> = ({
  length,
  value: controlledValue,
  onChange,
  onComplete,
  shouldAutoFocus = true,
  className = 'otp-pro-container',
  inputClassName = 'otp-pro-input',
  error = false,
  disabled = false,
  type = 'tel',
  renderInput,
}) => {
  const [internalValues, setInternalValues] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const engineRef = useRef<OtpEngine | null>(null);

  // Initialize engine
  useEffect(() => {
    engineRef.current = new OtpEngine({
      length,
      value: controlledValue,
      onChange: (val) => {
        setInternalValues(engineRef.current?.getValues() || []);
        onChange?.(val);
      },
      onComplete,
    });
    setInternalValues(engineRef.current.getValues());
  }, [length, onComplete]); // Only re-init on length or callback changes

  // Synchronize controlled value
  useEffect(() => {
    if (controlledValue !== undefined && engineRef.current) {
      const currentVal = engineRef.current.getValues().join('');
      if (controlledValue !== currentVal) {
        engineRef.current.handlePaste(controlledValue, 0);
      }
    }
  }, [controlledValue]);

  // Handle focus movement
  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < length) {
      inputRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, length]);

  // Initial focus
  useEffect(() => {
    if (shouldAutoFocus && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [shouldAutoFocus, disabled]);

  const handleInputChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // We get the last character if it was a single char change,
    // or the whole string if it was an autofill/paste that React didn't intercept as paste
    engineRef.current?.handleInput(index, val);
    setActiveIndex(engineRef.current?.getActiveIndex() ?? 0);
  }, []);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
    }
    engineRef.current?.handleKeyDown(index, e.key);
    setActiveIndex(engineRef.current?.getActiveIndex() ?? 0);
  }, []);

  const handlePaste = useCallback((index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    engineRef.current?.handlePaste(pastedData, index);
    setActiveIndex(engineRef.current?.getActiveIndex() ?? 0);
  }, []);

  const handleFocus = (index: number) => {
    setActiveIndex(index);
    engineRef.current?.setActiveIndex(index);
  };

  const values =
    controlledValue !== undefined
      ? controlledValue.split('').concat(new Array(length).fill('')).slice(0, length)
      : internalValues;

  return (
    <div
      className={className}
      style={{ display: 'flex', gap: '8px', ...(error ? { borderColor: 'red' } : {}) }}
    >
      {values.map((val, i) => {
        const inputProps: React.ComponentPropsWithRef<'input'> = {
          value: val,
          onChange: (e) => handleInputChange(i, e),
          onKeyDown: (e) => handleKeyDown(i, e),
          onPaste: (e) => handlePaste(i, e),
          onFocus: () => handleFocus(i),
          disabled,
          type,
          maxLength: length, // Allow longer for autofill detection, though engine cleans it
          autoComplete: i === 0 ? 'one-time-code' : 'off',
          className: `${inputClassName} ${activeIndex === i ? 'active' : ''} ${error ? 'error' : ''}`,
          style: {
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '1.2rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            ...(activeIndex === i ? { borderColor: '#007bff', outline: 'none' } : {}),
            ...(error ? { borderColor: 'red' } : {}),
          },
          ref: (el: HTMLInputElement | null) => {
            inputRefs.current[i] = el;
          },
        };

        if (renderInput) {
          return <React.Fragment key={i}>{renderInput(inputProps, i)}</React.Fragment>;
        }

        return <input key={i} {...inputProps} />;
      })}
    </div>
  );
};
