import { FC, useCallback } from 'react';
import Button from './Button.tsx';
import { Minus, Plus } from 'lucide-react';
import Input from './Input.tsx';

type QuantityInputProps = {
  value: number;
  onChange?: (value: number) => void;
};

const QuantityInput: FC<QuantityInputProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = (v: string) => {
    if (onChange) onChange(Number(v));
  };

  const handleIncrement = useCallback(() => {
    if (!onChange) return;
    onChange(value + 1);
  }, [onChange, value]);

  const handleDecrement = useCallback(() => {
    if (!onChange || value <= 1) return;
    onChange(value - 1);
  }, [onChange, value]);
  return (
    <div className="relative inline-flex items-center gap-px">
      <Button
        size="icon"
        variant="secondary"
        className="absolute start-1 top-1/2 h-7 w-7 -translate-y-1/2 shadow-none"
        onClick={handleDecrement}
        disabled={value <= 1}>
        <Minus className="size-4" />
      </Button>
      <Input className="w-24 px-9 text-center" min={0} value={value} onChange={handleChange} />
      <Button
        size="icon"
        variant="secondary"
        className="absolute end-1 top-1/2 h-7 w-7 -translate-y-1/2 shadow-none"
        onClick={handleIncrement}>
        <Plus className="size-4" />
      </Button>
    </div>
  );
};

export default QuantityInput;
