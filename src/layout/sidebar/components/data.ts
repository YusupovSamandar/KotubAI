interface IPerConfirmData {
  title: string;
  content: string;
}
interface IConfirmData {
  en: IPerConfirmData;
  ru: IPerConfirmData;
  uz: IPerConfirmData;
}

export const confirmData: IConfirmData = {
  en: {
    title: 'Delete File?',
    content: 'This will delete the file permanently.',
  },
  ru: {
    title: 'Удалить файл?',
    content: 'Это навсегда удалит файл.',
  },
  uz: {
    title: 'Faylni o`chirish?',
    content: "Bu faylni o'chirgandan so'ng tiklab bo'lmaydi.",
  },
};
