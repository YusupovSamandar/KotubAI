import { Col, Form, Input, Row, Upload } from 'antd';
import { Music } from 'iconsax-react';
import { DocumentSvg } from 'src/assets/svg/dashboard_svg';
import { greetingLang } from './../data';
import { useTypedSelector } from 'src/app/store';
import { UserInputOptions } from 'src/constants/type';

const { Dragger } = Upload;

function TranscriptGreeting({
  selectedUserInputType,
}: {
  selectedUserInputType: UserInputOptions;
}) {
  const lang = useTypedSelector((state) => state.language);
  return (
    <>
      <Row gutter={[20, 34]}>
        {/* xs={2}  md={6} lg={8} */}
        {/* {selectedUserInputType === ''} */}
        <Col xs={24}>
          <Form.Item name="input_text">
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
    </>
  );
}

export default TranscriptGreeting;
