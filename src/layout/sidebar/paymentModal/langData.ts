interface IPaymentLangData {
  title: string;
  currencyName: string;
  buyDescription: string;
  buy: string;
}
interface ILangData {
  en: IPaymentLangData;
  uz: IPaymentLangData;
  ru: IPaymentLangData;
}

export const paymentLangData: ILangData = {
  en: {
    title: 'Plans and Pricing',
    currencyName: 'sums',
    buyDescription: 'hour long generating',
    buy: 'Buy',
  },
  uz: {
    title: 'Tariflar va Narxlar',
    currencyName: "so'm",
    buyDescription: 'soat vaqt',
    buy: 'Sotib Olish',
  },
  ru: {
    title: 'Тарифы и Цены',
    currencyName: 'сумов',
    buyDescription: 'час генерации',
    buy: 'Купить',
  },
};
interface IPaymentPlan {
  amount: string;
  amountInNumber: number;
  hours: number;
}

export const paymentsPlans: IPaymentPlan[] = [
  {
    amount: '36 000',
    amountInNumber: 36000,
    hours: 1,
  },
  {
    amount: '100 000',
    amountInNumber: 100000,
    hours: 3,
  },
  {
    amount: '200 000',
    amountInNumber: 200000,
    hours: 7,
  },
  {
    amountInNumber: 500000,
    amount: '500 000',
    hours: 17,
  },
];
