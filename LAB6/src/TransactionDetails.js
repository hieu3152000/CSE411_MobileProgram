import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {format} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionDetail = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const transactionId = await AsyncStorage.getItem('transactionId');
        const response = await axios.get(
          `https://kami-backend-5rs0.onrender.com/transactions/${transactionId}`,
        );
        setTransaction(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>No transaction details found.</Text>
      </View>
    );
  }

  const formattedDate = format(
    new Date(transaction.createdAt),
    'yyyy-MM-dd HH:mm',
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Transaction Code:</Text>
          <Text style={styles.value}>{transaction.id}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Customer:</Text>
          <Text style={styles.value}>{transaction.customer.name}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Create Time:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service List</Text>
        {transaction.services.map(service => (
          <View key={service._id} style={styles.serviceItem}>
            <Text style={styles.serviceName}>{service.name}</Text>

            <Text style={styles.serviceQuantity}>x{service.quantity}</Text>
            <Text style={styles.servicePrice}>{service.price} đ</Text>
          </View>
        ))}
        <View style={styles.totalPrice}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.totalValue}>
            {transaction.priceBeforePromotion} đ
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cost</Text>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Amount of money:</Text>
          <Text style={styles.servicePrice}>
            {transaction.priceBeforePromotion} đ
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Discount:</Text>
          <Text style={styles.servicePrice}>
            {transaction.priceBeforePromotion - transaction.price} đ
          </Text>
        </View>
        <View style={styles.totalPrice}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.totalValue}>{transaction.price} đ</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E1ACAC',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'normal', // Adjust as needed
  },
  serviceItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between', // Space out children evenly
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    paddingLeft: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceQuantity: {
    fontSize: 16,
    color: 'gray',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E1ACAC',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default TransactionDetail;
