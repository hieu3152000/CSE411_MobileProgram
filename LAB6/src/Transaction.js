// TransactionScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
const Transaction = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          'https://kami-backend-5rs0.onrender.com/transactions',
        );
        const json = await response.json();
        setTransactions(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getTransactionDetail = async transactionId => {
    await AsyncStorage.setItem('transactionId', transactionId);
    navigation.navigate('TransactionDetail');
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const renderServiceItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => getTransactionDetail(item._id)}>
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
            -{item.services.map(service => service.name).join('\n -')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer: </Text>
          <Text style={styles.phone}>{item.customer.name}</Text>
        </View>
      </View>
      <View style={styles.loyaltyContainer}>
        <Text style={styles.loyalty}>{item.price} đ</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
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
  customerDetails: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    margin: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  id: {
    fontSize: 18,
  },
  phone: {
    color: 'gray',
    fontSize: 16,
  },
  totalSpent: {
    color: '#E1ACAC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loyaltyContainer: {
    justifyContent: 'center',
  },
  loyalty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E1ACAC',
  },
  date: {
    fontWeight: 'bold',
  },
  status: {color: '#E1ACAC', fontSize: 16, fontWeight: 'bold'},
});

export default Transaction;
