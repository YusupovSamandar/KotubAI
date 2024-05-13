import { useState, SetStateAction, Dispatch, useEffect } from 'react';
import Greeting from './components/greeting';
import Select from './components/select';
import { useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import { paymentLangData } from './components/data';
import { useTypedSelector } from 'src/app/store';

export default function Main() {
  const currLang = useTypedSelector((state) => state.language);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get('paymentStatus') === '200') {
      const amount = searchParams.get('amount');
      message.open({
        type: 'success',
        content: `${amount} ${paymentLangData[currLang].success}`,
        duration: 5,
      });
    } else if (searchParams.get('paymentStatus') === '400') {
      message.error(paymentLangData[currLang].failed);
    }
  }, []);
  const [actionType, setActionType] = useState<'s-t-t' | 'smr' | 't-t-s'>(
    's-t-t'
  );
  return (
    <div className="main-page">
      {/* <Select
        optionsValue={actionType}
        setActionType={setActionType as Dispatch<SetStateAction<string>>}
      /> */}
      <Greeting actionType={actionType} />
    </div>
  );
}
