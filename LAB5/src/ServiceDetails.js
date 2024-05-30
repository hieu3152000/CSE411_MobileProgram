import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ServiceDetail = ({route, navigation}) => {
  const {serviceId} = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `https://kami-backend-5rs0.onrender.com/services/${serviceId}`,
        );
        setService(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Service not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Service Name:</Text>
        <Text style={styles.text}>{service.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.text}>{service.price}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Creator:</Text>
        <Text style={styles.text}>{service.createdBy}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.text}>{service.createdAt}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Final Update:</Text>
        <Text style={styles.text}>{service.updatedAt}</Text>
      </View>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate('UpdateService', {service})}>
        <Text style={styles.updateButtonText}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  updateButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1ACAC',
    borderRadius: 12,
  },
});

export default ServiceDetail;
