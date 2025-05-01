import type { ForwardedRef, LegacyRef, MutableRefObject, RefCallback } from 'react';

/**
 * Can be used to assign multiple refs to the same element
 * @param refs
 */
export function mergeRefs<T = never>(
  ...refs: Array<MutableRefObject<T> | LegacyRef<T> | ForwardedRef<T> | undefined | null>
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
