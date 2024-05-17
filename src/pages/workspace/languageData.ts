interface IPerWorkspaceLanguageData {
  summarize: string;
  uploadNewFileTxt: string;
  pageOnLoad: string;
  article: string;
  translate: string;
  askQuestion: string;
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
    pageOnLoad: 'File not complete yet, please check later',
  },
  ru: {
    summarize: 'Суммировать',
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
    pageOnLoad: 'Файл еще не завершен, пожалуйста, проверьте позже',
  },
  uz: {
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
    pageOnLoad: 'Fayl hali tugallanmagan, keyinroq tekshiring',
  },
};
