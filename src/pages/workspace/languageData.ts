interface IPerWorkspaceLanguageData {
  yourFile: string;
  transcript: string;
  text: string;
  docx: string;
  summarize: string;
  uploadNewFileTxt: string;
  pageOnLoad: string;
  article: string;
  translate: string;
  askQuestion: string;
  contentLoading: string;
  fileType: string;
  fileReady: string;
  modal: {
    summarize: {
      language: string;
    };
    article: {
      language: string;
      type: string;
      types: {
        article: string;
        news: string;
        reportage: string;
        interview: string;
      };
    };
    translate: {
      language: string;
    };
    askQuestion: {
      label: string;
    };
    confirms: {
      ok: string;
      cancel: string;
    };
  };
}
interface IWorkspaceLanguageData {
  en: IPerWorkspaceLanguageData;
  ru: IPerWorkspaceLanguageData;
  uz: IPerWorkspaceLanguageData;
}

export const workspaceLanguageData: IWorkspaceLanguageData = {
  en: {
    transcript: 'Transcript',
    fileType: 'Choose file type',
    text: 'Text',
    docx: 'Doc file',
    yourFile: 'Your File',
    summarize: 'Summarize',
    article: 'Article',
    translate: 'Translate',
    askQuestion: 'Ask Question',
    fileReady: 'Your file is ready',
    modal: {
      summarize: {
        language: 'Choose Language',
      },
      article: {
        language: 'Choose Language',
        type: 'Choose Article Type',
        types: {
          article: 'Article',
          news: 'News',
          reportage: 'Reportage',
          interview: 'Interview',
        },
      },
      translate: {
        language: 'Choose Language',
      },
      askQuestion: {
        label: 'Ask Away',
      },
      confirms: {
        ok: 'PROCEED',
        cancel: 'Cancel',
      },
    },
    uploadNewFileTxt: 'Upload New File',
    pageOnLoad:
      'You will receive a notification in Telegram when the file is ready',
    contentLoading: 'Content is loading...',
  },
  ru: {
    transcript: 'Транскрипт',
    fileType: 'Выберите тип файла',
    text: 'Текст',
    docx: 'Doc файл',
    summarize: 'Суммировать',
    yourFile: 'Ваш файл',
    article: 'Статья',
    translate: 'Перевести',
    askQuestion: 'Задать вопрос',
    fileReady: 'Ваш файл готов',
    modal: {
      summarize: {
        language: 'Выберите язык',
      },
      article: {
        language: 'Выберите язык',
        type: 'Выберите тип статьи',
        types: {
          article: 'Статья',
          news: 'Новости',
          reportage: 'Репортаж',
          interview: 'Интервью',
        },
      },
      translate: {
        language: 'Выберите язык',
      },
      askQuestion: {
        label: 'Спросите',
      },
      confirms: {
        ok: 'ПРОДОЛЖИТЬ',
        cancel: 'Отмена',
      },
    },
    uploadNewFileTxt: 'Загрузить новый файл',
    pageOnLoad: 'Вы получите уведомление в Telegram, когда файл будет готов',
    contentLoading: 'Загрузка контента...',
  },
  uz: {
    yourFile: 'Sizning faylingiz',
    fileType: 'Fayl turi tanlang',
    text: 'Matn',
    docx: 'Doc fayl',
    transcript: 'Transkript',
    summarize: 'Xulosa qilish',
    article: 'Maqola',
    translate: 'Tarjima',
    askQuestion: 'Savol bering',
    fileReady: 'Sizning faylingiz tayyor',
    modal: {
      summarize: {
        language: 'Tilni tanlang',
      },
      article: {
        language: 'Tilni tanlang',
        type: 'Maqola turi tanlang',
        types: {
          article: 'Maqola',
          news: 'Yangiliklar',
          reportage: 'Reportaj',
          interview: 'Intervyu',
        },
      },
      translate: {
        language: 'Tilni tanlang',
      },
      askQuestion: {
        label: 'Savol bering',
      },
      confirms: {
        ok: 'DAVOM ETISH',
        cancel: 'Bekor qilish',
      },
    },
    uploadNewFileTxt: 'Yangi fayl yuklash',
    pageOnLoad: "Fayl tayyor bo'lganda sizga Telegram orqali xabar beriladi",
    contentLoading: 'Kontent yuklanmoqda...',
  },
};

interface IWorkspaceErrorData {
  errorCode: string;
  errorMessage: string;
}

interface IWorkspaceErrorLangData {
  en: IWorkspaceErrorData[];
  ru: IWorkspaceErrorData[];
  uz: IWorkspaceErrorData[];
}

export const workspaceErrorLangData: IWorkspaceErrorLangData = {
  en: [
    {
      errorCode: 'project_input_empty',
      errorMessage: 'Project Input text or input file is empty.',
    },
    {
      errorCode: 'invalid_article_type',
      errorMessage: 'Invalid article type',
    },
    {
      errorCode: 'incorrect_format',
      errorMessage: 'Incorrect file format. choose one: audio or video',
    },
    {
      errorCode: 'incorrect_size',
      errorMessage: 'File size must be max 50 mb',
    },
    {
      errorCode: 'incorrect_duration',
      errorMessage: 'Audio must be less than 60 minutes long!',
    },
    {
      errorCode: 'hissob',
      errorMessage: 'Sizning hissobingiz yetarli emas!',
    },
    {
      errorCode: 'invalid_lang',
      errorMessage: 'Invalid language. choose one: uz-UZ, ru-RU, en-US',
    },
    {
      errorCode: 'stt_empty',
      errorMessage: 'STT output text is empty.',
    },
  ],
  ru: [
    {
      errorCode: 'project_input_empty',
      errorMessage: 'Входной текст проекта или входной файл пуст.',
    },
    {
      errorCode: 'invalid_article_type',
      errorMessage: 'Недопустимый тип статьи',
    },
    {
      errorCode: 'incorrect_format',
      errorMessage: 'Неверный формат файла. выберите один: аудио или видео',
    },
    {
      errorCode: 'incorrect_size',
      errorMessage: 'Размер файла должен быть не более 50 МБ',
    },
    {
      errorCode: 'incorrect_duration',
      errorMessage: 'Аудио должно быть длиной не более 60 минут!',
    },
    {
      errorCode: 'hissob',
      errorMessage: 'Ваш баланс недостаточен!',
    },
    {
      errorCode: 'invalid_lang',
      errorMessage: 'Недопустимый язык. выберите один: uz-UZ, ru-RU, en-US',
    },
    {
      errorCode: 'stt_empty',
      errorMessage: 'Вывод текста STT пуст.',
    },
  ],
  uz: [
    {
      errorCode: 'project_input_empty',
      errorMessage: 'Proyekt kiruvchi matn yoki kiruvchi fayl bo`sh.',
    },
    {
      errorCode: 'invalid_article_type',
      errorMessage: 'Noto‘g‘ri maqola turi',
    },
    {
      errorCode: 'incorrect_format',
      errorMessage: 'Noto‘g‘ri fayl formati. birini tanlang: audio yoki video',
    },
    {
      errorCode: 'incorrect_size',
      errorMessage: 'Fayl hajmi maksimum 50 mb bo‘lishi kerak',
    },
    {
      errorCode: 'incorrect_duration',
      errorMessage: 'Audio 60 daqiqadan kam bo‘lishi kerak!',
    },
    {
      errorCode: 'hissob',
      errorMessage: 'Sizning hisobingiz yetarli emas!',
    },
    {
      errorCode: 'invalid_lang',
      errorMessage: 'Noto‘g‘ri til. birini tanlang: uz-UZ, ru-RU, en-US',
    },
    {
      errorCode: 'stt_empty',
      errorMessage: 'STT chiqqan matn bo‘sh.',
    },
  ],
};
