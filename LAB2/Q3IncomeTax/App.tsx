/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import style from './style';



const App = () =>{
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState('');

  const calculateTax = () =>{
    const incomeAmmout = parseFloat(income);

    if (isNaN(incomeAmmout) || incomeAmmout < 0) {
      setTax('Invalid Income');
      return;
    }
    let taxAmout = 0;
    if (incomeAmmout <10000000) {
      taxAmout = incomeAmmout *0.1;
    }else if (incomeAmmout <= 50000000) {
      taxAmout = 10000000 *0.1+(incomeAmmout -50000000) *0.3;
    }
    setTax(`Income Tax: ${taxAmout.toFixed(2)}đ`);
  }
  return(
    <View style={style.container}>
      <Text style={style.title}>Tax Income Calculator</Text>
      <TextInput
      textAlign='right'
      style={style.input}
      placeholder='Enter your income'
      keyboardType='numeric'
      value='income'
      onChangeText={text => setIncome(text)}
      />
      <Button title='Calculate Tax' onPress={calculateTax}/>
      <Text style= {style.result}>{tax}</Text>
    </View>
  )
}


export default App;
