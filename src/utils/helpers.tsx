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
  subfolder: string,
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
  let result = `${subfolder}/${orderName.join('')}${ayahName.join('')}`;
  return result;
};
