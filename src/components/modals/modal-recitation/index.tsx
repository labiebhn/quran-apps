import React, {createRef, FC, useEffect, useState} from 'react';
import {BackHandler, Platform, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {shallowEqual} from 'react-redux';

import {useTheme} from '@react-navigation/native';

import {setSelectedRecitate} from '../../../modules/surah/store/surahSlice';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {CardRecitationType} from '../../../types/components';
import {fontFamily, fonts} from '../../../utils/fonts';
import {CardRecitation} from '../../cards';

export interface ModalRecitationProps {
  surah?: any;
  onRecitatePress?(subfolder?: string): void;
  onDownloadPress?(subfolder?: string): void;
}

export const modalRecitationRef = createRef<Modalize>();

const ModalRecitation: FC<ModalRecitationProps> = ({
  surah,
  onDownloadPress,
  onRecitatePress,
}) => {
  const HEADER_HEIGHT = 90;
  const {colors} = useTheme();
  const styles = useStyles();
  const {width, height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const recitation = useAppSelector(
    state => state.surah.recitation,
    shallowEqual,
  );
  const {data, loading, selectedRecitate} = recitation;

  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState('initial');

  useEffect(() => {
    const backAction = () => {
      if (position === 'top') {
        modalRecitationRef?.current?.open();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [position, modalRecitationRef]);

  useEffect(() => {
    setShowModal(true);
  }, [modalRecitationRef]);

  useEffect(() => {
    toggleModal();
  }, [showModal]);

  const toggleModal = () => {
    if (showModal) {
      modalRecitationRef.current?.open();
      modalRecitationRef.current?.open(); // Fix modal not show
    } else {
      modalRecitationRef.current?.close();
    }
  };

  const getCardRecitateType = (item?: any): CardRecitationType => {
    let result: CardRecitationType;
    if (loading === 'pending') {
      result = 'loading';
      return result;
    }
    if (typeof item?.isFileComplete === 'boolean') {
      result = !item.isFileComplete ? 'download' : undefined;
      return result;
    }
  };

  const handleSelectedRecitate = (item: any) => {
    dispatch(setSelectedRecitate(item));
  };

  return (
    <Modalize
      ref={modalRecitationRef}
      snapPoint={HEADER_HEIGHT}
      handlePosition={'inside'}
      onPositionChange={position => setPosition(position)}
      alwaysOpen={HEADER_HEIGHT}
      modalHeight={height / 2}
      overlayStyle={{backgroundColor: colors.overlay}}
      withOverlay={false}
      panGestureComponentEnabled={true}
      closeAnimationConfig={{
        timing: {duration: Platform.OS === 'android' ? 0 : 280},
        spring: {speed: 14, bounciness: 5},
      }}
      HeaderComponent={
        <>
          <View style={[styles.header, {height: HEADER_HEIGHT}]}>
            <View style={styles.info}>
              <Text style={styles.label}>
                {selectedRecitate?.name || 'Pilih Qori'}
              </Text>
              <Text style={styles.recitate}>{surah?.name_latin}</Text>
            </View>
          </View>
        </>
      }
      modalStyle={styles.modal}
      flatListProps={{
        data: data || [],
        contentContainerStyle: styles.container,
        keyExtractor: (item, index) => index?.toString(),
        scrollEventThrottle: 16,
        renderItem: ({item, index}) => {
          return (
            <View key={index?.toString()}>
              <CardRecitation
                title={item?.name}
                active={selectedRecitate?.subfolder === item?.subfolder}
                type={getCardRecitateType(item)}
                onDownloadPress={() => onDownloadPress?.(item?.subfolder)}
                onPress={() => handleSelectedRecitate(item)}
              />
            </View>
          );
        },
      }}
    />
  );
};

export default ModalRecitation;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.container,
      paddingBottom: useSafeAreaInsets().bottom,
    },
    modal: {
      borderWidth: Platform.OS === 'android' ? 1 : 0,
      borderColor: colors.border,
      elevation: colors.elevationMedium,
      shadowColor: '#00000038',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 4,
      backgroundColor: colors.container,
    },
    header: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    info: {
      flex: 1,
      marginRight: 16,
    },
    recitate: {
      ...fonts.h5,
      color: colors.text,
      fontFamily: fontFamily.Poppins.medium,
    },
    label: {
      ...fonts.label,
      color: colors.primary,
    },
  });
};
