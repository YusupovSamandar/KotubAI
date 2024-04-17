import React from 'react';
import './styles.scss';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginMutation } from 'src/app/services/auth';
import TelegramLoginBtn from './telegramLogin';

const SignInPage: React.FC = () => {
  const [isSignUpActive, setIsSignUpActive] = React.useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleTelegramResponse = (response) => {
    console.log(response);
  };

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
        className={`singn-in-container container ${
          isSignUpActive ? 'right-panel-active' : ''
        }`}
        id="singn-in-container"
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              <br />
              <TelegramLoginBtn />
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => {
                  setIsSignUpActive(false);
                }}
                className="ghost"
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                onClick={() => {
                  setIsSignUpActive(true);
                }}
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
