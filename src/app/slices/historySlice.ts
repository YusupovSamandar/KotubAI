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
        (_state, action) => {
          return action.payload.results.map((result: IHistoryState) => ({
            ...result,
            input_file: result.input_file,
            action_type: result.action_type,
            output_type: result.output_type,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
          }));
        }
      );
  },
});

export default historySlice.reducer;
