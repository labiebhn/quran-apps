import React, {FC} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import * as Progress from 'react-native-progress';

import {useTheme} from '@react-navigation/native';

import {IconDownload, IconPlay} from '../../../assets';
import {CardRecitationType} from '../../../types/components';
import {fonts} from '../../../utils/fonts';
import {ButtonIcon} from '../../buttons';
import {Gap} from '../../layouts';

export interface CardRecitationProps {
  title?: string;
  active?: boolean;
  type?: CardRecitationType;
  progress?: number;
  onPress?(): void;
  onDownloadPress?(): void;
}

const CardRecitation: FC<CardRecitationProps> = ({
  title,
  active,
  type,
  progress,
  onPress,
  onDownloadPress,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(active);

  const renderAction = () => {
    switch (type) {
      case 'download':
        return (
          <ButtonIcon
            icon={<IconDownload width={20} height={20} />}
            onPress={onDownloadPress}
          />
        );
      case 'loading':
        return (
          <Progress.Circle
            size={20}
            thickness={2}
            indeterminate={true}
            color={colors.primary}
          />
        );
      case 'progress':
        return (
          <Progress.Circle
            progress={progress}
            size={20}
            thickness={2}
            indeterminate={false}
            color={colors.primary}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Gap width={8} />
        <View style={styles.action}>{renderAction()}</View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CardRecitation;

const useStyles = (active?: boolean) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: active ? colors.card : colors.container,
    },
    title: {
      ...fonts.p,
      color: active ? colors.primary : colors.text,
    },
    action: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
