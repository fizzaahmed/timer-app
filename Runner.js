import React, { useState, useRef, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button }  
    from 'react-native'; 
import { BorderlessButton } from 'react-native-gesture-handler';


const timestamp = {
    minutes: Number,
    seconds: Number
}

const Runner = ({runnerName, currentTime}) => { 
    const [name, setName] = useState(runnerName); 
    const [mile1, setmile1] = useState({minutes: 0, seconds: 0});
    const [hasMile1, setHasMile1] = useState(false);
    const [mile2, setmile2] = useState({minutes: 0, seconds: 0});
    const [hasMile2, setHasMile2] = useState(false);
    const [mile3, setmile3] = useState({minutes: 0, seconds: 0});
    const [hasMile3, setHasMile3] = useState(false);

    const getTextFromTime = (time) => {
        if (time < 10){
            return "0" + time
        }
        else{
            return time
        }
    };

    const setMile1Time = () => {
        if (!hasMile1) {
            setmile1(currentTime);
            setHasMile1(true);
        }
    };

    const setMile2Time = () => {
        if (!hasMile2){
            setmile2(currentTime);
            setHasMile2(true);
        }
        
    };
    const setMile3Time = () => {
        if (!hasMile3){
            setmile3(currentTime)
            setHasMile3(true);
        }
    };


    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      );


    return ( 
        <View style={styles.container}>
            <View style={styles.runnerRow}>
                <Text style={styles.runnerName}>{name}</Text>
                <View style={styles.mileButtonRow}>
                {hasMile1? (
                    <View style={styles.mileTimeBox}>
                        <Text style={styles.mileTime}>{getTextFromTime(mile1.minutes)}:{getTextFromTime(mile1.seconds)}</Text>
                    </View>
                ):(
                    <>
                    <TouchableOpacity 
                        style={[styles.mileButton]} 
                        onPress={setMile1Time}
                    >
                <Text style={styles.buttonText}>Mile 1</Text> 
                </TouchableOpacity>
                    </>
                )}
                
                {hasMile2? (
                    <View style={styles.mileTimeBox}>
                        <Text style={styles.mileTime}>{getTextFromTime(mile2.minutes)}:{getTextFromTime(mile2.seconds)}</Text>
                    </View>
                ):(
                    <>
                    <TouchableOpacity 
                    style={[styles.mileButton]}
                    onPress={setMile2Time}>
                        <Text style={styles.buttonText}>Mile 2</Text> 
                    </TouchableOpacity>
                    </>
                )}
                {hasMile3? (
                    <View style={styles.mileTimeBox}>
                        <Text style={styles.mileTime}>{getTextFromTime(mile3.minutes)}:{getTextFromTime(mile3.seconds)}</Text>
                    </View>
                ):(
                    <TouchableOpacity 
                        style={[styles.mileButton]}
                        onPress={setMile3Time} 
                    >
                <Text style={styles.buttonText}>Mile 3</Text> 
                </TouchableOpacity>
                )}
                

                </View>
                
            </View>
            
        </View>
    )

}; 

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
    },
    runnerRow: {
        flex: 1,
        flexDirection: 'row', 
        padding: 12,
        justifyContent: 'space-between', // Space between name and button group

    },
    runnerName: {
        flexShrink: 1,  // Shrinks text if too long
        fontSize: 16,
        marginTop: 4,
        paddingRight: 8,
        fontWeight: 'bold',
    },
    mileButtonRow: {
        flexDirection: 'row',  // Ensure the buttons are laid out horizontally
        alignItems: 'center',  // Align buttons vertically in the center
        justifyContent: 'flex-start', // Align buttons to the left side 
    },
    mileButton:{
        backgroundColor: '#841584',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderWidth:1,
        borderRadius: 5,
        borderColor: '#470b47',
    },
    buttonText:{
        color: 'white', 
        fontSize: 16, 
    },
    mileTimeBox:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderWidth:1,
        borderRadius: 5,
        borderColor: '#470b47',
    },
    mileTime:{
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginHorizontal: 5,
    }
});

export default Runner;