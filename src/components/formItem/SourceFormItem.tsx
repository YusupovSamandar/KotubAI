import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetSourceMutation } from 'src/app/services/finance';
import { ISourceRes } from 'src/app/services/finance/type';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  name?: string;
  className?: string;
  is_expense?: string;
  onChange?: (val: string) => void;
  setSources?: React.Dispatch<React.SetStateAction<ISourceRes[] | undefined>>;
  category?: number;
}

export default function SourceFormItem({
  required = false,
  name = 'source',
  className,
  onChange,
  setSources,
  is_expense,
  category,
}: Props) {
  const [get] = useGetSourceMutation();
  const [options, setOptions] = useState<IOption[]>([]);
  const [data, setData] = useState<ISourceRes[]>([]);

  const getFunc = () => {
    get()
      .unwrap()
      .then((res) => {
        let arr: IOption[] = [];
        setData(res.results);
        setSources(res.results);
        res.results.forEach((item: any) => {
          arr.push({ label: item.title, value: item.id });
        });
        setOptions(arr);
      });
  };

  useEffect(() => {
    getFunc();
  }, []);

  //Sort by is_expense
  useEffect(() => {
    if (data.length > 0) {
      let arr: IOption[] = [];
      data.forEach((item) => {
        if (item.is_expense === (is_expense === 'true')) {
          let obj = { label: item.number + '-' + item.title, value: item.id };
          if (category) {
            if (item.category.id === category) arr.push(obj);
          } else {
            arr.push(obj);
          }
        }
      });

      setOptions(arr);
    }
  }, [data, is_expense, category]);

  return (
    <Form.Item
      name={name}
      label={`Manbalar`}
      rules={required ? [{ required: true, message: 'Manbani tanlang!' }] : []}
      className={className || 'full'}
    >
      <Select
        placeholder="Manbani tanlang!"
        allowClear
        options={options}
        onChange={onChange}
        variant="filled"
        showSearch
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
