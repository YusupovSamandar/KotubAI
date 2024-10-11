export interface IEachGreetingLang {
  mainHeader: {
    transcript: string;
    summary: string;
    translate: string;
    article: string;
  };
  projectName: string;
  projectNameWarning: string;
  language: string;
  languageWarning: string;
  youtubeLink: string;
  input_text: string;
  fileUpload: string;
  docxUpload: string;
  submit: string;
  youtubeError: string;
  serviceLanguage: string;
  site_link: string;
}
export interface IEachLang {
  en: IEachGreetingLang;
  ru: IEachGreetingLang;
  uz: IEachGreetingLang;
}

interface IPayment {
  success: string;
  failed: string;
}

interface IPaymentLang {
  en: IPayment;
  ru: IPayment;
  uz: IPayment;
}

export const paymentLangData: IPaymentLang = {
  en: {
    success: ' has been added to your account',
    failed: 'Payment failed',
  },
  ru: {
    success: ' добавлен на ваш счет',
    failed: 'Ошибка оплаты',
  },
  uz: {
    success: ' hisobingizga qo`shildi',
    failed: 'To`lov bekor qilindi',
  },
};

export const en = [
  { value: 's-t-t', label: 'Speech to text' },
  { value: 't-t-s', label: 'Text to speech' },
  { value: 'smr', label: 'Website summary' },
];
export const uz = [
  { value: 's-t-t', label: 'Nutqdan matnga' },
  { value: 't-t-s', label: 'Matnni nutqqa' },
  { value: 'smr', label: 'Veb-sayt xulosa' },
];
export const ru = [
  { value: 's-t-t', label: 'Речь в текст' },
  { value: 't-t-s', label: 'Текст в речь' },
  { value: 'smr', label: 'описание веб-сайта' },
];

export const greetingLang: IEachLang = {
  en: {
    mainHeader: {
      transcript: 'Convert speech to text',
      summary: 'Summarize from audio',
      translate: 'Translate document',
      article: 'Generate article',
    },
    input_text: 'Input text',
    youtubeError: 'Failed to load audio from Youtube',
    projectName: 'Project Name',
    projectNameWarning: 'Project name is required!',
    languageWarning: 'Language is required!',
    language: 'Choose audio/video language',
    youtubeLink: 'Youtube link',
    fileUpload: 'Upload audio file',
    submit: 'Submit',
    docxUpload: 'Upload docx file',
    serviceLanguage: 'Choose output language',
    site_link: 'Website Url',
  },
  uz: {
    mainHeader: {
      transcript: 'Nutqni matnga o`zgartirish',
      summary: 'Fayldan kerakli xulosalar chiqarish',
      translate: 'Fayl tarjima qilish',
      article: 'Berilgan mavzuda maqola yozish',
    },
    youtubeError: 'youtubedan audio yuklab olinmadi.',
    input_text: 'Matn kiriting',
    projectName: 'Loyiha nomi',
    projectNameWarning: 'Loyiha nomi kerak!',
    languageWarning: 'Tilni tanlang!',
    language: 'Audio/video tilini tanlang',
    youtubeLink: 'Youtube link joylash',
    fileUpload: 'Audio faylni yuklash',
    submit: "Jo'natish",
    docxUpload: 'Doc fayl yuklash',
    serviceLanguage: 'Natija tilini tanlang',
    site_link: 'Veb-sayt havolasi',
  },
  ru: {
    mainHeader: {
      article: 'Сгенерировать статью',
      transcript: 'Преобразовать речь в текст',
      summary: 'Суммировать из аудио',
      translate: 'Перевести документ',
    },
    youtubeError: 'Не удалось загрузить аудио с Youtube',
    input_text: 'Введите текст',
    projectName: 'Название проекта',
    projectNameWarning: 'Название проекта обязательно!',
    languageWarning: 'Выберите язык!',
    language: 'Выберите язык аудио/видео',
    youtubeLink: 'Разместить ссылку на Youtube',
    fileUpload: 'Загрузить аудиофайл',
    submit: 'Отправить',
    docxUpload: 'Загрузить docx файл',
    serviceLanguage: 'Выберите язык вывода',
    site_link: 'Ссылка на веб-сайт',
  },
};
