import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MethodButton from '../components/MethodButton';
import GlobalStyle from '../utils/GlobalStyle';
import {Service} from '../model/service';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA} from '../utils/Constant';
import {useDispatch} from 'react-redux';
import {setService} from '../redux/actions';
import {UserData} from '../model/UserData';
import {AppointmentStackParam} from './MainMenu';

type Props = NativeStackScreenProps<AppointmentStackParam, 'Appointment'>;

const Appointment = ({navigation}) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      AsyncStorage.getItem(USER_DATA).then(value => {
        if (value != null) {
          let userData: UserData = JSON.parse(value);
          if (name !== userData.name) {
            setName(userData.name);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Appointment</Text>
      <Text style={styles.text}>Welcom {name}</Text>
      <View style={[GlobalStyle.card, styles.cardView]}>
        <Text style={[{fontWeight: 'bold'}, styles.text]}>
          NOW WHAT MAY WE HELP YOU?
        </Text>
        <FlatList
          data={generateData()}
          renderItem={item => (
            <MethodButton
              name={item.item.name}
              image={item.item.image}
              time={item.item.time}
              onPress={() => {
                dispatch(setService(item.item));
                navigation.navigate('SelectDoctor');
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export function generateData() {
  let data: Service[] = [
    {
      id: 1,
      name: 'TCM Internal Medicine Treatment',
      image: require('../../assets/tcm1.jpg'),
      time: '1 hour',
    },
    {
      id: 2,
      name: 'TCM Acupuncture Treatment',
      image: require('../../assets/tcm1.jpg'),
      time: '1 hour',
    },
    {
      id: 3,
      name: 'TCM Gynaecology Treatment',
      image: require('../../assets/tcm1.jpg'),
      time: '1 hour',
    },
    {
      id: 4,
      name: 'TCM Cosmetic Acupuncture',
      image: require('../../assets/tcm1.jpg'),
      time: '1 hour',
    },
    {
      id: 5,
      name: 'TCM Paediatric Treatment',
      image: require('../../assets/tcm1.jpg'),
      time: '1 hour',
    },
  ];
  return data;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-between',
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    paddingBottom: 10,
    color: '#585858',
  },
  cardView: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
  },
});
export default Appointment;
