import React, { useState, useRef, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList }  
    from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // You can choose another icon set if preferred

  
const Stopwatch = ({onTimeChange}) => { 
    // State and refs to manage time and stopwatch status 
    const [time, setTime] = useState(0); 
    const [minutes, setMinutes] = useState(0); 
    const [seconds, setSeconds] = useState(0); 
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null); 
    const startTimeRef = useRef({minutes: 0, seconds: 0, milliseconds: 0});
    const sendTimeIntervalRef = useRef(null);

    useEffect(() => {
        if (onTimeChange) {
            onTimeChange(minutes, seconds);
        }
    }, [minutes, seconds]); // Trigger when minutes or seconds change

    // Function to start the stopwatch 
    const startStopwatch = () => { 
        // saving the start time in hundreths of a second
        startTimeRef.current = Date.now() - time * 10; 
        // what we are doing here. is running the set time function on an interval, and saving a reference to the interval so that we can stop the funciton when we pause/reset
        intervalRef.current = setInterval(() => {
            const thisTime =  Math.floor((Date.now() -  
            startTimeRef.current) / 10);
            setTime(thisTime);
            const thisMinutes = Math.floor(thisTime / 6000);
            setMinutes(thisMinutes);
            const thisSeconds = Math.floor((thisTime - thisMinutes * 6000) / 100);
            setSeconds(thisSeconds);
        }, 1000); // changing from  1000 to 10 to change interval every centisecond
        setRunning(true); 
    }; 
    // Function to pause the stopwatch : pause = stop
    const pauseStopwatch = () => { 
        clearInterval(intervalRef.current); 
        setRunning(false);
    }; 


    // Function to reset the stopwatch 
    const resetStopwatch = () => { 
        clearInterval(intervalRef.current); 
        setTime(0); 
        setMinutes(0);
        setSeconds(0);
        setRunning(false); 
    }; 
    const getTextFromTime = (time) => {
        if (time < 10){
            return "0" + time
        }
        else{
            return time
        }
    };
  
    return ( 
        <View style={styles.container}>
            <View style={styles.circleRow}>
                <View style={styles.circle}>
                    <Text style={styles.timeText}>{getTextFromTime(minutes)}:{getTextFromTime(seconds)}</Text> 
                </View>
            </View>
            <View style={styles.buttonContainer}> 
            {running ? (
                <>
            <TouchableOpacity 
                style={[styles.button, styles.pauseButton]} 
                onPress={pauseStopwatch} 
            > 
            <Icon name={'square'} size={40} color="#000" />
            </TouchableOpacity>  
            <TouchableOpacity 
                style={[styles.button, styles.resetButton]} 
                            onPress={resetStopwatch} 
            > 
            <Icon name={'rotate-ccw'} size={40} color="#000" />
            </TouchableOpacity>
                </>
             ) : (
                <>
            <TouchableOpacity 
                style={[styles.button, styles.startButton]} 
                onPress={startStopwatch} 
             > 
                <Icon name={'play'} size={40} color="#000" /> 
            </TouchableOpacity> 
            <TouchableOpacity 
                style={[styles.button, styles.resetButton]} 
                            onPress={resetStopwatch} 
            > 
            <Icon name={'rotate-ccw'} size={40} color="#000" />
            </TouchableOpacity> 
                </>

             ) }
            
            </View>

        </View> 
    ); 
}; 
  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
    }, 
    header: { 
        fontSize: 30, 
        color: "green", 
        marginBottom: 10, 
    }, 
    subHeader: { 
        fontSize: 18, 
        marginBottom: 10, 
        color: "blue", 
        justifyContent: 'left', 
        alignItems: 'left', 
    }, 
    buttonContainer: { 
        flexDirection: 'row', 
        marginTop: 20, 
        justifyContent: 'right', 
        alignItems: 'right', 
    },
    runnerTimeContainer: {
        flexDirection: 'row',
        marginTop: 20, 
        justifyContent: 'space-between', // Distribute space between elements
        width: '80%', // Ensure the container takes full width
    },
    lapTimesContainer: {
        flexShrink: 1
    }, 
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      index: {
        marginRight: 10,
        fontWeight: 'bold',
      },
      laptimeT: {
        flex: 1,
      },
    timeText: { 
        fontSize: 24,
    }, 
    button: { 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 5, 
    }, 
    startButton: { 
        backgroundColor: '#2ecc71', 
        marginRight: 10, 
    }, 
    resetButton: { 
        backgroundColor: '#e74c3c', 
        marginRight: 10, 
    }, 
    pauseButton: { 
        backgroundColor: '#f39c12', 
        marginRight: 10,
    }, 
    resumeButton: { 
        backgroundColor: '#3498db', 
    },
    lapButton: { 
        backgroundColor: '#40E0D0', 
        marginLeft: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        marginLeft: 10,
        padding: 10,
    },
    buttonText: { 
        color: 'white', 
        fontSize: 16, 
    },
    circleRow: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 150, // Circle's diameter
        height: 150, // Circle's diameter
        borderRadius: 75, // Half of the width/height to make it circular
        borderColor: 'black',
        borderWidth: 3, // Border width,
        justifyContent: 'center',
        alignItems: 'center',
      }, 
}); 
  
export default Stopwatch;
