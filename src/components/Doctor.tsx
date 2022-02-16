import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';

interface IProps {
  name: string;
  image: any;
  onPress?: () => void;
}
const Doctor: React.FC<IProps> = ({name, image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[GlobalStyle.card, style.button]}>
        <Image style={style.image} source={image} />
        <Text
          style={[GlobalStyle.header, {textAlign: 'center', marginTop: 10}]}>
          {name ?? 'TCM Internal Medicine Treatment'}
        </Text>
        <Pressable style={{width: '75%'}} onPress={onPress}>
          <View style={style.choosebtn}>
            <Text style={[GlobalStyle.label, style.label]}>Choose</Text>
          </View>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default Doctor;
const style = StyleSheet.create({
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
