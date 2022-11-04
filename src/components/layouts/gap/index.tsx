import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

const Gap = ({height = 0, width = 0, borderRadius = 4}) => {
  const styles = useStyles();
  const {colors} = useTheme();

  return <View style={{height, width}} />;
};

export default Gap;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {},
  });
};
