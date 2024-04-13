import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetRegionsMutation } from 'src/app/services/classifiers';
import { IOption } from 'src/constants/type';

interface Props {
  required?: boolean;
  className?: string;
  onChange?: (val: string) => void;
}

export default function RegionFormItem({
  required = false,
  className,
  onChange,
}: Props) {
  const [get] = useGetRegionsMutation();
  const [options, setOptions] = useState<IOption[]>([]);

  const getFunc = () => {
    get()
      .unwrap()
      .then((res) => {
        let arr: IOption[] = [];
        res.forEach((item) => {
          arr.push({ label: item.name_uz, value: item.id });
        });
        setOptions(arr.reverse());
      });
  };

  useEffect(() => {
    getFunc();
  }, []);

  return (
    <Form.Item
      name="region"
      label={`Manzil`}
      rules={required ? [{ required: true, message: 'Manzilni tanlang!' }] : []}
      className={className || 'full'}
    >
      <Select
        placeholder="Manzilni tanlang!"
        allowClear
        options={options}
        onChange={onChange}
        variant="filled"
      />
    </Form.Item>
  );
}
