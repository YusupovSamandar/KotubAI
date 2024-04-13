import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetEmployeeMutation } from 'src/app/services/management';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  className?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  mode?: 'multiple' | 'tags';
  onChange?: (val: string) => void;
}

export default function EmployeeFormItem({
  required = false,
  className,
  name = 'employee',
  label = 'Xodim',
  placeholder = 'Xodimni tanlang!',
  mode,
  onChange,
}: Props) {
  const [get] = useGetEmployeeMutation();
  const [options, setOptions] = useState<IOption[]>([]);

  const getFunc = () => {
    get()
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
      rules={required ? [{ required: true, message: placeholder }] : []}
      className={className || 'full'}
    >
      <Select
        placeholder={placeholder}
        allowClear
        options={options}
        onChange={onChange}
        variant="filled"
        showSearch
        mode={mode}
        optionFilterProp="label"
        filterOption={(input, option: any) =>
          option?.label?.toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          optionA.label
            ?.toLowerCase()
            .localeCompare(optionB.label.toLowerCase())
        }
      />
    </Form.Item>
  );
}
