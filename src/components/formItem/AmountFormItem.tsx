import { Form, InputNumber } from 'antd';
import { amountFormatter, amountParser } from 'src/constants/form';

interface Props {
  className?: string;
  required?: boolean;
  name?: string;
  message?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  step?: number;
  onChange?: (val: number) => void;
  onPressEnter?: () => void;
}

export default function AmountFormItem({
  className,
  required = false,
  name = 'amount',
  message = 'Miqdorni kiriting!',
  label = `Miqdor`,
  placeholder = 'Miqdorni kiriting!',
  disabled = false,
  max,
  min = 0,
  step = 1,
  onChange,
  onPressEnter,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.();
    }
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required: true, message }] : []}
      className={className || 'full'}
    >
      <InputNumber
        placeholder={placeholder}
        variant={'filled'}
        formatter={amountFormatter}
        parser={amountParser}
        style={{ width: '100%' }}
        disabled={disabled}
        max={max}
        min={min}
        step={step}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </Form.Item>
  );
}
