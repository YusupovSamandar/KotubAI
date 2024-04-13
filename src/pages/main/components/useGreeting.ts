import type { UploadFile } from 'antd';
import { Form } from 'antd';
import { useSpeechToTextMutation } from 'src/app/services/uploads';
import { useNavigate } from 'react-router-dom';
interface IForm {
  name: string;
  youtube_link: string;
  audio_file: UploadFile[];
  lang: string;
}

export default function useGreeting(actionType) {
  const navigate = useNavigate();
  const [send, { isLoading }] = useSpeechToTextMutation();
  const onFinish = async (value: IForm) => {
    if (
      (value.youtube_link && value.audio_file?.[0]) ||
      (!value.youtube_link && !value.audio_file?.[0])
    ) {
      form.setFields([
        {
          name: 'audio_file',
          errors: ['select only youtube link or audio file'],
        },
      ]);
      form.setFields([
        {
          name: 'youtube_link',
          errors: ['select only youtube link or audio file'],
        },
      ]);
      return;
    }
    if (
      value.audio_file?.[0] &&
      value.audio_file[0].originFileObj.size / 1024 / 1024 > 10
    ) {
      form.setFields([
        {
          name: 'audio_file',
          errors: ['file too big'],
        },
      ]);
      return;
    }
    const formData = new FormData();
    formData.append('project_name', value.name);
    formData.append('lang', value.lang);
    if (value.youtube_link) {
      formData.append('youtube_link', value.youtube_link);
    } else {
      formData.append('audio_file', value.audio_file[0].originFileObj);
    }

    const data = await send(formData).unwrap();

    navigate(`/${data.id}`);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [form] = Form.useForm();
  return {
    form,
    onFinish,
    isLoading,
    normFile,
  };
}
