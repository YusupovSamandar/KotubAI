import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetCategoriesMutation } from 'src/app/services/classifiers';
import { ICategoryRes } from 'src/app/services/classifiers/type';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  className?: string;
  onChange?: (val: number) => void;
  setCategories?: React.Dispatch<
    React.SetStateAction<ICategoryRes[] | undefined>
  >;
  name?: string;
}

export default function CategoryFormItem({
  required = false,
  className,
  onChange,
  setCategories,
  name = 'category',
}: Props) {
  const [get] = useGetCategoriesMutation();
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
      label={`Manba kategoriyasi`}
      rules={
        required ? [{ required: true, message: 'Kategoriyani tanlang!' }] : []
      }
      className={className || 'full'}
    >
      <Select
        placeholder="Kategoriyani tanlang!"
        allowClear
        options={options}
        onChange={onChange}
        variant="filled"
      />
    </Form.Item>
  );
}
