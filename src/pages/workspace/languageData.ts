interface IPerWorkspaceLanguageData {
  yourFile: string;
  transcript: string;
  summarize: string;
  uploadNewFileTxt: string;
  pageOnLoad: string;
  article: string;
  translate: string;
  askQuestion: string;
  contentLoading: string;
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
    yourFile: 'Your File',
    summarize: 'Summarize',
    article: 'Article',
    translate: 'Translate',
    askQuestion: 'Ask Question',
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
    summarize: 'Суммировать',
    yourFile: 'Ваш файл',
    article: 'Статья',
    translate: 'Перевести',
    askQuestion: 'Задать вопрос',
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
    transcript: 'Transkript',
    summarize: 'Xulosa qilish',
    article: 'Maqola',
    translate: 'Tarjima',
    askQuestion: 'Savol bering',
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
