import { Form } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import CustomButton from 'src/components/common/button';
import { smsPattern } from 'src/constants/form';
import AuthLayout from '..';
import useConfirm from './useConfirm';
import { PasswordSvg } from 'src/assets/svg';

function ConfirmPage() {
  const { phone, onSubmit } = useConfirm();

  return (
    <AuthLayout>
      <div className="auth-confirm">
        <Form layout="vertical" onFinish={onSubmit}>
          <div className="auth-form-title">
            <h3>Kodni kiriting</h3>
            <p>Biz kodni shu raqamga yubordik</p>
            <p>
              +998 {phone.slice(3, 5)} {phone.slice(5, 8)} ** **
            </p>
          </div>
          <div className="auth-form-input-wrap">
            <PasswordSvg />
            <Form.Item
              name="code"
              rules={[
                { required: true, message: 'Sms kodni kiriting!' },
                {
                  pattern: smsPattern,
                  message: `Sms kodni to'liq kiriting!`,
                },
              ]}
            >
              <MaskedInput mask="0-0-0-0" className="auth-form-input" />
            </Form.Item>
          </div>

          <CustomButton
            htmlType="submit"
            style={{ width: 360 }}
            className="auth-form-btn"
          >
            Kirish
          </CustomButton>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default ConfirmPage;
