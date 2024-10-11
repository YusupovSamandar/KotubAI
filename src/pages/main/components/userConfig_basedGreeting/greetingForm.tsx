import { Col, Form, Input, Row } from 'antd';
import { greetingLang } from '../data';
import { useTypedSelector } from 'src/app/store';
import { UserInputOptions } from 'src/constants/type';
import MainGreetingDragger from '../servicesSelect/dragger';
import TextArea from 'antd/es/input/TextArea';

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
        {selectedUserInputType === 'site_link' ? (
          <Col xs={24}>
            <Form.Item name="input_text">
              <Input placeholder={greetingLang[lang].site_link} />
            </Form.Item>
          </Col>
        ) : selectedUserInputType === 'yt_link' ? (
          <Col xs={24}>
            <Form.Item name="input_text">
              <Input placeholder={greetingLang[lang].youtubeLink} />
            </Form.Item>
          </Col>
        ) : selectedUserInputType === 'audio_video' ||
          selectedUserInputType === 'docx' ? (
          <Col xs={24}>
            <MainGreetingDragger fileType={selectedUserInputType} />
          </Col>
        ) : selectedUserInputType === 'text' ? (
          <Col xs={24}>
            <Form.Item name="input_text">
              <TextArea placeholder={greetingLang[lang].input_text} rows={4} />
            </Form.Item>
          </Col>
        ) : null}
      </Row>
    </>
  );
}

export default TranscriptGreeting;
