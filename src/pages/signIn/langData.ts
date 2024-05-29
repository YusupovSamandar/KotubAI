interface ISignInData {
  signIn: string;
  privacyPolicy: string;
  helloFriend: string;
  enterYourPersonalDetails: string;
  signUp: string;
  welcomeBack: string;
  toKeepConnected: string;
  createAccount: string;
  allRightsReserved: string;
}

interface ISignInLangData {
  en: ISignInData;
  ru: ISignInData;
  uz: ISignInData;
}

export const signInLangData: ISignInLangData = {
  en: {
    signIn: 'Sign In',
    privacyPolicy: `I have read and agree to the 
                  <a href="/oferta" target="_blank">
                    Public Offering 
                  </a> 
                  and 
                  <a href="/privacy-policy" target="_blank">
                    Privacy Policy 
                  </a>
                  `,
    helloFriend: 'Hello, Friend!',
    enterYourPersonalDetails:
      'Enter your personal details and start journey with us',
    signUp: 'Sign Up',
    welcomeBack: 'Welcome Back!',
    toKeepConnected:
      'To keep connected with us please login with your personal info',
    createAccount: 'Create Account',
    allRightsReserved: 'KOTIB.AI @ 2024. All rights reserved.',
  },
  ru: {
    signIn: 'Войти',
    privacyPolicy: `Нажимая кнопку “Войти” вы соглашаетесь с 
                  <a href="/oferta" target="_blank">
                    публичной офертой 
                  </a> 
                  и 
                  <a href="/privacy-policy" target="_blank">
                    Политикой конфиденциальности 
                  </a>
                  `,
    helloFriend: 'Привет, друг!',
    enterYourPersonalDetails:
      'Введите свои личные данные и начните путешествие с нами',
    signUp: 'Зарегистрироваться',
    welcomeBack: 'Добро пожаловать обратно!',
    toKeepConnected:
      'Чтобы оставаться на связи с нами, войдите, используя свои личные данные',
    createAccount: 'Создать аккаунт',
    allRightsReserved: 'KOTIB.AI @ 2024. Все права защищены.',
  },
  uz: {
    signIn: 'Kirish',
    privacyPolicy: `Men 
                  <a href="/oferta" target="_blank">
                    Ommaviy Oferta 
                  </a> 
                  va 
                  <a href="/privacy-policy" target="_blank">
                    Maxfiylik siyosatini 
                  </a>
                  o'qib chiqdim va roziman`,
    helloFriend: "Salom, Do'st!",
    enterYourPersonalDetails:
      "Shaxsiy ma'lumotlaringizni kiriting va biz bilan safar boshlang",
    signUp: "Ro'yxatdan o'tish",
    welcomeBack: 'Qaytganingizga xush kelibsiz!',
    toKeepConnected:
      "Biz bilan bog'liq qolish uchun, iltimos, shaxsiy ma'lumotlaringizni kiriting",
    createAccount: 'Hisob yaratish',
    allRightsReserved: 'KOTIB.AI @ 2024. Barcha huquqlar himoyalangan.',
  },
};
