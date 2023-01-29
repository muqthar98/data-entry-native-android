import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Screen/Home'
import AddUser from './Screen/AddUser'
import UpdateUser from './Screen/UpdateUser'

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App