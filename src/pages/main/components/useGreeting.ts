import type { UploadFile } from 'antd';
import { Form } from 'antd';
import {
  useCreateProjectMutation,
  useGetHistoryMutation,
} from 'src/app/services/uploads';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { IServices } from 'src/app/services/type';
import { UserInputOptions } from 'src/constants/type';
import { LanguageTypes } from 'src/app/services/uploads/type';

interface IForm {
  name: string;
  input_text: string;
  audio_file: UploadFile[];
  lang: string;
}

export default function useGreeting(actionType) {
  const [searchParams] = useSearchParams();
  const selectedServiceType = searchParams.get('service') as IServices;
  const selectedUserInputType = searchParams.get(
    'inputType'
  ) as UserInputOptions;
  const selectedLanguage = searchParams.get('lang') as LanguageTypes;
  const selectedOutputLang = searchParams.get('outputLang') as LanguageTypes;
  const navigate = useNavigate();
  const [createProject, { isLoading, error: sTTError }] =
    useCreateProjectMutation();
  const [updateHistory, { isLoading: isloadingHistory }] =
    useGetHistoryMutation();
  const onFinish = async (value: IForm) => {
    if (
      (value.input_text && value.audio_file?.[0]) ||
      (!value.input_text && !value.audio_file?.[0])
    ) {
      form.setFields([
        {
          name: 'audio_file',
          errors: ['select only youtube link or audio file'],
        },
      ]);
      form.setFields([
        {
          name: 'input_text',
          errors: ['select only youtube link or audio file'],
        },
      ]);
      return;
    }
    // if (
    //   value.audio_file?.[0] &&
    //   value.audio_file[0].originFileObj.size / 1024 / 1024 > 200
    // ) {
    //   form.setFields([
    //     {
    //       name: 'audio_file',
    //       errors: ['file too big'],
    //     },
    //   ]);
    //   return;
    // }
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('article_type', 'article');
    if (selectedLanguage) {
      formData.append('audio_lang', selectedLanguage);
    }
    formData.append('lang', selectedOutputLang);
    formData.append('input_type', selectedUserInputType);

    formData.append(
      'action_type',
      selectedServiceType === 'transcript' ? 'stt' : selectedServiceType
    );
    formData.append('output_type', 'text');
    if (value.input_text) {
      formData.append('input_text', value.input_text);
    } else {
      formData.append('input_file', value.audio_file[0].originFileObj);
    }
    const data = await createProject(formData).unwrap();
    await updateHistory().unwrap();
    navigate(`/${data.id}`);
  };

  const [form] = Form.useForm();
  return {
    form,
    onFinish,
    isLoading,
    sTTError,
    selectedServiceType,
    selectedUserInputType,
  };
}
