import { createSlice } from '@reduxjs/toolkit';
import { uploadApi } from '../services/uploads';
import { IHistoryState } from '../services/uploads/type';

const initialState: IHistoryState[] = [];

const historySlice = createSlice({
  name: 'userHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Login
      .addMatcher(
        uploadApi.endpoints.getHistory.matchFulfilled,
        (state, action) => {
          return action.payload.result;
        }
      );
  },
});

export default historySlice.reducer;
