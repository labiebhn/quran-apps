import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '@react-navigation/native';

import {CardAyah} from '../../../../components/cards';
import {Navbar} from '../../../../components/layouts';
import {SURAH} from '../../../../database';
import {sortSurahData} from '../../../../utils/mapping';

const SurahDetail = ({navigation, route}: any) => {
  const styles = useStyles();
  const language = 'id';
  const surah: any = SURAH;
  const data = surah?.[route?.params?.key]?.[route?.params?.order] || null;
  return data ? (
    <View style={styles.safeArea}>
      <Navbar title={data?.name_latin} />
      <FlatList
        data={sortSurahData(data?.text)}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={({item, index}) => {
          const payload = {
            surah_order: route?.params?.order,
            name: data?.name,
            name_latin: data?.name_latin,
            number_of_ayah: data?.number_of_ayah,
            order: item,
            ayah: data?.text?.[item],
            translation: data?.translations?.[language]?.text?.[item],
          };
          return (
            <CardAyah
              {...payload}
              zebra={index % 2}
              onPress={() => navigation.navigate('ayah-detail', payload)}
            />
          );
        }}
      />
    </View>
  ) : (
    <View />
  );
};

export default SurahDetail;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: useSafeAreaInsets().top,
    },
    container: {
      flex: 1,
    },
  });
};
