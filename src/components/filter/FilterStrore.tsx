import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetStoreMutation } from 'src/app/services/commerce';
import { IOption } from 'src/constants/type';

interface Props {
  disabled?: boolean;
}

export default function FilterStore({ disabled }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defStore = searchParams.get('store');
  const currentPage = searchParams.get('page');

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

  const handleMakeParams = (key: string, value: string) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    if (currentPage && currentPage !== '1') searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <Select
      style={{ width: 200 }}
      allowClear
      placeholder="Ombor"
      options={options}
      onChange={(val) => handleMakeParams('store', String(val))}
      disabled={disabled}
      defaultValue={defStore ? +defStore : undefined}
    />
  );
}
