import { tv, VariantProps } from 'tailwind-variants';
import * as React from 'react';
import { cn } from '../../utils/style.ts';

const variants = tv({
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline:
        'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-11 rounded-md px-8 text-base',
      icon: 'h-9 w-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
  /**
   * The component tag used
   * default: button
   */
  as?: keyof React.JSX.IntrinsicElements | React.ElementType;

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string;

  /**
   * For router route
   */
  to?: string;

  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props: ButtonProps, ref) {
    const {
      variant,
      size,
      type = 'button',
      as,
      href,
      to,
      disabled,
      className,
      children,
      ...rest
    } = props;

    // eslint-disable-next-line
    const Comp: any = href ? 'a' : (as ?? 'button');

    return (
      <Comp
        type={Comp === 'button' ? type : undefined}
        ref={ref}
        href={href}
        to={to}
        disabled={disabled}
        className={cn(
          variants({
            variant,
            size
          }),
          className
        )}
        {...rest}>
        {children}
      </Comp>
    );
  }
);

export default Button;
