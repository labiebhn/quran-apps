import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '@react-navigation/native';

import {Gap, TextAyah} from '../../../../components/layouts';
import {fonts} from '../../../../utils/fonts';

const AyahDetail = ({navigation, route}: any) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {
    surah_order,
    name,
    name_latin,
    number_of_ayah,
    order,
    ayah,
    translation,
  } = route.params;
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TextAyah textAlign={'center'}>{ayah}</TextAyah>
          <Gap height={26} />
          <Text style={styles.translation}>{translation}</Text>
          <Gap height={26} />
          <Text style={styles.surah}>
            {surah_order}. {name_latin} ∘{' '}
            <Text style={{color: colors.primary}}>Ayat {order}</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AyahDetail;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 32,
    },
    content: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    translation: {
      ...fonts.p,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 20,
    },
    surah: {
      ...fonts.small,
      color: colors.text,
    },
  });
};
