import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {Time} from '../model/Time';
import GlobalStyle from '../utils/GlobalStyle';
import {setDateTime} from '../redux/actions';
import {DateTimeData} from '../model/DataTime';
import {IProps} from '../redux/reducer';
import {State} from '../redux/store';
import {AppointmentStackParam} from './MainMenu';
import CalendarPicker from 'react-native-calendar-picker';
import {BookingDetailData} from '../model/BookingDetail';
import {BOOKINF_DETAILS} from '../utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = NativeStackScreenProps<AppointmentStackParam, 'SelectDateTime'>;

const SelectDateTime = ({navigation}: Props) => {
  const data: IProps = useSelector((state: State) => state.bookingReducer);
  const dispatch = useDispatch();
  const [selectDay, setDay] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetailData[]>([]);
  const date = new Date();
  const maxDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7,
  );

  useEffect(() => {
    getData();
  }, []);

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
    <View style={style.container}>
      <Text style={GlobalStyle.header}>
        Select time to visit {data.doctor?.name}
      </Text>
      <CalendarPicker
        minDate={date}
        maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#87CEEB"
        selectedDayTextColor="#FFFFFF"
        onDateChange={selectedDate => {
          const selectedDates = new Date(selectedDate);
          setDay(
            `${selectedDates.getFullYear()}-${
              selectedDates.getMonth() + 1
            }-${selectedDates.getDate()}`,
          );
        }}
      />
      {selectDay.length !== 0 ? (
        <View>
          <Text style={[GlobalStyle.subheader, {marginTop: 20}]}>
            Slots Available
          </Text>
          <FlatList
            nestedScrollEnabled={true}
            numColumns={2}
            data={getTime(bookingDetails,data)}
            renderItem={item => (
              <Pressable
                style={{marginBottom: 2}}
                onPress={() => {
                  if (item.item.enable) {
                    let data: DateTimeData = {
                      date: selectDay,
                      time: item.item,
                    };
                    dispatch(setDateTime(data));
                    navigation.navigate('BookingDetail');
                  }
                }}>
                <View
                  style={[
                    GlobalStyle.card,
                    style.choosebtn,
                    {backgroundColor: item.item.enable ? '#87CEEB' : '#A9A9A9'},
                  ]}>
                  <Text>{item.item.time}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

export function getTime(bookingTime: BookingDetailData[], data: IProps) {
  console.log(JSON.stringify(bookingTime));
  const bookedTime = bookingTime
    .filter(value => value.doctor.id == data.doctor?.id)
    .map((val: BookingDetailData) => val.dateTime.time.timeInHour);
  let time: Time[] = [
    {id: 1, time: '10:00 am', enable: true, timeInHour: 10},
    {id: 2, time: '11:00 am', enable: true, timeInHour: 11},
    {id: 3, time: '12:00 pm', enable: true, timeInHour: 12},
    {id: 4, time: '1:00 pm', enable: true, timeInHour: 13},
    {id: 5, time: '2:00 pm', enable: true, timeInHour: 14},
    {id: 6, time: '3:00 pm', enable: true, timeInHour: 15},
    {id: 7, time: '4:00 pm', enable: true, timeInHour: 16},
    {id: 8, time: '5:00 pm', enable: true, timeInHour: 17},
    {id: 9, time: '6:00 pm', enable: true, timeInHour: 18},
    {id: 10, time: '7:00 pm', enable: true, timeInHour: 19},
  ];
  return time.map((time: Time) => {
    console.log(
      `time ${time.timeInHour} == ${JSON.stringify(
        bookedTime,
      )} == ${bookedTime.includes(time.timeInHour)}`,
    );
    time.enable = !bookedTime.includes(time.timeInHour);
    return time;
  });
}

const style = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
  },
  button: {
    margin: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 0.75,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },
  innerContainer: {
    width: '100%',
    paddingStart: 10,
    paddingEnd: 10,
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 170,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  choosebtn: {
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    paddingStart: 15,
    width: 100,

    paddingEnd: 15,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default SelectDateTime;
