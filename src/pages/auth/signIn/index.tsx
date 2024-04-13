import { Button, Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { phonePattern } from 'src/constants/form';
import AuthLayout from '..';
import useSignIn from './useSignIn';
import { PhoneOutlinedSvg } from 'src/assets/svg';

function SignInPage() {
  const { onSubmit, isLoading } = useSignIn();

  return (
    <AuthLayout>
      <div className="auth-signin">
        <Form layout="vertical" onFinish={onSubmit}>
          <div className="auth-form-title">
            <h3>Tizimga kirish</h3>
            <p>Iltimos, telefon raqamingizni kiriting</p>
          </div>
          <div className="auth-form-input-wrap">
            <PhoneOutlinedSvg />
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Telefon raqamni kiriting!' },
                {
                  pattern: phonePattern,
                  message: `Telefon raqamni to'liq kiriting!`,
                },
              ]}
            >
              <MaskedInput
                addonBefore="+998"
                className="auth-form-input"
                mask="(00)-000-00-00"
              />
            </Form.Item>
          </div>

          <Button
            className="auth-form-btn"
            style={{ width: 360 }}
            htmlType="submit"
            loading={isLoading}
          >
            Send sms code
          </Button>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default SignInPage;
