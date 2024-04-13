import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetProductsMutation } from 'src/app/services/commerce';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  className?: string;
  name?: string;
  onChange?: (val: number) => void;
  setUnit?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setProductMax?: React.Dispatch<React.SetStateAction<number | undefined>>;
  params?: string;
  store?: number;
}

export default function ProductFormItem({
  required = false,
  className,
  name = 'product',
  onChange,
  setUnit,
  setProductMax,
  params,
  store,
}: Props) {
  const [get, { data }] = useGetProductsMutation();
  const [options, setOptions] = useState<IOption[]>([]);
  const [options2, setOptions2] = useState<IOption[]>();

  const getFunc = () => {
    get(params || '')
      .unwrap()
      .then((res) => {
        let arr: IOption[] = [];
        res.results.forEach((item) => {
          arr.push({ label: item.name, value: item.id });
        });
        setOptions(arr);
      });
  };

  useEffect(() => {
    getFunc();
  }, []);

  //Change
  const handleChange = (val: number) => {
    onChange?.(val);
    let current = data?.results.find((item) => item.id === val);
    if (current) {
      setUnit?.(current.unit);
      setProductMax?.(current.quantity);
    }
  };

  useEffect(() => {
    if (store && data?.results) {
      let arr: IOption[] = [];
      let include_store = data?.results.filter(
        (item) => item.store.id === store
      );
      include_store?.forEach((item) => {
        arr.push({ label: item.name, value: item.id });
      });
      setOptions2([...arr]);
    }
  }, [store, data]);

  return (
    <Form.Item
      name={name}
      label={`Maxsulot`}
      rules={
        required ? [{ required: true, message: 'Maxsulotni tanlang!' }] : []
      }
      className={className || 'full'}
    >
      <Select
        placeholder="Maxsulotni tanlang!"
        allowClear
        options={options2 || options}
        onChange={handleChange}
        variant="filled"
      />
    </Form.Item>
  );
}
