import React, { useState, useRef } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Button, FlatList }  
    from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stopwatch from './Stopwatch.js';
import Runner from './Runner.js';
import Welcome from './Welcome.js';
import StopwatchScreen from './StopwatchScreen.js';

const App = () => {  
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Stopwatch" component={StopwatchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}; 


export default App;
  
