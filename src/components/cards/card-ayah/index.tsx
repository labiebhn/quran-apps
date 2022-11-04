import React, {FC} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {fontFamily, fonts} from '../../../utils/fonts';
import {BadgeAyah} from '../../badges';
import {Gap, TextAyah} from '../../layouts';

export interface CardAyahProps {
  order?: any;
  ayah?: string;
  translation?: string;
  zebra?: any;
  onPress?(): void;
}

const CardAyah: FC<CardAyahProps> = ({
  order,
  ayah,
  translation,
  zebra,
  onPress,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(zebra);
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(colors.border, false)}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <BadgeAyah title={order} />
          <Gap width={4} />
          <View style={styles.ayah}>
            <TextAyah>{ayah}</TextAyah>
          </View>
        </View>
        <Gap height={8} />
        <Text style={styles.translation}>{translation}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CardAyah;

const useStyles = (zebra?: any) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: zebra ? colors.card : colors.container,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ayah: {
      flex: 1,
    },
    translation: {
      ...fonts.h6,
      fontFamily: fontFamily.Poppins.medium,
      color: colors.text,
      textAlign: 'justify',
      lineHeight: 26,
    },
  });
};
