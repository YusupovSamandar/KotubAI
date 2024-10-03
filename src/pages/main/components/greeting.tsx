import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Upload,
  message,
} from 'antd';
import { Music } from 'iconsax-react';
import fileLanguageOptions from './upload_data';
import useGreeting from './useGreeting';
import { uploadProps, uploadDocProps } from 'src/constants/form';
import { useEffect } from 'react';
import { useTypedSelector } from 'src/app/store';
import { greetingLang } from './data';
import HeavyLoadSpinner from 'src/components/common/heavyLoadSpinner';
import { TranscriptGreeting } from './userConfig_basedGreeting';

const { Dragger } = Upload;

const Greeting: React.FC<{
  actionType: string;
}> = ({ actionType }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    form,
    onFinish,
    isLoading,
    normFile,
    sTTError,
    selectedServiceType,
    selectedUserInputType,
  } = useGreeting(actionType);
  const lang = useTypedSelector((state) => state.language);
  useEffect(() => {
    if (sTTError) {
      if ('status' in sTTError) {
        messageApi.open({
          type: 'error',
          duration: 5,
          content: JSON.stringify(
            (sTTError.data as any)?.errors[0]?.code === 'invalid_youtube'
              ? greetingLang[lang].youtubeError
              : sTTError.data || sTTError.status
          ),
        });
      } else {
        messageApi.open({
          type: 'error',
          duration: 5,
          content: JSON.stringify(sTTError.message),
        });
      }
    }
  }, [sTTError]);

  const fileUploadProps =
    selectedServiceType === 'transcript' ? uploadProps : uploadDocProps;

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
                <Input placeholder={greetingLang[lang].projectName} />
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
