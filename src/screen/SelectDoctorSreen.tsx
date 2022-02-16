import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {DoctorData} from '../model/DoctorData';

import Doctor from '../components/Doctor';
import GlobalStyle from '../utils/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {setDoctor} from '../redux/actions';
import {AppointmentStackParam} from './MainMenu';

type Props = NativeStackScreenProps<AppointmentStackParam, 'SelectDoctor'>;

const SelectDoctorScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={[GlobalStyle.header, {marginStart: 10}]}>
        Choose Your Prefer Doctor
      </Text>
      <FlatList
        style={{marginTop: 10}}
        data={getDoctorData()}
        renderItem={item => (
          <Doctor
            name={item.item.name}
            image={item.item.image}
            onPress={() => {
              dispatch(setDoctor(item.item));
              navigation.navigate('SelectDateTime');
            }}
          />
        )}
      />
    </View>
  );
};
export function getDoctorData() {
  let data: DoctorData[] = [
    {
      id: 1,
      name: 'Dr Lee Siew Mun',
      image: require('../../assets/drlee.png'),
    },
    {
      id: 2,
      name: 'Dr Chow Chee Yuan',
      image: require('../../assets/drchow.png'),
    },
    {
      id: 3,
      name: 'Dr Wong Kai Wee',
      image: require('../../assets/drwong.png'),
    },
    {
      id: 4,
      name: 'Dr Liew Chong Ren',
      image: require('../../assets/drliew.png'),
    },
  ];
  return data;
}
export default SelectDoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingStart: 20,
    paddingEnd: 20,
    backgroundColor: '#f0f0f0',
  },
});
