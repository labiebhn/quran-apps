import RNFS from 'react-native-fs';

import {RECITATIONS} from '../database';

export const setErrorMessage = (action: any) => {
  let error = action?.paylaod || action;
  let message =
    error?.response?.data?.data?.message ??
    error?.response?.data?.meta?.message ??
    error?.response?.data?.message ??
    error?.response?.message ??
    error?.message ??
    'Server Sedang Mengalami Gangguan';

  if (
    error?.response?.status === 500 ||
    error?.response?.data?.meta?.status === 500
  ) {
    message = 'Server Sedang Mengalami Gangguan';
  }

  return message;
};

export const setRecitateFileName = (
  surahOrder: string,
  ayah: string,
): string => {
  let orderName: any[] = [0, 0, 0];
  let ayahName: any[] = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    let iReverse = 2 - i;
    orderName[iReverse] = surahOrder[i] || 0;
    ayahName[iReverse] = ayah[i] || 0;
  }
  let result = `${orderName.join('')}${ayahName.join('')}`;
  return result;
};

export const percentage = (patrial: number, total: number) => {
  return (100 * patrial) / total;
};

export const checkRecitationFiles = (surahOrder: any) =>
  new Promise(async (resolve, reject) => {
    try {
      let result = [];
      let i = 0;
      for (let recitation of RECITATIONS.data) {
        let isFileComplete = true;
        let dirPath = `${RNFS.DocumentDirectoryPath}`;
        await RNFS.readDir(dirPath)
          .then(dirFiles => {
            // Get selected recitation files
            let recitateFiles = [];
            for (let item of dirFiles) {
              let isFileExist = item?.name?.includes(recitation?.subfolder);
              if (isFileExist) {
                recitateFiles.push(item?.name);
              }
            }
            // Check recitation files is complete
            if (recitateFiles?.length < RECITATIONS.ayahCount[surahOrder - 1]) {
              isFileComplete = false;
            }
          })
          .catch(() => (isFileComplete = false));
        let payload = {...recitation, isFileComplete};
        result[i] = payload;
        i++;
      }
      resolve(result);
    } catch (error: any) {
      reject(error);
    }
  });

export const setProgressIndicator = (progres: number) => {
  return Math.round(Math.round(progres) * 100) / 10000;
};
