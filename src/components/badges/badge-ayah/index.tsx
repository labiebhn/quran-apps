import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {IconAyah} from '../../../assets';
import {fontFamily, fonts} from '../../../utils/fonts';

const SIZE_BADGE = 40;

export interface BadgeAyahProps {
  title?: any;
}

const BadgeAyah: FC<BadgeAyahProps> = ({title}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <IconAyah width={SIZE_BADGE} height={SIZE_BADGE} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default BadgeAyah;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      position: 'relative',
    },
    content: {
      width: SIZE_BADGE,
      height: SIZE_BADGE,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      ...fonts.small,
      fontFamily: fontFamily.Poppins.bold,
      color: colors.text,
      textAlign: 'center',
    },
  });
};
