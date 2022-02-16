import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackHeaderProps,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {RootStackParam} from '../App';
import {UserData} from '../model/UserData';
import {USER_DATA} from '../utils/Constant';
import GlobalStyle from '../utils/GlobalStyle';

type Props = NativeStackScreenProps<RootStackParam, 'Login'>;

const Login = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem(USER_DATA).then(value => {
        if (value != null) {
          navigation.replace('MainMenu');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validateEmail = () => {
    var emailReg =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return emailReg.test(email);
  };

  const validatePhone = () => {
    return phoneInput.current?.isValidNumber(phoneNumber) ?? false;
  };

  const onPress = async () => {
    if (name.trim().length > 2 && validateEmail() && validatePhone()) {
      try {
        const userData: UserData = {
          name: name,
          email: email,
          contactNumber: fullPhoneNumber,
        };
        await AsyncStorage.setItem(USER_DATA, JSON.stringify(userData));
      } catch (error) {
        console.log(error);
      }
      navigation.replace('MainMenu');
    } else {
      if (name.trim().length < 2) {
        Alert.alert('Warning', 'Please enter your name');
      } else if (!validateEmail()) {
        Alert.alert('Warning', 'Please enter valid email');
      } else if (!validatePhone()) {
        Alert.alert('Warning', 'Please enter valid phone number');
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center', paddingStart: 20, paddingEnd: 20}}>
        <View style={styles.innerContainer}>
          <Text style={styles.bigTitle}>Welcome Guest!</Text>
          <Text
            style={[
              styles.text,
              {marginTop: 25, width: '80%', textAlign: 'center'},
            ]}>
            Please enter your name and personal details. ^^
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 20}}>
          <TextInput
            style={[GlobalStyle.card, styles.textInput]}
            placeholder="Enter Your name"
            onChangeText={value => setName(value)}
            placeholderTextColor={'#d0d0d0'}
          />
          <TextInput
            keyboardType="email-address"
            style={[GlobalStyle.card, styles.textInput, {marginTop: 10}]}
            placeholder="Enter Your Email"
            onChangeText={value => setEmail(value)}
            placeholderTextColor={'#d0d0d0'}
          />
          <PhoneInput
            containerStyle={[GlobalStyle.card, {marginTop: 10}]}
            ref={phoneInput}
            layout="second"
            onChangeFormattedText={value => setFullPhoneNumber(value)}
            onChangeText={value => {
              setPhoneNumber(value);
              console.log(`valid:${phoneInput.current?.isValidNumber(value)}`);
            }}
            defaultCode="MY"></PhoneInput>
        </View>

        <Pressable onPress={onPress}>
          <View style={[styles.button, GlobalStyle.shadow]}>
            <Text style={styles.buttonText}>Let's Start</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  bigTitle: {
    marginTop: 40,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  textInput: {
    height: 45,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingStart: 20,
    paddingEnd: 15,
  },
  button: {
    marginTop: 50,
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 10,
    height: 45,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: '#52bed1',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default Login;
