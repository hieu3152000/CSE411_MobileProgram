import 'react-native-gesture-handler';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/Login";
import Home from "./src/Home";
import AddService from "./src/AddService";
import ServiceDetail from "./src/ServiceDetails";
import UpdateService from "./src/UpdateService";

import Delete from './src/Delete';
import Transaction from './src/Transaction';
import TransactionDetail from './src/TransactionDetails';
import AddCustomer from './src/AddCustomer';
import Customer from './src/Customer';
import CustomerDetail from './src/CustomerDetail';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import { Text, View } from 'react-native';
import EditCustomer from './src/EditCustomer';

const Stack = createNativeStackNavigator();
const navigation =useNavigation();
export default App =()=>{
 
  return(
<MenuProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
   
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E1ACAC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen  name="Customer" component={Customer} 
      options={{
        title: 'Customer',
        
      }}/>
      <Stack.Screen  name="CustomerDetail" component={CustomerDetail} 
      options={{
        title: 'Customer Detail',
        headerRight: () => (
          <Menu>
            <MenuTrigger>
              <Icon name="more-vert" size={25} color="#fff" />
            </MenuTrigger>
            <MenuOptions>
            <MenuOption onSelect={()=>navigation.navigate("EditCustomer")}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Icon name="edit" size={20} color="#000" style={{ marginRight: 10 }} />
              <Text>Edit</Text>
            </View>
          </MenuOption>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          <MenuOption>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Icon name="delete" size={20} color="#000" style={{ marginRight: 10 }} />
              <Text>Delete</Text>
            </View>
          </MenuOption>
              
            </MenuOptions>
          </Menu>
        ),
        
      }}/>
      <Stack.Screen  name="EditCustomer" component={EditCustomer} 
      options={{
        title: 'Customer',
        
      }}/>
        {/* <Stack.Screen name="AddService" component={AddService} options={{
        title: 'Service',
       
      }} />
      
         <Stack.Screen
              name="ServiceDetail"
              component={ServiceDetail}
              options={{
                title: 'Service Details',
               
              }}
            />
      <Stack.Screen name="UpdateService" component={UpdateService} options={{
        title: 'Update Service',
        
      }} />
       <Stack.Screen  name="Add customer" component={AddCustomer} 
      options={{
        title: 'My home',
        
      }}/>
        <Stack.Screen name="Customer" component={Customer} options={{
        title: 'Customer',
       
      }} />
       <Stack.Screen
              name="Transaction" component={Transaction} options={{
                title: 'Transaction',
               
              }}
            />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} options={{
        title: 'Transaction Detail',
        
      }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    
    </GestureHandlerRootView>
  </MenuProvider>
    )
  };
