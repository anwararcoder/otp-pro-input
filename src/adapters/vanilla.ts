import { OtpEngine, OtpEngineOptions } from '../core/otp-engine';

export interface VanillaOtpOptions extends OtpEngineOptions {
  container: HTMLElement | string;
  inputClassName?: string;
  className?: string;
  type?: 'text' | 'password' | 'tel';
}

export interface VanillaOtpInstance {
  destroy: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  focus: () => void;
}

export function createOtpInput(options: VanillaOtpOptions): VanillaOtpInstance {
  const {
    container,
    length,
    inputClassName = 'otp-pro-input',
    className = 'otp-pro-container',
    type = 'tel',
    shouldAutoFocus = true,
  } = options;

  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) {
    throw new Error(`Container element not found: ${container}`);
  }

  const engine = new OtpEngine({
    length,
    onChange: options.onChange,
    onComplete: options.onComplete,
    value: options.value,
  });

  const wrapper = document.createElement('div');
  wrapper.className = className;
  wrapper.style.display = 'flex';
  wrapper.style.gap = '8px';

  const inputs: HTMLInputElement[] = [];

  const updateFocus = () => {
    const activeIndex = engine.getActiveIndex();
    inputs[activeIndex]?.focus();
  };

  const render = () => {
    const values = engine.getValues();
    inputs.forEach((input, i) => {
      input.value = values[i] || '';
    });
  };

  for (let i = 0; i < length; i++) {
    const input = document.createElement('input');
    input.type = type;
    input.className = inputClassName;
    input.maxLength = length; // To capture autofill/multi-char
    input.autocomplete = i === 0 ? 'one-time-code' : 'off';

    // Default styles
    Object.assign(input.style, {
      width: '40px',
      height: '40px',
      textAlign: 'center',
      fontSize: '1.2rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
    });

    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      engine.handleInput(i, target.value);
      render();
      updateFocus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
      }
      engine.handleKeyDown(i, e.key);
      render();
      updateFocus();
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData?.getData('text/plain') || '';
      engine.handlePaste(pastedData, i);
      render();
      updateFocus();
    });

    input.addEventListener('focus', () => {
      engine.setActiveIndex(i);
    });

    inputs.push(input);
    wrapper.appendChild(input);
  }

  root.appendChild(wrapper);
  render();

  if (shouldAutoFocus) {
    updateFocus();
  }

  return {
    destroy: () => {
      wrapper.remove();
    },
    getValue: () => engine.getValues().join(''),
    setValue: (val: string) => {
      engine.handlePaste(val, 0);
      render();
    },
    focus: () => updateFocus(),
  };
}
