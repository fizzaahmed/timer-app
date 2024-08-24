import React, { useState, useRef, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button }  
    from 'react-native'; 


const timestamp = {
    minutes: Number,
    seconds: Number
}

const Runner = ({runnerName}) => { 
    const [name, setName] = useState(runnerName); 
    const [mile1, setmile1] = useState({minutes: 0, seconds: 0});
    const [mile2, setmile2] = useState({minutes: 0, seconds: 0});
    const [mile3, setmile3] = useState({minutes: 0, seconds: 0});

    const setMile1Time = () => (
        setmile1({minutes: 0, seconds:0})
    );

    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      );


    return ( 
        <View style={styles.container}>
            <View style={styles.runnerRow}>
                <Text style={styles.runnerName}>{name}</Text>
                <TouchableOpacity 
                        style={[styles.mileButton]} 
                    >
                <Text style={styles.buttonText}>Mile 1</Text> 
                </TouchableOpacity>
                <TouchableOpacity 
                        style={[styles.mileButton]} 
                    >
                <Text style={styles.buttonText}>Mile 2</Text> 
                </TouchableOpacity>
                <TouchableOpacity 
                        style={[styles.mileButton]} 
                    >
                <Text style={styles.buttonText}>Mile 3</Text> 
                </TouchableOpacity>
            </View>
            
        </View>
    )

}; 

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
    },
    runnerRow: {
        flexDirection: 'row', 
        alignItems: 'left'
    },
    runnerName: {
        flexDirection: 'row', 
        fontSize: 18,
        justifyContent: 'left', 
    },
    mileButton:{
        flexDirection: 'row',
        backgroundColor: '#e74c3c',
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        borderRadius: 5, 
        marginLeft: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    buttonText:{
        color: 'white', 
        fontSize: 16, 
    }
});

export default Runner;