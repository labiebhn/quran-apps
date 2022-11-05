import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '@react-navigation/native';

import {CardSurah} from '../../../../components/cards';
import {SURAH} from '../../../../database';
import {sortSurahData} from '../../../../utils/mapping';

const SurahList = ({navigation}: any) => {
  const styles = useStyles();
  const surah: any = SURAH;
  return (
    <View style={styles.safeArea}>
      <FlatList
        data={sortSurahData(SURAH)}
        contentContainerStyle={styles.content}
        keyExtractor={(item, index) => index?.toString()}
        initialNumToRender={20}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        onEndReachedThreshold={2}
        renderItem={({item, index}) => {
          const data: any = surah?.[item]?.[index + 1];
          return (
            <View style={styles.list}>
              <CardSurah
                order={data?.number}
                title={data?.name_latin}
                description={`${data?.number_of_ayah} Ayat`}
                arabicTitle={data?.name}
                onPress={() =>
                  navigation.navigate('surah-detail', {
                    key: item,
                    order: data?.number,
                  })
                }
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default SurahList;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: useSafeAreaInsets().top,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    content: {
      flexGrow: 1,
      padding: 16,
    },
    list: {
      paddingVertical: 10,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
  });
};
