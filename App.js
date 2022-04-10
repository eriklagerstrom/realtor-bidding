import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import { StatusBar} from 'react-native';
import Login from './screens/Login';
import RegisterUser from './screens/RegisterUser';
import LoggedInApp from './screens/LoggedInApp';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Login'
      options={{headerMode: 'float'}}>
        <Stack.Screen 
          name='Login'
          component={Login}
          options ={{
            headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen 
          name='RegisterUser'
          component={RegisterUser}
          options ={{
            headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen 
          name='LoggedInApp'
          component={LoggedInApp}
          options ={{
            headerShown: false}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
