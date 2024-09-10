import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import { useTypedSelector } from 'src/app/store';
import { useCheckPaymentStatusMutation } from 'src/app/services/finance';
import { IServices } from 'src/app/services/type';
import ServicesSelect from './components/servicesSelect';
import { paymentLangData } from './components/data';
import Greeting from './components/greeting';

export default function Main() {
  const currLang = useTypedSelector((state) => state.language);
  const [checkStatus] = useCheckPaymentStatusMutation();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get('transaction')) {
      checkStatus(searchParams.get('transaction'))
        .unwrap()
        .then((res) => {
          if (res.status === 'paid') {
            message.open({
              type: 'success',
              content: paymentLangData[currLang].success,
              duration: 5,
            });
          } else {
            message.open({
              type: 'error',
              content: paymentLangData[currLang].failed,
              duration: 5,
            });
          }
        });
    }
  }, []);
  const [actionType, setActionType] = useState<'s-t-t' | 'smr' | 't-t-s'>(
    's-t-t'
  );
  const [serviceType, setServiceType] = useState<IServices>(
    searchParams.get('service') as IServices
  );

  useEffect(() => {
    setServiceType(searchParams.get('service') as IServices);
  }, [searchParams.get('service')]);
  return (
    <div className="main-page">
      {/* <Select
        optionsValue={actionType}
        setActionType={setActionType as Dispatch<SetStateAction<string>>}
      /> */}
      {!serviceType ? <ServicesSelect /> : <Greeting actionType={actionType} />}
    </div>
  );
}
