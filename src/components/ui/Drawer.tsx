import { tv, VariantProps } from 'tailwind-variants';
import * as React from 'react';
import { FC, useEffect } from 'react';
import { cn } from '../../utils/style.ts';
import { useSpring, animated, config } from '@react-spring/web';

const variants = tv({
  slots: {
    base: 'fixed z-1000 bg-gray-800/70 backdrop-blur-md inset-0',
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
  const { open, onClose, children, position = 'right', className, innerClassName } = props;

  const { anim } = useSpring({
    config: config.stiff,
    from: {
      anim: 0
    },
    to: {
      anim: open ? 1 : 0
    }
  });

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  const cls = variants();
  return (
    <animated.div
      style={{ opacity: anim, display: anim.to((t) => (t == 0 ? 'none' : 'block')) }}
      className={cn(cls.base({ position }), className)}>
      <div className="absolute inset-0 z-0" onClick={onClose}></div>
      <animated.div
        style={{ translateX: anim.to((t) => `${(1 - t) * 100}%`) }}
        className={cn(cls.inner({ position }), innerClassName)}>
        {children}
      </animated.div>
    </animated.div>
  );
};

export default Drawer;
