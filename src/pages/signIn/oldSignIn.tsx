import React from 'react';
import './styles.scss';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginMutation } from 'src/app/services/auth';
import TelegramLoginBtn from './telegramLogin';
import { useTypedSelector } from 'src/app/store';
import { Checkbox } from 'antd';
import { signInLangData } from './langData';

const SignInPage: React.FC = () => {
  const { isMobile } = useTypedSelector((state) => state.layout);
  const [isSignUpActive, setIsSignUpActive] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const currLang = useTypedSelector((state) => state.language);

  const onSuccess = async (credentialResponse) => {
    const data = await login({
      token: credentialResponse.credential,
      type: 'google',
      user_id: null,
    }).unwrap();
    localStorage.setItem('KOTUB_TOKEN', data.token.access);
    localStorage.setItem('KOTUB_REFRESH_TOKEN', data.token.refresh);
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossOrigin="anonymous"
      />

      <div
        className={`singn-in-container ${
          isMobile ? 'singn-in-container-mobile' : ''
        } container ${isSignUpActive ? 'right-panel-active' : ''}`}
        id="singn-in-container"
        style={{ width: '100%' }}
      >
        {!isMobile && (
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>{signInLangData[currLang].createAccount}</h1>
              <div className="social-container">
                {/* <GoogleLogin
                  onSuccess={onSuccess}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                /> */}
              </div>
              {/* <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button> */}
            </form>
          </div>
        )}
        <div
          className="form-container sign-in-container"
          style={{ width: isMobile ? '100%' : '50%' }}
        >
          <form action="#">
            <h1>{signInLangData[currLang].signIn}</h1>
            <div className="social-container">
              {/* <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              /> */}
              <div className="privacy-policy">
                <Checkbox
                  onChange={() => setIsChecked(!isChecked)}
                  checked={isChecked}
                ></Checkbox>
                <div
                  dangerouslySetInnerHTML={{
                    __html: signInLangData[currLang].privacyPolicy,
                  }}
                ></div>
              </div>
              <br />
              <div
                style={{
                  pointerEvents: isChecked ? 'auto' : 'none',
                  opacity: isChecked ? '1' : '0.5',
                }}
              >
                <TelegramLoginBtn />
              </div>
            </div>
            <div className="aferta-container"></div>
            {/* <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button> */}
          </form>
        </div>
        {!isMobile && (
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>{signInLangData[currLang].welcomeBack}</h1>
                <p>{signInLangData[currLang].toKeepConnected}</p>
                <button
                  onClick={() => {
                    setIsSignUpActive(false);
                  }}
                  className="ghost"
                  id={signInLangData[currLang].signIn}
                >
                  {signInLangData[currLang].signIn}
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>{signInLangData[currLang].helloFriend}</h1>
                <p>{signInLangData[currLang].enterYourPersonalDetails}</p>
                <button
                  onClick={() => {
                    setIsSignUpActive(true);
                  }}
                  className="ghost"
                  id={signInLangData[currLang].signUp}
                >
                  {signInLangData[currLang].signUp}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignInPage;
