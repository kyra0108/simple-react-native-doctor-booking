import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import {BookingDetailData} from '../model/BookingDetail';
import {UserData} from '../model/UserData';
import {setMainConcern} from '../redux/actions';
import {IProps} from '../redux/reducer';
import {State} from '../redux/store';
import {BOOKINF_DETAILS, USER_DATA} from '../utils/Constant';
import GlobalStyle from '../utils/GlobalStyle';
import SQLite from 'react-native-sqlite-storage';
import {AppointmentStackParam} from './MainMenu';
type Props = NativeStackScreenProps<AppointmentStackParam, 'BookingDetail'>;

const BookingDetail = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetailData[]>([]);
  const [mainConcern, setMainConcern] = useState('');
  useEffect(() => {
    getUserData();
    getData();
  });
  const data: IProps = useSelector((state: State) => state.bookingReducer);

  const getUserData = () => {
    try {
      AsyncStorage.getItem(USER_DATA).then(value => {
        if (value != null) {
          let userData: UserData = JSON.parse(value);
          if (userData.name != name) {
            setName(userData.name);
          }
          if (userData.email != email) {
            setEmail(userData.email);
          }
          if (userData.contactNumber != null) {
            setContactNo(userData.contactNumber);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    try {
      AsyncStorage.getItem(BOOKINF_DETAILS).then(value => {
        if (value != null) {
          const data: BookingDetailData[] = JSON.parse(value);
          setBookingDetails(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={GlobalStyle.header}>Booking Details:</Text>
      <View style={[styles.card, {marginTop: 10}]}>
        <Text style={GlobalStyle.subheader}>{data.service?.name}</Text>
        <View style={styles.form}>
          <Text style={styles.title}>Name: </Text>
          <Text style={styles.detail}>{name}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Contact No: </Text>
          <Text style={styles.detail}>{contactNo}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Email: </Text>
          <Text style={styles.detail}>{email}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Date: </Text>
          <Text style={styles.detail}>{data.dateTime?.date}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Time: </Text>
          <Text style={styles.detail}>{data.dateTime?.time?.time}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Doctor: </Text>
          <Text style={styles.detail}>{data.doctor?.name}</Text>
        </View>
      </View>
      <Text style={[GlobalStyle.subheader, {marginTop: 10}]}>Main Concern</Text>
      <TextInput
        multiline
        numberOfLines={5}
        style={[GlobalStyle.card, styles.textInput]}
        placeholder="Eg: headache for week, stomachache..."
        placeholderTextColor={'#d0d0d0'}
        onChangeText={value => setMainConcern(value)}
      />

      <Pressable
        style={{alignItems: 'center'}}
        onPress={async () => {
          if (mainConcern.trim().length == 0) {
            Alert.alert('Warning', 'Please key in your main concern');
          } else {
            let bookingData: BookingDetailData = {
              userData: {name: name, email: email, contactNumber: contactNo},
              mainConcern: mainConcern,
              service: data.service,
              doctor: data.doctor,
              dateTime: data.dateTime,
            };

            try {
              let booking: BookingDetailData[] = bookingDetails;
              if (bookingDetails.length === 0) {
                booking.push(bookingData);
              } else {
                if (!booking.includes(bookingData)) {
                  booking.push(bookingData);
                }
              }
              let json = JSON.stringify(booking);
              await AsyncStorage.setItem(BOOKINF_DETAILS, json);
              Alert.alert('Success!', 'Your Appointment is success.');
              navigation.reset({index: 0, routes: [{name: 'Appointment'}]});
            } catch (error) {
              console.log(error);
            }
          }
        }}>
        <View style={[styles.button, GlobalStyle.shadow]}>
          <Text style={styles.buttonText}>Submit Appointment</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default BookingDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 40,
    backgroundColor: '#f0f0f0',
  },
  card: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    width: '35%',
    fontSize: 15,
    color: '#585858',
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 15,
    color: '#A9A9A9',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textInput: {
    color: 'black',
    marginTop: 10,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    paddingStart: 10,
    borderRadius: 10,
  },
  button: {
    width: '80%',
    marginTop: 20,
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 10,
    paddingBottom: 10,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#52bed1',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
  },
});
