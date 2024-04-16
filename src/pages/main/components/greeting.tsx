import { Button, Col, Form, Input, Row, Select, Upload, message } from 'antd';
import { Music } from 'iconsax-react';
import './../styles.scss';
import fileLanguageOptions from './upload_data';
import useGreeting from './useGreeting';
import { uploadProps } from 'src/constants/form';
import { useEffect } from 'react';

const { Dragger } = Upload;

const Greeting: React.FC<{
  actionType: string;
}> = ({ actionType }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { form, onFinish, isLoading, normFile, sTTError } =
    useGreeting(actionType);

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
      <div className="main-greeting-header">Ovozni tekstga o'zgartirish</div>
      <div className="main-greeting-form">
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 34]}>
            {/* xs={2}  md={6} lg={8} */}
            <Col xs={24} md={12} xl={12}>
              <Form.Item
                name="name"
                // label="Project Name"
                rules={[
                  { required: true, message: 'Project name is required!' },
                ]}
              >
                <Input placeholder="Project Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={12}>
              <Form.Item
                name="lang"
                rules={[{ required: true, message: 'language is required!' }]}
              >
                <Select
                  className="main-greeting-form-select"
                  showSearch
                  placeholder="tilni tanlang"
                  optionFilterProp="children"
                  options={fileLanguageOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="youtube_link">
                <Input placeholder="Youtube link Joylash" />
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
              <p className="ant-upload-text">Audio fayl yuklash</p>
            </Dragger>
          </Form.Item>
          <div className="main-greeting-submit">
            {contextHolder}
            <Button loading={isLoading} htmlType="submit" type="text">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Greeting;
