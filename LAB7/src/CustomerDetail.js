import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';

export default function CustomerDetail() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerId = await AsyncStorage.getItem('customerID');

        if (customerId) {
          const response = await axios.get(
            `https://kami-backend-5rs0.onrender.com/customers/${customerId}`,
          );
          setCustomer(response.data);
        } else {
          setError('No customer ID found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.customerDetails}>
        <View style={styles.row}>
          <Text style={styles.id}>{item.id}</Text>
          <Text style={styles.date}>
            -{format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm')}-
          </Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.phone}>
            -{item.services.map(service => service.name).join('\n-')}
          </Text>
        </View>
        <View style={styles.loyaltyContainer}>
          <Text style={styles.loyalty}>{item.price} đ</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Customer Details</Text>
        <Text style={styles.text}>Name: {customer.name}</Text>
        <Text style={styles.text}>Phone: {customer.phone}</Text>
        <Text style={styles.text}>Total Spent: {customer.totalSpent}</Text>
        <Text style={styles.text}>Loyalty Status: {customer.loyalty}</Text>
        <Text style={styles.text}>
          Last Updated: {new Date(customer.updatedAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Transaction History</Text>
        <FlatList
          data={customer.transactions}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    padding: 14,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 2},
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E1ACAC',
  },
  value: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'normal', // Adjust as needed
  },
  id: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  phone: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'left',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  transaction: {
    marginBottom: 15,
  },
  services: {
    marginLeft: 10,
  },
  loyaltyContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loyalty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E1ACAC',
    textAlign: 'left',
  },
  date: {
    fontWeight: 'bold',
  },
  status: {color: '#E1ACAC', fontSize: 16, fontWeight: 'bold'},
});
