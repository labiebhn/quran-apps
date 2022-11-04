import React, {FC} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {fontFamily, fonts} from '../../../utils/fonts';
import {BadgeAyah} from '../../badges';
import {Gap} from '../../layouts';

export interface CardSurahProps {
  order?: any;
  title?: string;
  description?: string;
  arabicTitle?: string;
  onPress?(): void;
}

const CardSurah: FC<CardSurahProps> = ({
  order,
  title,
  description,
  arabicTitle,
  onPress,
}) => {
  const styles = useStyles();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <BadgeAyah title={order} />
        <Gap width={12} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.arabic}>{arabicTitle}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardSurah;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    info: {
      flex: 1,
    },
    title: {
      ...fonts.h6,
      color: colors.text,
    },
    description: {
      ...fonts.p,
      color: colors.text,
    },
    arabic: {
      ...fonts.arabic3,
      color: colors.primary,
    },
  });
};
