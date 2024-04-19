import React from 'react';
import { Select, Space } from 'antd';
import { useTypedSelector } from 'src/app/store';
import { en, ru, uz } from './data';

const CustomSelect: React.FC<{
  optionsValue: string;
  setActionType: (value: string) => void;
}> = ({ optionsValue, setActionType }) => {
  const lang = useTypedSelector((state) => state.language);

  const optionsDt = lang === 'uz' ? uz : lang === 'ru' ? ru : en;
  return (
    // <Space wrap>
    <Select
      defaultValue="s-t-t"
      value={optionsValue}
      style={{ width: 217 }}
      onChange={(value) => {
        setActionType(value);
      }}
      options={optionsDt}
    />
    // </Space>
  );
};

export default CustomSelect;
