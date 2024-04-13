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
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
    ]}
  />
  // </Space>
);

export default CustomSelect;
