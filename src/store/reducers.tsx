import {combineReducers} from '@reduxjs/toolkit';

import coreSlice from '../modules/core/store/coreSlice';
import surahSlice from '../modules/surah/store/surahSlice';

const rootReducers = combineReducers({
  core: coreSlice,
  surah: surahSlice,
});

export default rootReducers;
