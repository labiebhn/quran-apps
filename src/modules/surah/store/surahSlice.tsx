import {createSlice} from '@reduxjs/toolkit';

import {RECITATIONS} from '../../../database';
import {InitialState} from '../../../types/store';
import {getSurahRecitation} from './surahThunk';

interface SurahState {
  recitation: InitialState;
}

const initialState: SurahState = {
  recitation: {
    loading: 'idle',
    ayahCount: RECITATIONS.ayahCount,
    data: RECITATIONS.data,
    message: '',
    selectedRecitate: {
      name: '',
      subfolder: '',
      bitrate: '',
    },
    isDownloading: false,
    progressDownload: 0.0,
  },
};

export const surahSlice = createSlice({
  name: 'surah',
  initialState,
  reducers: {
    setSelectedRecitate: (state, action) => {
      state.recitation.selectedRecitate = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSurahRecitation.pending, (state, action) => {
      state.recitation.loading = 'pending';
    });
    builder.addCase(getSurahRecitation.fulfilled, (state, action) => {
      if (action.payload) {
        const {data} = action.payload;
        state.recitation.loading = 'succeeded';
        state.recitation.data = data;
      } else {
        state.recitation.loading = 'succeeded';
      }
    });
    builder.addCase(getSurahRecitation.rejected, (state, action) => {
      state.recitation.loading = 'failed';
      state.recitation.message = action.payload;
    });
  },
});

export const {setSelectedRecitate} = surahSlice.actions;

export default surahSlice.reducer;
