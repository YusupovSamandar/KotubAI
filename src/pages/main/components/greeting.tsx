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
import { uploadProps, uploadDocProps } from 'src/constants/form';
import { useEffect } from 'react';
import { useTypedSelector } from 'src/app/store';
import { greetingLang } from './data';
import HeavyLoadSpinner from 'src/components/common/heavyLoadSpinner';
import { DocumentSvg } from 'src/assets/svg/dashboard_svg';

const { Dragger } = Upload;

const Greeting: React.FC<{
  actionType: string;
}> = ({ actionType }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { form, onFinish, isLoading, normFile, sTTError, selectedServiceType } =
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
                <Form.Item name="input_text">
                  <Input
                    placeholder={
                      selectedServiceType === 'transcript'
                        ? greetingLang[lang].youtubeLink
                        : greetingLang[lang].input_text
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24}></Col>
            </Row>
            <Form.Item
              name="audio_file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger {...fileUploadProps}>
                <p className="ant-upload-drag-icon">
                  {selectedServiceType !== 'transcript' ? (
                    <DocumentSvg />
                  ) : (
                    <Music size="45" color="#fff" />
                  )}
                </p>
                <p className="ant-upload-text">
                  {selectedServiceType !== 'transcript'
                    ? greetingLang[lang].docxUpload
                    : greetingLang[lang].fileUpload}
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
