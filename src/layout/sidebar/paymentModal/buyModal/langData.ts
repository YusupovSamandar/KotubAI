interface IBuyModalData {
  modalTitle: string;
  heavyloadSpinnerTxt: string;
  cardTypeTitle: string;
}

interface IBuyModalLangData {
  en: IBuyModalData;
  ru: IBuyModalData;
  uz: IBuyModalData;
}

export const buyModalLangData: IBuyModalLangData = {
  en: {
    modalTitle: 'Select payment type',
    heavyloadSpinnerTxt: 'Loading...',
    cardTypeTitle: 'Select card type',
  },
  ru: {
    modalTitle: 'Выберите тип оплаты',
    heavyloadSpinnerTxt: 'Загрузка...',
    cardTypeTitle: 'Выберите тип карты',
  },
  uz: {
    modalTitle: "To'lov turini tanlang",
    heavyloadSpinnerTxt: 'Yuklanmoqda...',
    cardTypeTitle: 'Kartani turini tanlang',
  },
};
