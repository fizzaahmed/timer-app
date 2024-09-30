import React, { useState, useRef, useEffect } from 'react'; 
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Button }  
from 'react-native'; 
import StopwatchScreen from './StopwatchScreen';

const Welcome = ({ navigation }) => {  
    const [runners, setRunners] = useState([]);
    const [name, setName] = useState('');


    const addRunner = () => { 
        if (runners.length == 0){
            setRunners([name]);
        }
        else {
            const combinedNames = runners.concat([name])
            setRunners(combinedNames);
        }
        setName("")
    };

    const clearRunners = () => {
        setRunners([])
    };

    return (
        <View style={styles.container}> 
        <TextInput
                style={styles.input}
                placeholder="Add new runner!"
                onChangeText={newText => setName(newText)}
                defaultValue={name}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={addRunner}
                title="Add"
                color="#841584">
                <Text style={styles.buttonText}>Add</Text> 
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Stopwatch', {runners}, console.log(runners))}
                title="Add"
                color="#841584">
                <Text style={styles.buttonText}>Start Session</Text> 
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <Text style={styles.todaysRunnersText}>Today's Runners: </Text>
            <FlatList
                    data={runners}
                    renderItem={({ item }) => (
                        <View style={styles.runnerItem}>
                            <Text style={styles.runnerName}>{item}</Text>
                        </View>
                    )}
                />
            <TouchableOpacity
                 style={styles.button}
                title="Add"
                color="#841584"
                onPress={clearRunners}>
                <Text>Clear Runner List</Text>
            </TouchableOpacity>
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
        marginTop: 10,
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
        borderColor: 'black',
        borderWidth: 1
     },
     todaysRunnersText:{
        margin: 15,
        fontSize: 20,
     },
     runnerItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ffffff',  // White background for the name item
        borderRadius: 8,
        elevation: 3,  // Adds subtle shadow on Android
        shadowColor: '#000',  // Adds shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
     },
     runnerName: {
        fontSize: 18,
        color: '#333',  // Darker text color for contrast
        textAlign: 'center',  // Center-align the name text
     },
     horizontalLine:{
        width: '100%',     // Full width of the parent container
        height: 1,         // Height of the line
        backgroundColor: '#000',  // Line color
        marginTop: 30,  // Spacing around the line
     }
}); 
  

export default Welcome;
