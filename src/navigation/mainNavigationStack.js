import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteScreen from '../screens/NoteScreen/components/noteScreen';

const Stack = createNativeStackNavigator();

const MainNavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NoteScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationStack;
