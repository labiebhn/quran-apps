import {createSlice} from '@reduxjs/toolkit';

import {RECITATIONS} from '../../../database';
import {InitialState} from '../../../types/store';
import {downloadSurahRecitation, getSurahRecitation} from './surahThunk';

interface SurahState {
  recitation: InitialState;
  download: InitialState;
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
  },
  download: {
    loading: 'idle',
    message: '',
    selectedRecitate: {
      name: '',
      subfolder: '',
      bitrate: '',
    },
    ayahDownloaded: [],
    progress: 0,
  },
};

export const surahSlice = createSlice({
  name: 'surah',
  initialState,
  reducers: {
    setSelectedRecitate: (state, action) => {
      state.recitation.selectedRecitate = action.payload;
    },
    setSelectedDownload: (state, action) => {
      state.download.selectedRecitate = action.payload;
    },
    setDownloadProgress: (state, action) => {
      state.download.progress = action.payload;
    },
    setAyahDownloaded: (state, action) => {
      const {ayahDownloaded} = state.download;
      state.download.ayahDownloaded = [...ayahDownloaded, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getSurahRecitation.pending, (state, action) => {
      state.recitation.loading = 'pending';
    });
    builder.addCase(getSurahRecitation.fulfilled, (state, action) => {
      state.recitation.loading = 'succeeded';
      if (action.payload) {
        const {data} = action.payload;
        state.recitation.data = data;
      }
    });
    builder.addCase(getSurahRecitation.rejected, (state, action) => {
      state.recitation.loading = 'failed';
      state.recitation.message = action.payload;
    });

    builder.addCase(downloadSurahRecitation.pending, (state, action) => {
      state.download.loading = 'pending';
      state.download.progress = 0;
      state.download.ayahDownloaded = [];
    });
    builder.addCase(downloadSurahRecitation.fulfilled, (state, action) => {
      state.download.loading = 'succeeded';
      state.download.message = 'Berhasil diunduh.';
      if (action.payload) {
        const {data} = action.payload;
        state.recitation.data = data;
      }
    });
    builder.addCase(downloadSurahRecitation.rejected, (state, action) => {
      state.download.loading = 'failed';
      state.download.message = action.payload;
    });
  },
});

export const {
  setSelectedRecitate,
  setSelectedDownload,
  setDownloadProgress,
  setAyahDownloaded,
} = surahSlice.actions;

export default surahSlice.reducer;
