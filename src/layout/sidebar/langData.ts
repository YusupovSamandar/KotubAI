interface ISidebarLangData {
  popupConfirmTitle: string;
  confirm: string;
  cancel: string;
  hour: string;
  minute: string;
  second: string;
}

interface ISidebarLangDataMap {
  en: ISidebarLangData;
  uz: ISidebarLangData;
  ru: ISidebarLangData;
}

export const sidebarLangData: ISidebarLangDataMap = {
  en: {
    popupConfirmTitle: 'Do you conirm ?',
    confirm: 'Yes',
    cancel: 'No',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
  },
  uz: {
    popupConfirmTitle: 'Tasdiqlaysizmi ?',
    confirm: 'Ha',
    cancel: "Yo'q",
    hour: 'Soat',
    minute: 'Daqiqa',
    second: 'Soniya',
  },
  ru: {
    popupConfirmTitle: 'Вы подтверждаете ?',
    confirm: 'Да',
    cancel: 'Нет',
    hour: 'Час',
    minute: 'Минут',
    second: 'Секунд',
  },
};
