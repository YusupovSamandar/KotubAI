import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetAccountMutation } from 'src/app/services/management';
import { IAccountRes } from 'src/app/services/management/type';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  className?: string;
  onChange?: (val: number) => void;
  setCategories?: React.Dispatch<
    React.SetStateAction<IAccountRes[] | undefined>
  >;
  name?: string;
}

export default function AccountFormItem({
  required = false,
  className,
  onChange,
  setCategories,
  name = 'account',
}: Props) {
  const [get] = useGetAccountMutation();
  const [options, setOptions] = useState<IOption[]>([]);

  const getFunc = () => {
    get()
      .unwrap()
      .then((res) => {
        setCategories?.(res.results);
        let arr: IOption[] = [];
        res.results.forEach((item: any) => {
          arr.push({ label: item.title, value: item.id });
        });
        setOptions(arr);
      });
  };

  useEffect(() => {
    getFunc();
  }, []);

  return (
    <Form.Item
      name={name}
      label={`Hisob raqam`}
      rules={
        required ? [{ required: true, message: 'Hisob raqamni tanlang!' }] : []
      }
      className={className || 'full'}
    >
      <Select
        placeholder="Hisob raqamni tanlang!"
        allowClear
        options={options}
        onChange={onChange}
        variant="filled"
      />
    </Form.Item>
  );
}
