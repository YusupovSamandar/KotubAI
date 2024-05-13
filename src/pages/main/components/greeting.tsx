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
import './../styles.scss';
import fileLanguageOptions from './upload_data';
import useGreeting from './useGreeting';
import { uploadProps } from 'src/constants/form';
import { useEffect } from 'react';
import { useTypedSelector } from 'src/app/store';
import { greetingLang } from './data';
import HeavyLoadSpinner from 'src/components/common/heavyLoadSpinner';

const { Dragger } = Upload;

const Greeting: React.FC<{
  actionType: string;
}> = ({ actionType }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { form, onFinish, isLoading, normFile, sTTError } =
    useGreeting(actionType);
  const lang = useTypedSelector((state) => state.language);

  useEffect(() => {
    if (sTTError) {
      if ('status' in sTTError) {
        messageApi.open({
          type: 'error',
          duration: 5,
          content: JSON.stringify(sTTError.data || sTTError.status),
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

  return (
    <div className="main-greeting">
      <HeavyLoadSpinner isLoading={isLoading}>
        <div className="main-greeting-header">
          {greetingLang[lang].mainHeader}
        </div>
        <div className="main-greeting-form">
          <Form form={form} onFinish={onFinish}>
            <Row gutter={[20, 34]}>
              {/* xs={2}  md={6} lg={8} */}
              <Col xs={24} md={12} xl={12}>
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
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  name="lang"
                  rules={[
                    {
                      required: true,
                      message: greetingLang[lang].languageWarning,
                    },
                  ]}
                >
                  <Select
                    className="main-greeting-form-select"
                    showSearch
                    placeholder={greetingLang[lang].language}
                    optionFilterProp="children"
                    options={fileLanguageOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="youtube_link">
                  <Input placeholder={greetingLang[lang].youtubeLink} />
                </Form.Item>
              </Col>
              <Col xs={24}></Col>
            </Row>
            <Form.Item
              name="audio_file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Music size="45" color="#fff" />
                </p>
                <p className="ant-upload-text">
                  {greetingLang[lang].fileUpload}
                </p>
              </Dragger>
            </Form.Item>
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
