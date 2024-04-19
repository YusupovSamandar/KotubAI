import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ILanguage = 'en' | 'uz' | 'ru';
const initialState: ILanguage = 'en'; // Explicitly stating that initialState is of type ILanguage

const languageSlice = createSlice({
  name: 'languageInterface',
  initialState: initialState as ILanguage, // Ensuring the type is explicitly ILanguage
  reducers: {
    changeLanguage: (_state, action: PayloadAction<ILanguage>) =>
      action.payload, // Correctly handle the state change
  },
});

export default languageSlice.reducer;
export const { changeLanguage } = languageSlice.actions;
