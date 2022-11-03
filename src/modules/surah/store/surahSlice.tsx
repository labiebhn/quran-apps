import {createSlice} from '@reduxjs/toolkit';

interface SurahState {}

const initialState: SurahState = {};

export const surahSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = surahSlice.actions;

export default surahSlice.reducer;
