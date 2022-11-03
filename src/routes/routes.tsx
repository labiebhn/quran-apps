import SurahDetail from '../modules/surah/screens/surah-detail';
import SurahList from '../modules/surah/screens/surah-list';

export const routes = [
  {
    key: 'surah-list',
    name: 'surah-list',
    component: SurahList,
    options: {headerShown: false},
  },
  {
    key: 'surah-detail',
    name: 'surah-detail',
    component: SurahDetail,
    options: {headerShown: false},
  },
];
