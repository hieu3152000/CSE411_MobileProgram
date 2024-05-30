// CustomerScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          'https://kami-backend-5rs0.onrender.com/customers',
        );
        const json = await response.json();
        setCustomers(json);
        //await AsyncStorage.setItem('customers', JSON.stringify(json));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderServiceItem = ({item}) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.name}>Customer: </Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Phone: </Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Total Money: </Text>
        <Text style={styles.totalSpent}>{item.totalSpent} đ</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        renderItem={renderServiceItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    margin: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  phone: {
    color: 'gray',
    fontSize: 16,
  },
  totalSpent: {
    color: 'gray',
    fontSize: 16,
  },
});

export default Customer;
