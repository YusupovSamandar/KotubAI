import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'src/app/services/auth';
import { ILogin } from 'src/app/services/auth/type';
import { clearMask } from 'src/utils';

export default function useSignIn() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit = (val: ILogin) => {
    let phone = '998' + clearMask(val.phone);
    login({ phone })
      .unwrap()
      .then((res) => {
        if (res.status) {
          navigate('/auth/confirm?phone=' + phone);
        } else {
          message.error('Bunday foydalanuvchi mavjud emas');
        }
      })
      .catch(() => {
        message.error('Bunday foydalanuvchi mavjud emas');
      });
  };

  return {
    onSubmit,
    isLoading,
  };
}
