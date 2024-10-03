interface IMainData {
  services: {
    transcript: string;
    summary: string;
    article: string;
    translate: string;
  };
  chooseInputType: string;
  serviceTitle: string;
  audioVideo: string;
  youtubeLink: string;
  text: string;
  docFile: string;
}

interface IMainLangData {
  en: IMainData;
  ru: IMainData;
  uz: IMainData;
}

export const mainLangData: IMainLangData = {
  en: {
    services: {
      transcript: 'Transcript',
      summary: 'Summary',
      article: 'Article',
      translate: 'Translate',
    },
    serviceTitle: 'Select service type',
    chooseInputType: 'choose input type',
    audioVideo: 'Audio/Video',
    youtubeLink: 'YouTube link',
    docFile: 'doc file',
    text: 'text',
  },
  ru: {
    services: {
      transcript: 'Транскрипция',
      summary: 'Сводка',
      article: 'Статья',
      translate: 'Перевод',
    },
    serviceTitle: 'Выберите тип услуги',
    chooseInputType: 'choose input type',
    audioVideo: 'Audio/Video',
    youtubeLink: 'YouTube link',
    docFile: 'doc file',
    text: 'text',
  },
  uz: {
    services: {
      transcript: 'Transkripsiya',
      summary: 'Izoh',
      article: 'Maqola',
      translate: 'Tarjima',
    },
    serviceTitle: 'Xizmat turini tanlang',
    chooseInputType: 'Choose input type',
    audioVideo: 'Audio/Video',
    youtubeLink: 'YouTube link',
    docFile: 'doc file',
    text: 'text',
  },
};
