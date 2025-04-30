import * as React from 'react';
import { cn } from '../../utils/style.ts';
import { tv, VariantProps } from 'tailwind-variants';
import { ChangeEventHandler, useCallback } from 'react';

const variants = tv({
  base: 'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  variants: {
    size: {
      default: 'h-9 px-3 py-1',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size' | 'onChange'>,
    VariantProps<typeof variants> {
  onChange?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { className, type, size, onChange, ...rest } = props;

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (onChange) onChange(event.target.value);
    },
    [onChange]
  );
  return (
    <input
      type={type}
      className={cn(variants({ size }), className)}
      ref={ref}
      onChange={handleChange}
      {...rest}
    />
  );
});

export default Input;
