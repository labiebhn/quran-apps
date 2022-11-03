import {Platform} from 'react-native';

export const fontFamily = {
  Amiri: {
    regular: 'Amiri-Regular',
    slanted: 'Amiri-Slanted',
    bold: 'Amiri-Bold',
    boldSlanted: 'Amiri-BoldSlanted',
    quran: 'AmiriQuran',
    quranColored: 'AmiriQuranColored',
  },
};

const familyDefault = fontFamily.Amiri;
const marginBottom = 0;

export const fonts = {
  banner1: {
    fontSize: 78,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  banner2: {
    fontSize: 54,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  h1: {
    fontSize: 36,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  h2: {
    fontSize: 27,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  h3: {
    fontSize: 22,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  h4: {
    fontSize: 18,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  h5: {
    fontSize: 16,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  h6: {
    fontSize: 14,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  h7: {
    fontSize: 12,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  label: {
    fontSize: 12,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  p: {
    fontSize: 12,
    fontFamily: familyDefault.regular,
    marginBottom,
  },
  small: {
    fontSize: 10,
    fontFamily: familyDefault.regular,
    marginBottom,
  },
  placeholder: {
    fontSize: 12,
    fontFamily: familyDefault.regular,
    marginBottom,
  },
  btn: {
    fontSize: 12,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  btn1: {
    fontSize: 12,
    fontFamily: familyDefault.bold,
    marginBottom,
  },
  input: {
    fontSize: 12,
    fontFamily: familyDefault.regular,
  },
};
