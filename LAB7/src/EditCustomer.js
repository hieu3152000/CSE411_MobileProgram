import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const EditCustomer = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBlOTg4MmE2YmIxMDgxOWVlNWRiOTkiLCJpYXQiOjE3MTY0Mjg2NTQsImV4cCI6MTcxNjY4Nzg1NH0.-ffSoQXhpkQVEq54WUEQvc2jOXiPXAfiV06O2mFFLzU';
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const handleSubmit = () => {
    if (!name || !price) {
      Alert.alert('Validation', 'Please enter all fields');
      return;
    }

    const serviceData = {
      customer: customer,
      phone: phone,
    };

    axios
      .post('https://kami-backend-5rs0.onrender.com/customer', serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        Alert.alert('Success', 'Service added successfully');
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to add service');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer Name *</Text>
      <TextInput
        placeholder="Enter customer name"
        value={customer}
        onChangeText={setCustomer}
        style={styles.input}
      />

      <Text style={styles.label}>Phone *</Text>
      <TextInput
        placeholder="Enter phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={{fontWeight: 'bold'}}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  addButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1ACAC',
    borderRadius: 12,
  },
});

export default EditCustomer;
