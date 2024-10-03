import { Form, Upload } from 'antd';
import { Music } from 'iconsax-react';
import { useTypedSelector } from 'src/app/store';
import { AudioVideoIcon, DocumentSvg } from 'src/assets/svg/dashboard_svg';
import { uploadProps, uploadDocProps } from 'src/constants/form';
import { greetingLang } from '../../data';

function MainGreetingDragger({
  fileType,
}: {
  fileType: 'doc' | 'audio/video';
}) {
  const { Dragger } = Upload;
  const lang = useTypedSelector((state) => state.language);
  const isAudioFile = fileType === 'audio/video';
  const fileUploadProps = isAudioFile ? uploadProps : uploadDocProps;
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <Form.Item
        name="audio_file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Dragger {...fileUploadProps}>
          <p className="ant-upload-drag-icon">
            {!isAudioFile ? (
              <DocumentSvg />
            ) : (
              <AudioVideoIcon selected size={66} />
            )}
          </p>
          <p className="ant-upload-text">
            {!isAudioFile
              ? greetingLang[lang].docxUpload
              : greetingLang[lang].fileUpload}
          </p>
        </Dragger>
      </Form.Item>
    </div>
  );
}

export default MainGreetingDragger;
