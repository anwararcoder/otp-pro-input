import {
  defineComponent,
  h,
  ref,
  onMounted,
  watch,
  nextTick,
  computed,
  type ComponentPublicInstance,
} from 'vue';
import { OtpEngine } from '../core/otp-engine';

export const OTPInput = defineComponent({
  name: 'OTPInput',
  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
    length: {
      type: Number,
      required: true,
    },
    shouldAutoFocus: {
      type: Boolean,
      default: true,
    },
    className: {
      type: String,
      default: 'otp-pro-container',
    },
    inputClassName: {
      type: String,
      default: 'otp-pro-input',
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'tel',
    },
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
    change: (value: string) => typeof value === 'string',
    complete: (value: string) => typeof value === 'string',
  },
  setup(props, { emit }) {
    const internalValues = ref<string[]>(new Array(props.length).fill(''));
    const activeIndex = ref(0);
    const inputRefs = ref<(HTMLInputElement | null)[]>([]);

    const engine = new OtpEngine({
      length: props.length,
      value: props.modelValue,
      onChange: (val: string) => {
        internalValues.value = engine.getValues();
        emit('update:modelValue', val);
        emit('change', val);
      },
      onComplete: (val: string) => {
        emit('complete', val);
      },
    });

    // Synchronize prop value changes
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== undefined) {
          const currentVal = engine.getValues().join('');
          if (newVal !== currentVal) {
            engine.handlePaste(newVal, 0);
            internalValues.value = engine.getValues();
          }
        }
      },
    );

    // Handle focus movement
    watch(activeIndex, (newIdx) => {
      if (newIdx >= 0 && newIdx < props.length) {
        nextTick(() => {
          inputRefs.value[newIdx]?.focus();
        });
      }
    });

    onMounted(() => {
      if (props.shouldAutoFocus && !props.disabled) {
        inputRefs.value[0]?.focus();
      }
    });

    const handleInput = (index: number, e: Event) => {
      const target = e.target as HTMLInputElement;
      engine.handleInput(index, target.value);
      activeIndex.value = engine.getActiveIndex();
    };

    const handleKeyDown = (index: number, e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
      }
      engine.handleKeyDown(index, e.key);
      activeIndex.value = engine.getActiveIndex();
    };

    const handlePaste = (index: number, e: ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData?.getData('text/plain') || '';
      engine.handlePaste(pastedData, index);
      activeIndex.value = engine.getActiveIndex();
    };

    const handleFocus = (index: number) => {
      activeIndex.value = index;
      engine.setActiveIndex(index);
    };

    const values = computed(() => {
      if (props.modelValue !== undefined) {
        return props.modelValue
          .split('')
          .concat(new Array(props.length).fill(''))
          .slice(0, props.length);
      }
      return internalValues.value;
    });

    return () =>
      h(
        'div',
        {
          class: props.className,
          style: { display: 'flex', gap: '8px' },
        },
        values.value.map((val, i) =>
          h('input', {
            key: i,
            ref: (el: Element | ComponentPublicInstance | null) => {
              inputRefs.value[i] = el as HTMLInputElement | null;
            },
            value: val,
            onInput: (e: Event) => handleInput(i, e),
            onKeydown: (e: KeyboardEvent) => handleKeyDown(i, e),
            onPaste: (e: ClipboardEvent) => handlePaste(i, e),
            onFocus: () => handleFocus(i),
            disabled: props.disabled,
            type: props.type,
            maxLength: props.length,
            autocomplete: i === 0 ? 'one-time-code' : 'off',
            class: [props.inputClassName, { active: activeIndex.value === i, error: props.error }],
            style: {
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '1.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              ...(activeIndex.value === i ? { borderColor: '#007bff', outline: 'none' } : {}),
              ...(props.error ? { borderColor: 'red' } : {}),
            },
          }),
        ),
      );
  },
});
