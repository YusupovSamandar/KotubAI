import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { kotibLanguage, KOTIB_LANGUAGE } from 'src/constants/storage';
type ILanguage = 'en' | 'uz' | 'ru';
const initialState: ILanguage = kotibLanguage; // Explicitly stating that initialState is of type ILanguage
const languageSlice = createSlice({
  name: 'languageInterface',
  initialState: initialState as ILanguage, // Ensuring the type is explicitly ILanguage
  reducers: {
    changeLanguage: (_state, action: PayloadAction<ILanguage>) => {
      localStorage.setItem(KOTIB_LANGUAGE, action.payload);
      return action.payload; // Correctly handle the state change
    },
  },
});

export default languageSlice.reducer;
export const { changeLanguage } = languageSlice.actions;
