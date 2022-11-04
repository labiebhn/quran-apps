export const sortSurahData = (data: any) => {
  return Object.keys(data).sort((a, b) => {
    let aNumber = Number(a?.replace('surah', ''));
    let bNumber = Number(b?.replace('surah', ''));
    return aNumber - bNumber;
  });
};
