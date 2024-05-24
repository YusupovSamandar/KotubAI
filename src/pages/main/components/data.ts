export interface IEachGreetingLang {
  mainHeader: string;
  projectName: string;
  projectNameWarning: string;
  language: string;
  languageWarning: string;
  youtubeLink: string;
  fileUpload: string;
  submit: string;
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
    mainHeader: 'Convert speech to text',
    projectName: 'Project Name',
    projectNameWarning: 'Project name is required!',
    languageWarning: 'Language is required!',
    language: 'Choose language',
    youtubeLink: 'Youtube link',
    fileUpload: 'Upload audio file',
    submit: 'Submit',
  },
  uz: {
    mainHeader: "Ovozni tekstga o'zgartirish",
    projectName: 'Loyiha nomi',
    projectNameWarning: 'Loyiha nomi kerak!',
    languageWarning: 'Tilni tanlang!',
    language: 'Tilni tanlang',
    youtubeLink: 'Youtube link joylash',
    fileUpload: 'Audio faylni yuklash',
    submit: "Jo'natish",
  },
  ru: {
    mainHeader: 'Преобразовать речь в текст',
    projectName: 'Название проекта',
    projectNameWarning: 'Название проекта обязательно!',
    languageWarning: 'Выберите язык!',
    language: 'Выберите язык',
    youtubeLink: 'Разместить ссылку на Youtube',
    fileUpload: 'Загрузить аудиофайл',
    submit: 'Отправить',
  },
};
