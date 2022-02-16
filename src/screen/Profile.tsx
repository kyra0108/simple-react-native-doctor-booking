import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import {MainMenuStackParam} from './MainMenu';
import {UserData} from '../model/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BOOKINF_DETAILS, USER_DATA} from '../utils/Constant';
import SQLite from 'react-native-sqlite-storage';
import BookingDetail from './BookingDetail';
import {BookingDetailData} from '../model/BookingDetail';
const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
type Props = NativeStackNavigationProp<MainMenuStackParam, 'Profile'>;
const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetailData[]>([]);
  useEffect(() => {
    getUserData();
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem(BOOKINF_DETAILS).then(value => {
        if (value != null) {
          const data: BookingDetailData[] = JSON.parse(value);
          console.log(data);
          setBookingDetails(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <View style={styles.container}>
      <Text style={[GlobalStyle.header]}>Profile</Text>
      <View>
        <View style={[styles.card, {marginTop: 10}]}>
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
        </View>
      </View>
      <View>
        <Text style={[GlobalStyle.subheader, {marginTop: 10}]}>
          Upcoming Appointments
        </Text>
        <FlatList
          data={bookingDetails}
          renderItem={value => (
            <View style={[styles.card, {marginTop: 10}]}>
              <Text style={GlobalStyle.subheader}>
                {value.item.service?.name}
              </Text>
              <View style={styles.form}>
                <Text style={styles.title}>Date: </Text>
                <Text style={styles.detail}>{value.item.dateTime?.date}</Text>
              </View>
              <View style={styles.form}>
                <Text style={styles.title}>Time: </Text>
                <Text style={styles.detail}>
                  {value.item.dateTime?.time?.time}
                </Text>
              </View>
              <View style={styles.form}>
                <Text style={styles.title}>Doctor: </Text>
                <Text style={styles.detail}>{value.item.doctor?.name}</Text>
              </View>
              <View style={styles.form}>
                <Text style={styles.title}>Main Concern: </Text>
                <Text style={styles.detail}>{value.item.mainConcern}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#F0F0F0',
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
});
