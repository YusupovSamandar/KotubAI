import { Button, Divider, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTypedSelector } from 'src/app/store';
import useParamsHook from 'src/hooks/params';
import { workspaceLanguageData } from 'src/pages/workspace/languageData';
import useActionButtons from 'src/pages/workspace/useActionButtons';
import { mainLangData } from '../langData';
import { IServices } from 'src/app/services/type';
import { greetingLang } from '../components/data';
import { LanguageTypes } from 'src/app/services/uploads/type';

function MainStep2() {
  const { actionsLangList, activeLangBtn, userInputType, userInputTypeList } =
    useActionButtons();
  const lang = useTypedSelector((state) => state.language);
  const { handleMakeParams, searchParams } = useParamsHook();
  const [outputLang, setOutputLang] = useState<LanguageTypes>('en-US');

  const handleSubmit = () => {
    if (activeLangBtn && userInputType) {
      const newQueryParams: {
        value: string;
        key: string;
      }[] = [
        { value: activeLangBtn, key: 'lang' },
        { value: userInputType, key: 'inputType' },
        { value: outputLang, key: 'outputLang' },
      ];
      handleMakeParams('', '', newQueryParams);
      // setSteps(3);
    }
  };
  const selectedService = searchParams.get('service') as IServices;
  const selectedUserInputTypeList =
    selectedService === 'transcript'
      ? userInputTypeList.slice(0, 2)
      : userInputTypeList;

  return (
    <div className="main-step2">
      <div className="main-step2-container">
        {(userInputType === 'audio_video' || userInputType === 'yt_link') && (
          <>
            <Title style={{ marginTop: '20px' }} level={3}>
              {greetingLang[lang].language}
            </Title>
            <Divider />
            <Flex align="center" justify="center">
              <div className="main-step2-btn_group">
                {actionsLangList.map((btn) => (
                  <Button
                    style={{ flexGrow: 1 }}
                    icon={<btn.Flag />}
                    key={btn.id}
                    className={btn.id === activeLangBtn ? 'active' : ''}
                    type={btn.id === activeLangBtn ? 'primary' : 'default'}
                    shape="round"
                    onClick={btn.onclickFC}
                    size={'large'}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </Flex>
          </>
        )}
        {selectedService !== 'transcript' && (
          <>
            {' '}
            <Title style={{ marginTop: '20px' }} level={3}>
              {greetingLang[lang].serviceLanguage}
            </Title>
            <Divider />
            <Flex align="center" justify="center">
              <div className="main-step2-btn_group">
                {actionsLangList.map((btn) => (
                  <Button
                    style={{ flexGrow: 1 }}
                    icon={<btn.Flag />}
                    key={btn.id}
                    className={btn.id === outputLang ? 'active' : ''}
                    type={btn.id === outputLang ? 'primary' : 'default'}
                    shape="round"
                    onClick={() => setOutputLang(btn.id)}
                    size={'large'}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </Flex>
          </>
        )}

        <Title style={{ marginTop: '20px' }} level={3}>
          {mainLangData[lang].chooseInputType}
        </Title>
        <Divider />
        <Flex align="center" justify="center">
          <div className="main-step2-btn_group">
            {selectedService &&
              selectedUserInputTypeList.map((btn) => (
                <Button
                  style={{ width: 'calc(50% - 20px)' }}
                  icon={<btn.Icon selected={btn.value === userInputType} />}
                  key={btn.value}
                  className={btn.value === userInputType ? 'active' : ''}
                  type={btn.value === userInputType ? 'primary' : 'default'}
                  shape="round"
                  onClick={btn.onclickFC}
                  size={'large'}
                >
                  {btn.label}
                </Button>
              ))}
          </div>
        </Flex>
        <br />
        <div className="main-step2-submits">
          <Button
            type="primary"
            shape="round"
            onClick={handleSubmit}
            size={'large'}
            style={{
              marginBottom: '20px',
              background:
                'linear-gradient(90deg, #189EFF 0%, #0DACF0 45.19%, #0073DE 100%)',
            }}
          >
            {workspaceLanguageData[lang].modal.confirms.ok}
          </Button>
          <br />
          <Button
            type="default"
            shape="round"
            // onClick={btn.onclickFC}
            size={'large'}
          >
            {workspaceLanguageData[lang].modal.confirms.cancel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MainStep2;
