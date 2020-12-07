import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import CreateUsersScreen from "./Screen/CreateUsersScreen.js"
import UsersDetailsScreen from "./Screen/UsersDetailsScreen.js"
import UsersList from "./Screen/UsersList.js"


const Stack = createStackNavigator()

function MyStack (){
  return (
    <Stack.Navigator>
      <Stack.Screen name = "UsersList" component = {UsersList}/>
      <Stack.Screen name = "CreateUsersScreen" component = {CreateUsersScreen}/>
      <Stack.Screen name = "UsersDetailsScreen" component = {UsersDetailsScreen}/>
    </Stack.Navigator>

    )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
