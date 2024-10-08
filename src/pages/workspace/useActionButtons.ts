import { useState } from 'react';
import { BritishFlag, RusFlag, UzbFlag } from './icons';
import { IBtnLangList } from './types';
import { mainLangData } from '../main/langData';
import { useTypedSelector } from 'src/app/store';
import {
  AudioVideoIcon,
  DocxSvg,
  TextSvg,
  YoutubeIcon,
} from 'src/assets/svg/dashboard_svg';
import { UserInputOptions } from 'src/constants/type';

function useActionButtons() {
  const [activeLangBtn, setActiveLangBtn] = useState<string>('en-US');
  const [userInputType, setUserInputType] =
    useState<UserInputOptions>('audio_video');
  const lang = useTypedSelector((state) => state.language);

  const actionsLangList: IBtnLangList[] = [
    {
      label: 'English',
      id: 'en-US',
      Flag: BritishFlag,
      onclickFC: async () => {
        setActiveLangBtn('en-US');
      },
    },
    {
      label: 'Русский',
      id: 'ru-RU',
      Flag: RusFlag,
      onclickFC: async () => {
        setActiveLangBtn('ru-RU');
      },
    },
    {
      label: "O'zbek",
      id: 'uz-UZ',
      Flag: UzbFlag,
      onclickFC: async () => {
        setActiveLangBtn('uz-UZ');
      },
    },
  ];
  const userInputTypeList = [
    {
      label: mainLangData[lang].audioVideo,
      Icon: AudioVideoIcon,
      value: 'audio_video',
      onclickFC: async () => {
        setUserInputType('audio_video');
      },
    },
    {
      label: mainLangData[lang].youtubeLink,
      Icon: YoutubeIcon,
      value: 'yt_link',
      onclickFC: async () => {
        setUserInputType('yt_link');
      },
    },
    {
      label: mainLangData[lang].text,
      Icon: TextSvg,
      value: 'text',
      onclickFC: async () => {
        setUserInputType('text');
      },
    },
    {
      label: mainLangData[lang].docFile,
      Icon: DocxSvg,
      value: 'docx',
      onclickFC: async () => {
        setUserInputType('docx');
      },
    },
  ];
  return {
    activeLangBtn,
    actionsLangList,
    userInputTypeList,
    userInputType,
  };
}

export default useActionButtons;
