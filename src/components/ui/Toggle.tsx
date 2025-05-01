import React, {
  forwardRef,
  type InputHTMLAttributes,
  type ChangeEventHandler,
  type ReactNode,
  useRef
} from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { mergeRefs } from '../../utils/object';
import { cn } from '../../utils/style.ts';

const variants = tv({
  slots: {
    base: 'group relative inline-flex cursor-pointer flex-nowrap items-start gap-2.5 outline-none',
    box: `inline-flex aspect-[3.5/2] rounded-full
    bg-muted shadow-xs
    peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20
    peer-checked:bg-primary
    transition-colors duration-150
    `,
    handle: `rounded-full aspect-square h-full
    bg-card shadow-control
    transition-transform duration-200 ease-out
    `,
    label: 'flex-auto',
    error: 'text-danger-dark mt-1 block text-xs',
    success: 'text-success-dark mt-1 block text-xs'
  },
  variants: {
    size: {
      sm: {
        base: 'text-xs',
        box: 'h-4 p-0.5 peer-checked:*:translate-x-[99%]'
      },
      md: {
        base: 'text-sm',
        box: 'h-5 p-0.5 peer-checked:*:translate-x-[95%]'
      },
      lg: {
        base: 'text-base',
        box: 'h-6 p-0.5 peer-checked:*:translate-x-[92%]'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export interface ToggleProps
  extends VariantProps<typeof variants>,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'checked'
      | 'defaultChecked'
      | 'aria-checked'
      | 'name'
      | 'value'
      | 'disabled'
      | 'onInput'
      | 'onBlur'
      | 'onFocus'
      | 'onKeyUp'
      | 'onKeyDown'
      | 'className'
    > {
  label?: string | ReactNode;

  onChange?: (checked: boolean) => void;

  error?: string;
  success?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(props, ref) {
  const {
    size = 'md',

    name,
    label,
    checked,

    error,
    success,
    className,
    onChange,
    defaultChecked,
    disabled,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!onChange) return;
    onChange(e.target.checked);
  };

  const handleLabelClick = React.useCallback<React.MouseEventHandler<HTMLSpanElement>>((e) => {
    const el = e.target as Element;
    if (el.tagName.toUpperCase() === 'A') {
      e.stopPropagation();
      return false;
    }
  }, []);

  const cls = variants();
  return (
    <label
      role="checkbox"
      aria-checked={checked}
      className={cn(
        cls.base({ size }),
        {
          'cursor-not-allowed opacity-50': disabled
        },
        className
      )}
      onClick={handleLabelClick}>
      <input
        type="checkbox"
        ref={mergeRefs(inputRef, ref)}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        className="peer absolute opacity-0"
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <span className={cn(cls.box({ size }), {})}>
        <span className={cls.handle()}></span>
      </span>
      {label && (
        <span className={cls.label({ size })}>
          <span className="block">{label}</span>
          {error && <span className={cls.error()}>{error}</span>}
          {success && <span className={cls.success()}>{success}</span>}
        </span>
      )}
    </label>
  );
});

export default Toggle;
