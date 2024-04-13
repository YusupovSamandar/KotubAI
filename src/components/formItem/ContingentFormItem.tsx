import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetContingentMutation } from 'src/app/services/management';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  label?: string;
  name?: string;
  className?: string;
  type?: 'supplier' | 'customer';
  onChange?: (val: string) => void;
}

export default function ContingentFormItem({
  required = false,
  label = 'Kontragent',
  name = 'counterparty',
  className,
  type,
  onChange,
}: Props) {
  const [get] = useGetContingentMutation();
  const [options, setOptions] = useState<IOption[]>([]);

  const getFunc = () => {
    let params = type ? `?type=${type}` : ``;
    get(params)
      .unwrap()
      .then((res) => {
        let arr: IOption[] = [];
        res.results.forEach((item) => {
          arr.push({ label: item.first_name, value: item.id });
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
      rules={
        required ? [{ required: true, message: 'Kontragentni tanlang!' }] : []
      }
      className={className || 'full'}
    >
      <Select
        placeholder="Kontragentni tanlang!"
        allowClear
        options={options}
        onChange={onChange}
        variant="filled"
      />
    </Form.Item>
  );
}
