import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {shallowEqual} from 'react-redux';

import {useTheme} from '@react-navigation/native';

import {CardAyah} from '../../../../components/cards';
import {Gap, Navbar} from '../../../../components/layouts';
import {ModalRecitation} from '../../../../components/modals';
import {SURAH} from '../../../../database';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {sortSurahData} from '../../../../utils/mapping';
import {getSurahRecitation} from '../../store/surahThunk';

const SurahDetail = ({navigation, route}: any) => {
  const styles = useStyles();
  const language = 'id';
  const {order} = route.params;
  const surah: any = SURAH;
  const data = surah?.[`surah${order}`]?.[order] || null;
  const dispatch = useAppDispatch();
  const recitation = useAppSelector(
    state => state.surah.recitation,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getSurahRecitation(order));
  }, [order]);

  return data ? (
    <View style={styles.safeArea}>
      <Navbar title={data?.name_latin} />
      <FlatList
        data={sortSurahData(data?.text)}
        keyExtractor={(item, index) => index?.toString()}
        ListFooterComponent={<Gap height={106} />}
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
      <ModalRecitation surah={data} />
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
