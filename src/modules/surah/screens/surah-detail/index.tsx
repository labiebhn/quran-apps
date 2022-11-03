import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

const SurahDetail = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>SurahDetail</Text>
    </View>
  );
};

export default SurahDetail;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {},
  });
};
