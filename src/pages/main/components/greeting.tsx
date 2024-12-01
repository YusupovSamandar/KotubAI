import { Button, Col, Form, Input, message } from 'antd';
import { Music } from 'iconsax-react';
import fileLanguageOptions from './upload_data';
import useGreeting from './useGreeting';
import { useEffect } from 'react';
import { useTypedSelector } from 'src/app/store';
import { greetingLang } from './data';
import HeavyLoadSpinner from 'src/components/common/heavyLoadSpinner';
import { TranscriptGreeting } from './userConfig_basedGreeting';

const Greeting: React.FC<{
  actionType: string;
}> = ({ actionType }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    form,
    onFinish,
    isLoading,
    selectedServiceType,
    selectedUserInputType,
  } = useGreeting(actionType);
  const lang = useTypedSelector((state) => state.language);

  return (
    <div className="main-greeting">
      <HeavyLoadSpinner isLoading={isLoading}>
        <div className="main-greeting-header">
          {greetingLang[lang].mainHeader[selectedServiceType]}
        </div>
        <div className="main-greeting-form">
          <Form form={form} onFinish={onFinish}>
            <Col xs={24}>
              <Form.Item
                name="name"
                // label="Project Name"
                rules={[
                  {
                    required: true,
                    message: greetingLang[lang].projectNameWarning,
                  },
                ]}
              >
                <Input
                  maxLength={50}
                  placeholder={greetingLang[lang].projectName}
                />
              </Form.Item>
            </Col>

            <TranscriptGreeting selectedUserInputType={selectedUserInputType} />

            {/*  */}
            <div className="main-greeting-submit">
              {contextHolder}
              <Button loading={isLoading} htmlType="submit" type="text">
                {greetingLang[lang].submit}
              </Button>
            </div>
          </Form>
        </div>
      </HeavyLoadSpinner>
    </div>
  );
};

export default Greeting;
