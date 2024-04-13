import { MaskedInput } from 'antd-mask-input';
import { Link } from 'react-router-dom';
import CustomButton from 'src/components/common/button';
import AuthLayout from '..';
import './signin.scss';

function SignInPage() {
  return (
    <AuthLayout>
      <div className="signin">
        <h1>Log in</h1>
        <p>Please, enter your phone number.</p>
        <MaskedInput
          className="signin-top-mask"
          style={{
            fontWeight: 600,
            fontSize: '16px',
            borderRadius: '100px',
            border: '1px solid #636674',
            height: 44,
          }}
          mask={'+{998}(00)000-00-00'}
        />
        <p>
          If you have account please.{' '}
          {/* <Link className="link" to="/auth/signin">
            Log in
          </Link> */}
        </p>
        <Link to="/auth/smsverify">
          <CustomButton
            className="signin-top-btn"
            style={{ width: 360 }}
            colorText={''}
          >
            Send sms code
          </CustomButton>
        </Link>
      </div>
    </AuthLayout>
  );
}

export default SignInPage;
