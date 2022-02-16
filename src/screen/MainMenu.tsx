import {
  NavigationContainer,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import BookingDetail from './BookingDetail';
import Appointment from './Appointment';
import Home from './Appointment';
import SelectDoctorScreen from './SelectDoctorSreen';
import SelectDateTime from './SelectTime';
import Profile from './Profile';
import ProfileIcon from '../icons/ProfileIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppointmentIcon from '../icons/AppointmentIcon';
const AppointmentStack = createNativeStackNavigator<AppointmentStackParam>();
const Nav = createBottomTabNavigator<MainMenuStackParam>();

export type MainMenuStackParam = {
  Profile: undefined;
  AppointmentStack: NavigatorScreenParams<AppointmentStackParam>;
};

export type AppointmentStackParam = {
  Appointment: undefined;
  SelectDoctor: undefined;
  SelectDateTime: undefined;
  BookingDetail: undefined;
};
const AppointmentScreenStack = () => {
  return (
    <AppointmentStack.Navigator>
      <AppointmentStack.Screen
        name="Appointment"
        component={Appointment}
        options={{headerShown: false}}
      />
      <AppointmentStack.Screen
        name="SelectDoctor"
        component={SelectDoctorScreen}
        options={{headerShown: true, headerTitle: 'Select Doctor'}}
      />
      <AppointmentStack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{headerShown: true, headerTitle: 'Select Date and Time'}}
      />
      <AppointmentStack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{headerShown: true, headerTitle: 'Booking Detail'}}
      />
    </AppointmentStack.Navigator>
  );
};

export function getIsTabBarShown(
  route: RouteProp<MainMenuStackParam, 'AppointmentStack'>,
) {
  console.log(JSON.stringify(route))
  return true
}

const MainMenu = () => {
  return (
    <Nav.Navigator>
      <Nav.Screen
        name="AppointmentStack"
        component={AppointmentScreenStack}
        options={({route}) => ({
          tabBarLabel: 'Appointment',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AppointmentIcon color={color} size={size} />
          ),
        })}
      />
      <Nav.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Nav.Navigator>
  );
};

export default MainMenu;
