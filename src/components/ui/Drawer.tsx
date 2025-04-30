import { tv, VariantProps } from 'tailwind-variants';
import * as React from 'react';
import { FC, useEffect } from 'react';
import { cn } from '../../utils/style.ts';

const variants = tv({
  slots: {
    base: 'fixed z-1000 bg-gray-800/70 backdrop-blur-md inset-0 transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
    inner: 'w-11/12 max-w-lg z-20 relative h-screen bg-background p-6 shadow-xl'
  },
  variants: {
    position: {
      right: {
        base: 'items-end',
        inner: 'ml-auto'
      },
      left: {
        base: 'items-start',
        inner: 'mr-auto'
      }
    }
  },
  defaultVariants: {
    position: 'right'
  }
});

interface DrawerProps extends VariantProps<typeof variants> {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  innerClassName?: string;

  children?: React.ReactNode;
}

const Drawer: FC<DrawerProps> = (props: DrawerProps) => {
  const { open, onClose, children, position, className, innerClassName } = props;

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  const cls = variants();
  return (
    <div
      className={cn(
        cls.base({ position }),
        {
          hidden: !open
        },
        className
      )}>
      <div className="absolute inset-0 z-0" onClick={onClose}></div>
      <div className={cn(cls.inner({ position }), innerClassName)}>{children}</div>
    </div>
  );
};

export default Drawer;
