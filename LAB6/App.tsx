import 'react-native-gesture-handler';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Customer from './src/Customer'
import AddCustomer from './src/AddCustomer';
import Transaction from './src/Transaction';
import TransactionDetail from './src/TransactionDetails';



const Stack = createNativeStackNavigator();

export default App =()=>{
 
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
   
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
        headerStyle: {
          backgroundColor: '#E1ACAC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* <Stack.Screen  name="Add customer" component={AddCustomer} 
      options={{
        title: 'My home',
        
      }}/>
        <Stack.Screen name="Customer" component={Customer} options={{
        title: 'Customer',
       
      }} /> */}
         <Stack.Screen
              name="Transaction" component={Transaction} options={{
                title: 'Transaction',
               
              }}
            />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} options={{
        title: 'Transaction Detail',
        
      }} />
       
      </Stack.Navigator>
    </NavigationContainer>
    
    </GestureHandlerRootView>   
    )
  };
