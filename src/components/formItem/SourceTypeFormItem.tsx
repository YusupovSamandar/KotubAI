import { Form, Segmented } from 'antd';
import './form_item.scss';

interface Props {
  label?: string;
  required?: boolean;
  className?: string;
  onChange?: (val: string) => void;
}

export default function SourceTypeFormItem({
  label = 'Manba turi',
  required = false,
  className,
  onChange,
}: Props) {
  return (
    <Form.Item
      name="is_expense"
      label={label}
      rules={
        required ? [{ required: true, message: 'Manba turini kiriting' }] : []
      }
      className={`${className || 'full'} form-item-source-type`}
    >
      <Segmented
        onChange={(val) => typeof val === 'string' && onChange?.(val)}
        options={[
          { label: 'Kirim', value: 'false' },
          { label: 'Chiqim', value: 'true' },
        ]}
      />
    </Form.Item>
  );
}
