import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import axios from 'axios';

const Home = ({navigation}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [services]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/services',
      );
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderServiceItem = ({item}) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() =>
        navigation.navigate('ServiceDetail', {serviceId: item._id})
      }>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>{item.price} đ</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.serviceName}>Danh sách dịch vụ</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddService', {serviceId: services._id})
          }>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  servicePrice: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1ACAC',
    borderRadius: 18,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});
export default Home;
