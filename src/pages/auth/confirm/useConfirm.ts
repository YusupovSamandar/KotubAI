import { message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useConfirmMutation } from 'src/app/services/auth';
import { IConfirm } from 'src/app/services/auth/type';
import { clearMask } from 'src/utils';

export default function useConfirm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const phone = searchParams.get('phone') || '';

  //Fetch
  const [confirm] = useConfirmMutation();
  const onSubmit = (val: IConfirm) => {
    let obj = {
      phone,
      code: +clearMask(String(val.code)),
    };

    confirm(obj)
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.data.expired) {
          message.error(
            'Sms kod muddati tugagan. Iltimos sms kodni qayta yuboring'
          );
        }
        if (err.data.incorrect) message.error('Sms kod xato kiritilgan');
      });
  };

  useEffect(() => {
    if (phone.length !== 12) navigate('/auth/signin');
  }, [phone]);

  return {
    phone,
    onSubmit,
  };
}
