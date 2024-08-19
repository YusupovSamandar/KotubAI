interface IMainData {
  services: {
    transcript: string;
    summary: string;
    article: string;
    translate: string;
  };
  serviceTitle: string;
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
  },
  ru: {
    services: {
      transcript: 'Транскрипция',
      summary: 'Сводка',
      article: 'Статья',
      translate: 'Перевод',
    },
    serviceTitle: 'Выберите тип услуги',
  },
  uz: {
    services: {
      transcript: 'Transkripsiya',
      summary: 'Izoh',
      article: 'Maqola',
      translate: 'Tarjima',
    },
    serviceTitle: 'Xizmat turini tanlang',
  },
};
