import React, {FC} from 'react';
import {StyleSheet, Text, TextProps, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {fonts} from '../../../utils/fonts';

export interface TextAyahProps extends TextProps {
  children?: any;
  textAlign?: 'center' | 'left' | 'right' | 'justify';
}

const TextAyah: FC<TextAyahProps> = props => {
  const styles = useStyles(props.textAlign);
  return (
    <Text style={styles.ayah} {...props}>
      {props.children}
    </Text>
  );
};

export default TextAyah;

const useStyles = (textAlign?: any) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    ayah: {
      ...fonts.arabic3,
      color: colors.text,
      textAlign: textAlign || 'right',
      lineHeight: 64,
    },
  });
};
