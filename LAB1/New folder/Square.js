import React from 'react';
import style from './style';
import {Alert, Button, Text, View} from 'react-native';
function ClickOnTheSquare(value) {
  Alert.alert(value);
}
export default Square = ({text}) => (
  <View style={[style.box, {backgroundColor: '#7ce0f9'}]}>
    <Text>{text}</Text>
    <Button title="Click" onPress={() => ClickOnTheSquare(text)}></Button>
  </View>
);
