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

const UpdateService = ({route, navigation}) => {
  const {service} = route.params;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBlOTg4MmE2YmIxMDgxOWVlNWRiOTkiLCJpYXQiOjE3MTY0Mjg2NTQsImV4cCI6MTcxNjY4Nzg1NH0.-ffSoQXhpkQVEq54WUEQvc2jOXiPXAfiV06O2mFFLzU';
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price);
  const [id, setid] = useState(service._id);
  const handleSubmit = () => {
    if (!name || !price) {
      Alert.alert('Validation', 'Please enter all fields');
      return;
    }

    const updatedData = {
      name: name,
      price: price,
    };

    axios
      .put(
        `https://kami-backend-5rs0.onrender.com/services/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
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
      <Text style={styles.label}>Service Name *</Text>
      <TextInput
        placeholder="Enter service name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={{fontWeight: 'bold'}}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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

export default UpdateService;
