import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import {Service} from './model/service';
import BookingDetail from './screen/BookingDetail';
import Home from './screen/Appointment';
import Login from './screen/Login';
import SelectDoctorScreen from './screen/SelectDoctorSreen';
import SelectDateTime from './screen/SelectTime';
import {Store} from './redux/store';
import Profile from './screen/Profile';
import MainMenu from './screen/MainMenu';

const Stack = createNativeStackNavigator<RootStackParam>();

export type RootStackParam = {
  Login: undefined;
  MainMenu: undefined;
};

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainMenu"
            component={MainMenu}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
