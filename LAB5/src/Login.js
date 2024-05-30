import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Style from './Style.js';
import axios from 'axios';
import {useState} from 'react';
const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBlOTg4MmE2YmIxMDgxOWVlNWRiOTkiLCJpYXQiOjE3MTY0Mjg2NTQsImV4cCI6MTcxNjY4Nzg1NH0.-ffSoQXhpkQVEq54WUEQvc2jOXiPXAfiV06O2mFFLzU';

  const handleLogin = async () => {
    const postData = {
      phone: phone,
      password: password,
    };
    await axios
      .post('https://kami-backend-5rs0.onrender.com/auth', postData)
      .then(res => {
        console.log('Response', res.data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  };
  return (
    <ScrollView>
      <View style={Style.container}>
        <Text style={Style.title}>Login</Text>
        <TextInput
          style={Style.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={Style.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={Style.button} onPress={handleLogin}>
          <Text style={Style.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default LoginScreen;
