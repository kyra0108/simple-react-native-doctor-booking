import React from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';

interface IProps {
  name?: string;
  image: any;
  time?: string;
  onPress: () => void;
}

const MethodButton: React.FC<IProps> = ({
  name,
  image = require('../../assets/tcm1.jpg'),
  time = '1 hour',
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[GlobalStyle.card, style.button]}>
        <Image style={style.image} source={image} />
        <View style={style.innerContainer}>
          <Text style={[GlobalStyle.header, {textAlign: 'center'}]}>
            {name ?? 'TCM Internal Medicine Treatment'}
          </Text>
          <Text style={[GlobalStyle.label, {textAlign: 'center'}]}>{time}</Text>
        </View>
        <Pressable style={{width: '100%'}} onPress={onPress}>
          <View style={style.choosebtn}>
            <Text style={[GlobalStyle.label, style.label]}>Choose</Text>
          </View>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    margin: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 0.75,
    backgroundColor: 'white',
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
    width: '100%',
    height: 150,
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
    paddingEnd: 15,
    borderRadius: 10,
    backgroundColor: '#87CEEB',
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
  },
});

export default MethodButton;
