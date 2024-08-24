import React, { useState, useRef } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Button, FlatList }  
    from 'react-native'; 
import Stopwatch from './Stopwatch.js';
import Runner from './Runner.js';

const App = () => {  
    const [numRunners, setNumRunners] = useState(0); 
    const [runners, setRunners] = useState([]);
    const [name, setName] = useState('');
    const [startAll, setStartAll] = useState(false);
    const RUNNER_HEIGHT = 10; 

    const addRunner = () => { 
        if (runners.length == 0){
            setRunners([name]);
        }
        else {
            const combinedNames = runners.concat([name])
            setRunners(combinedNames);
        }
        setNumRunners(runners.length);
    };

    const startAllStopwatches = () => {
        setStartAll(true);
        setTimeout(() => setStartAll(false), 100);  // reset after a short delay
    };

    const deleteRunner = (runnerName) => {
        const filteredRunners = runners.filter(runner => runner !== runnerName);
        setRunners(filteredRunners);
    };

    return ( 
        <View style={styles.container}> 
            <Text style={styles.header}> 
                Stopwatch App
            </Text>
            <Stopwatch />
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
            <SafeAreaView style={{flex: 1}}>        
                <FlatList
                    data={runners}
                    getItemLayout={(item, index) => (
                        {length: RUNNER_HEIGHT, offset: RUNNER_HEIGHT * index, index}
                    )}
                    renderItem={({ item }) => (
                        <Runner runnerName={item} 
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
  
export default App;
