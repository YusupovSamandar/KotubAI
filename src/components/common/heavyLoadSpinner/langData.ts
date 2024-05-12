interface IHeavyLoadSpinnerData {
  message: string;
}

interface IHeavyLoadSpinnerDataLang {
  en: IHeavyLoadSpinnerData;
  ru: IHeavyLoadSpinnerData;
  uz: IHeavyLoadSpinnerData;
}

export const heavyLoadSpinnerLang: IHeavyLoadSpinnerDataLang = {
  en: {
    message: 'Please wait, the server is processing your request',
  },
  ru: {
    message: 'Пожалуйста подождите, сервер обрабатывает ваш запрос',
  },
  uz: {
    message: "So'rov qabul qilindi, so'rovnoma amalga oshirilmoqda",
  },
};
