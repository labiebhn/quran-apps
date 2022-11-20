import RNFS from 'react-native-fs';

import {createAsyncThunk} from '@reduxjs/toolkit';

import {RECITATIONS, SURAH} from '../../../database';
import {setErrorMessage, setRecitateFileName} from '../../../utils/helpers';
import {sortSurahData} from '../../../utils/mapping';

export const getSurahRecitation = createAsyncThunk(
  'surah/getSurahRecitation',
  async (surahOrder: any, {rejectWithValue, getState}) => {
    try {
      let result = [];

      let i = 0;
      for (let recitation of RECITATIONS.data) {
        let isFileComplete = true;
        let dirPath = `${RNFS.DocumentDirectoryPath}/${recitation?.subfolder}/${surahOrder}`;
        const dirFiles: any = await RNFS.readDir(dirPath).catch(
          () => (isFileComplete = false),
        );
        if (dirFiles?.length < RECITATIONS.ayahCount[surahOrder - 1]) {
          isFileComplete = false;
        }
        let payload = {...recitation, isFileComplete};
        result[i] = payload;
        i++;
      }

      return {data: result};
    } catch (error: any) {
      return rejectWithValue(setErrorMessage(error));
    }
  },
);
