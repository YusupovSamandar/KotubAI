import { Form, Select } from 'antd';

interface Props {
  label?: string;
  required?: boolean;
  className?: string;
  onChange?: (val: string) => void;
}

export default function CurrenciesFormItem({
  label = 'Valyuta turi',
  required = false,
  className,
  onChange,
}: Props) {
  return (
    <Form.Item
      name="currency"
      label={label}
      rules={
        required ? [{ required: true, message: 'Valyuta turini tanlang' }] : []
      }
      className={`${className || 'full'}`}
    >
      <Select
        onChange={onChange}
        options={[
          { label: 'So`m', value: 'uzs' },
          { label: 'Do`llar', value: 'usd' },
        ]}
        placeholder="Valyuta turini tanlang"
        variant="filled"
        allowClear
      />
    </Form.Item>
  );
}
