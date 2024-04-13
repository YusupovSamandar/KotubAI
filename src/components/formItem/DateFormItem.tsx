import { DatePicker, DatePickerProps, Form } from 'antd';
import { dateFormat, monthFormat, yearFormat } from 'src/constants/form';

interface Props {
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
  message?: string;
  startHiding?: boolean;
  format?: 'date' | 'month' | 'year';
  onChange?: (val: DatePickerProps['value']) => void;
}

// function disabledDate(current: any) {
//   // Disabling dates before today and after one year from today
//   return (
//     current &&
//     (current < dayjs().startOf('day') || current > dayjs().add(1, 'year'))
//   );
// }

function DateFormItem({
  className = 'full',
  disabled,
  required = true,
  name = 'date',
  label = 'Sana',
  placeholder = 'Sanani tanlang',
  message = 'Sanani tanlang!',
  startHiding = false,
  format = 'date',
  onChange,
}: Props) {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required: true, message }] : []}
      className={className}
    >
      <DatePicker
        allowClear
        style={{ width: '100%' }}
        disabled={disabled}
        placeholder={placeholder}
        variant="borderless"
        picker={format}
        onChange={onChange}
        // disabledDate={(val) => (startHiding ? disabledDate(val) : false)}
      />
    </Form.Item>
  );
}

export default DateFormItem;
