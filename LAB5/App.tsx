import 'react-native-gesture-handler';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/Login";
import Home from "./src/Home";
import AddService from "./src/AddService";
import ServiceDetail from "./src/ServiceDetails";
import UpdateService from "./src/UpdateService";

import Delete from './src/Delete';


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
      <Stack.Screen  name="Home" component={Home} 
      options={{
        title: 'My home',
        
      }}/>
        <Stack.Screen name="AddService" component={AddService} options={{
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
       
      </Stack.Navigator>
    </NavigationContainer>
    
    </GestureHandlerRootView>
    )
  };
