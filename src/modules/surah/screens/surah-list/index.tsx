import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {SURAH} from '../../../../database';
import {fontFamily, fonts} from '../../../../utils/fonts';

const SurahList = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{SURAH.surah1[1].text[1]}</Text>
    </View>
  );
};

export default SurahList;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      ...fonts.h2,
      color: colors.text,
    },
  });
};
