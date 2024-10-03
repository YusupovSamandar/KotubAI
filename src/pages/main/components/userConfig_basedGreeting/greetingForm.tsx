import { Col, Form, Input, Row } from 'antd';
import { greetingLang } from '../data';
import { useTypedSelector } from 'src/app/store';
import { UserInputOptions } from 'src/constants/type';
import MainGreetingDragger from '../servicesSelect/dragger';

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
        {selectedUserInputType === 'yt_link' ? (
          <Col xs={24}>
            <Form.Item name="input_text">
              <Input placeholder={greetingLang[lang].youtubeLink} />
            </Form.Item>
          </Col>
        ) : selectedUserInputType === 'audio/video' ? (
          <Col xs={24}>
            <MainGreetingDragger fileType="audio/video" />
          </Col>
        ) : null}
      </Row>
    </>
  );
}

export default TranscriptGreeting;
