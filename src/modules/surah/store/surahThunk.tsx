import RNFS from 'react-native-fs';

import {createAsyncThunk} from '@reduxjs/toolkit';

import CONFIGS from '../../../configs';
import {SURAH} from '../../../database';
import {
  checkRecitationFiles,
  percentage,
  setErrorMessage,
  setRecitateFileName
} from '../../../utils/helpers';
import {sortSurahData} from '../../../utils/mapping';
import {setAyahDownloaded, setDownloadProgress} from './surahSlice';

export const getSurahRecitation = createAsyncThunk(
  'surah/getSurahRecitation',
  async (surahOrder: any, {rejectWithValue, getState}) => {
    try {
      let result = await checkRecitationFiles(surahOrder);
      return {data: result};
    } catch (error: any) {
      return rejectWithValue(setErrorMessage(error));
    }
  },
);

export const downloadSurahRecitation = createAsyncThunk(
  'surah/downloadSurahRecitation',
  async (
    {surahOrder, subfolder}: {surahOrder: any; subfolder: any},
    {rejectWithValue, getState, dispatch},
  ) => {
    try {
      let surah: any = SURAH;
      surah = surah?.[`surah${surahOrder}`]?.[surahOrder] || null;
      const ayahOrder = sortSurahData(surah?.text);

      let downloadProgress = 0;
      for (let ayah of ayahOrder) {
        const downloadPercentage = percentage(1, ayahOrder.length);
        const fileName = setRecitateFileName(surahOrder, ayah);
        const fileExt = '.mp3';
        const dirPath = `${RNFS.DocumentDirectoryPath}/${subfolder}_${fileName}${fileExt}`;

        const isFileExist: boolean = await RNFS.exists(dirPath);
        if (isFileExist) {
          downloadProgress += downloadPercentage;
          dispatch(setAyahDownloaded(ayah));
          dispatch(setDownloadProgress(downloadProgress));
          continue;
        }

        const url = `${CONFIGS.RECITATE_BASE_URL}/data/${subfolder}/${fileName}${fileExt}`;
        const options = {
          fromUrl: url,
          toFile: dirPath,
        };
        await RNFS.downloadFile(options).promise;
        downloadProgress += downloadPercentage;
        dispatch(setAyahDownloaded(ayah));
        dispatch(setDownloadProgress(downloadProgress));
      }
      let result = await checkRecitationFiles(surahOrder);
      return {data: result};
    } catch (error: any) {
      return rejectWithValue(setErrorMessage(error));
    }
  },
);
