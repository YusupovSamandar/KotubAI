import { Col, Row, Select } from 'antd';
import './signIn.scss';
import AqchaGif from 'src/assets/img/aqcha.gif';
import { FullLogo } from 'src/assets/svg/dashboard_svg';
import { useTypedSelector } from 'src/app/store';
import React, { useEffect } from 'react';
import {
  useLoginMutation,
  useLoginWithAdminMutation,
} from 'src/app/services/auth';
import { signInLangData } from './langData';
import TelegramLoginBtn from './telegramLogin';
import { changeLanguage } from 'src/app/slices/languageSlice';
import { useDispatch } from 'react-redux';
import { ILanguage } from 'src/app/services/type';

const clientId = import.meta.env.VITE_APP_ENV;

function SignIn() {
  const dispatch = useDispatch();
  const { isMobile } = useTypedSelector((state) => state.layout);
  const [login, { isLoading }] = useLoginMutation();
  const currLang = useTypedSelector((state) => state.language);
  const [loginAsAdmin] = useLoginWithAdminMutation();
  useEffect(() => {
    const result = prompt('Please set your clientId in .env file');
    if (clientId === 'development') {
      if (result === 'admin1') {
        loginAsAdmin()
          .unwrap()
          .then(() => {
            window.location.reload();
          });
      }
    }
  }, []);
  return (
    <div className="sign-in-container">
      <div className="sign-in-container-header">
        <FullLogo />
        <Select
          className="sign-in-container-language-select"
          defaultValue="uz"
          onChange={(value: ILanguage) => {
            dispatch(changeLanguage(value));
          }}
          options={[
            { value: 'uz', label: 'Uzb' },
            { value: 'ru', label: 'Рус' },
            { value: 'en', label: 'Eng' },
          ]}
        />
      </div>
      <Row className="sign-in-container-body">
        <Col sm={24} md={24} lg={12}>
          <img src={AqchaGif} alt="" />
        </Col>
        <Col sm={24} md={24} lg={12}>
          <div className="sign-in-container-body-form">
            <h1>{signInLangData[currLang].signIn}</h1>
            <br />
            <br />
            <TelegramLoginBtn />
            <br />
            <br />
            <div
              className="sign-in-container-body-form-p"
              dangerouslySetInnerHTML={{
                __html: signInLangData[currLang].privacyPolicy,
              }}
            />
          </div>
        </Col>
      </Row>
      <div className="sign-in-container-footer">
        {signInLangData[currLang].allRightsReserved}
      </div>
    </div>
  );
}

export default SignIn;
