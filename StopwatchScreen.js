import React, { useState, useRef } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Button, FlatList }  
    from 'react-native'; 
import Stopwatch from './Stopwatch.js';
import Runner from './Runner.js';

const timestamp = {
    minutes: Number,
    seconds: Number
}

const StopwatchScreen = (route) => {  
    const [runnerList, setRunnerList] = useState(route["route"]["params"]["runners"]);
    const [currentTime, setCurrentTime] = useState({minutes: 0, seconds: 0});
    const RUNNER_HEIGHT = 10; 

    const deleteRunner = (runnerName) => {
        const filteredRunners = runnerList.filter(runner => runner !== runnerName);
        setRunnerList(filteredRunners);
    };

     // Function to handle updating time data for each runner
     const updateTime = (minutes, seconds) => {
        setCurrentTime({ minutes, seconds });
    };

    return ( 
        <View style={styles.container}> 
            <Text style={styles.header}> 
                Stopwatch App
            </Text>
            <Stopwatch onTimeChange={(minutes, seconds) => updateTime(minutes, seconds)}/>
            <SafeAreaView style={{flex: 1}}>        
                <FlatList
                    data={runnerList}
                    getItemLayout={(item, index) => (
                        {length: RUNNER_HEIGHT, offset: RUNNER_HEIGHT * index, index}
                    )}
                    renderItem={({ item }) => (
                        <Runner runnerName={item} currentTime={currentTime} 
                        onDelete={() => deleteRunner(item)} />
                    )}
                />   
            </SafeAreaView>
        </View> 
    ); 
}; 
  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    header: { 
        fontSize: 30, 
        color: "green", 
        marginTop: 60,
    }, 
    subHeader: { 
        fontSize: 18, 
        marginBottom: 10, 
        color: "blue", 
    }, 
    timeText: { 
        fontSize: 48, 
    }, 
    buttonContainer: { 
        flexDirection: 'row', 
        marginTop: 20, 
    }, 
    button: { 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 5, 
        backgroundColor: '#2ecc71', 
        marginRight: 10, 
    },
    buttonText: { 
        color: 'white', 
        fontSize: 16, 
    }, 
    input: {
        margin: 15,
        padding: 5,
        height: 40,
        width: 200,
        borderColor: '#7a42f4',
        borderWidth: 1
     },
}); 
  
export default StopwatchScreen;
