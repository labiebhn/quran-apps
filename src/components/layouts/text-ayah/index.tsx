import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

const TextAyah = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>TextAyah</Text>
    </View>
  );
};

export default TextAyah;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {},
  });
};
