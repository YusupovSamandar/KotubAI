import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { dateFormat, monthFormat, yearFormat } from 'src/constants/form';
import './filter.scss';

interface Props {
  format?: 'date' | 'month' | 'year';
  size?: SizeType;
}

function FilterDate({ format = 'date', size = 'large' }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    handleMakeParams('date', dateString);
  };

  const handleMakeParams = (key: string, value: string) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const defDate = searchParams.get('date');
  const defFormat =
    format === 'date'
      ? dateFormat
      : format === 'month'
      ? monthFormat
      : yearFormat;

  return (
    <div className="filter-date">
      <DatePicker
        format={defFormat}
        picker={
          format === 'date' ? 'date' : format === 'month' ? 'month' : 'year'
        }
        onChange={onChange}
        size={size}
        // bordered={false}
        value={defDate ? dayjs(defDate, defFormat) : undefined}
        placeholder="Sanani tanlang"
      />
    </div>
  );
}

export default FilterDate;
