import { Button, Divider, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { Dispatch, SetStateAction } from 'react';
import { useTypedSelector } from 'src/app/store';
import useParamsHook from 'src/hooks/params';
import { workspaceLanguageData } from 'src/pages/workspace/languageData';
import useActionButtons from 'src/pages/workspace/useActionButtons';
import { mainLangData } from '../langData';

function MainStep2({
  setSteps,
}: {
  setSteps: Dispatch<SetStateAction<2 | 1 | 3>>;
}) {
  const { actionsLangList, activeLangBtn, userInputType, userInputTypeList } =
    useActionButtons();
  const lang = useTypedSelector((state) => state.language);
  const { handleMakeParams } = useParamsHook();

  const handleSubmit = () => {
    if (activeLangBtn && userInputType) {
      handleMakeParams('lang', activeLangBtn);
      handleMakeParams('inputType', userInputType);
      // setSteps(3);
    }
  };

  return (
    <div className="main-step2">
      <div className="main-step2-container">
        <Title style={{ marginTop: '20px' }} level={3}>
          {workspaceLanguageData[lang].modal.summarize.language}
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
        <Title style={{ marginTop: '20px' }} level={3}>
          {mainLangData[lang].chooseInputType}
        </Title>
        <Divider />
        <Flex align="center" justify="center">
          <div className="main-step2-btn_group">
            {userInputTypeList.map((btn) => (
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
