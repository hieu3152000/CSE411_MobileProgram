import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          'https://kami-backend-5rs0.onrender.com/customers',
        );

        setCustomers(response.data);
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
  const handlePress = async id => {
    await AsyncStorage.setItem('customerID', id);
    navigation.navigate('CustomerDetail');
  };
  const renderServiceItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item._id)}>
      <View style={styles.customerDetails}>
        <View style={styles.row}>
          <Text style={styles.label}>Customer: </Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone: </Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Money: </Text>
          <Text style={styles.totalSpent}>{item.totalSpent} đ</Text>
        </View>
      </View>
      <View style={styles.loyaltyContainer}>
        <Text style={styles.loyalty}>{item.loyalty}</Text>
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
  name: {
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
});

export default Customer;
