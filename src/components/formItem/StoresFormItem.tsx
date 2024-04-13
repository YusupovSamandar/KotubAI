import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetStoreMutation } from 'src/app/services/commerce';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  className?: string;
  name?: string;
  message?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (val: number) => void;
}

export default function StoreFormItem({
  required = false,
  className,
  name = 'store',
  message = 'Omborni tanlang!',
  label = `Ombor`,
  placeholder = 'Omborni tanlang!',
  disabled = false,
  onChange,
}: Props) {
  const [get] = useGetStoreMutation();
  const [options, setOptions] = useState<IOption[]>([]);

  const getFunc = () => {
    get('')
      .unwrap()
      .then((res) => {
        let arr: IOption[] = [];
        res.results.forEach((item) => {
          arr.push({ label: item.name, value: item.id });
        });
        setOptions(arr.reverse());
      });
  };

  useEffect(() => {
    getFunc();
  }, []);

  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required: true, message }] : []}
      className={className || 'full'}
    >
      <Select
        placeholder={placeholder}
        allowClear
        options={options}
        onChange={onChange}
        disabled={disabled}
        variant="filled"
      />
    </Form.Item>
  );
}
