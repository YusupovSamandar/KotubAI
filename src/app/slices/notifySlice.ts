import { createSlice } from '@reduxjs/toolkit';
interface INotifySlice {
  id: string;
}

const initialState: INotifySlice = {} as INotifySlice;

const notifySlice = createSlice({
  name: 'notifySlice',
  initialState,
  reducers: {
    setNotify: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export default notifySlice.reducer;
export const { setNotify } = notifySlice.actions;
