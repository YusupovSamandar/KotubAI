import React from 'react';
import { Select, Space } from 'antd';

const CustomSelect: React.FC<{
  optionsValue: string;
  setActionType: (value: string) => void;
}> = ({ optionsValue, setActionType }) => (
  // <Space wrap>
  <Select
    defaultValue="s-t-t"
    value={optionsValue}
    style={{ width: 217 }}
    onChange={(value) => {
      setActionType(value);
    }}
    options={[
      { value: 's-t-t', label: 'Speech to text' },
      { value: 't-t-s', label: 'Text to speech' },
      { value: 'smr', label: 'Website summary' },
    ]}
  />
  // </Space>
);

export default CustomSelect;
