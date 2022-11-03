import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

const SurahList = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>SurahList</Text>
    </View>
  );
};

export default SurahList;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {},
  });
};
