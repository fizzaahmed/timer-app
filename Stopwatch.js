import React, { useState, useRef, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList }  
    from 'react-native'; 

const timestamp = {
    minutes: 0,
    seconds: 0,
    milliseconds: 0
}
  
const Stopwatch = ({runnerName, startExternally, onDelete}) => { 
    // State and refs to manage time and stopwatch status 
    const [time, setTime] = useState(0); 
    const [minutes, setMinutes] = useState(0); 
    const [seconds, setSeconds] = useState(0); 
    const [centiseconds, setCentiseconds] = useState(0); 
    //const [timestamp, setTimeStamp] = useState({minutes: 0, seconds: 0, milliseconds: 0});
    const [running, setRunning] = useState(false);
    const [lapTimes, setLapTimes] = useState([]);
    const [haveLapTimes, setHaveLapTimes] = useState(false); 
    const intervalRef = useRef(null); 
    const startTimeRef = useRef({minutes: 0, seconds: 0, milliseconds: 0});
    const LAPTIME_HEIGHT = 10; 

    useEffect(() => {
        if (startExternally) {
            startStopwatch();
        }
    }, [startExternally]);

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
            setCentiseconds((thisTime - thisMinutes * 6000) - thisSeconds * 100);
        }, 10); // changing from  1000 to 10 to change interval every centisecond
        setRunning(true); 
    }; 
    // Function to pause the stopwatch 
    const pauseStopwatch = () => { 
        clearInterval(intervalRef.current); 
        setRunning(false);
    }; 

    // Function to lap the stopwatch
    const lapStopwatch = () => {
        const currentTime = minutes + ":" + seconds + ":" + centiseconds;
        if (lapTimes.length == 0){
            setLapTimes([currentTime]);
        }
        else {
            const combinedTimes = lapTimes.concat([currentTime])
            setLapTimes(combinedTimes);
        }    
        setHaveLapTimes(true);
    };

    // Function to reset the stopwatch 
    const resetStopwatch = () => { 
        clearInterval(intervalRef.current); 
        setTime(0); 
        setMinutes(0);
        setSeconds(0);
        setCentiseconds(0);
        setRunning(false); 
        setLapTimes([]);
        setHaveLapTimes(false);
    }; 
    // Function to resume the stopwatch 
    const resumeStopwatch = () => {
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
            setCentiseconds((thisTime - thisMinutes * 6000) - thisSeconds * 100);
        }, 10); // changing from  1000 to 10 to change interval every centisecond
        setRunning(true);  
    }; 
  
    return ( 
        <View style={styles.container}>
            <View style={styles.runnerTimeContainer}>  
                <Text>Runner: {runnerName}</Text> 
                <Text style={styles.timeText}>{minutes}:{seconds}:{centiseconds}</Text>
            </View>
            <View style={styles.lapTimesContainer}>
                {haveLapTimes ? (
                <FlatList
                data={lapTimes}
                getItemLayout={(laptime, index) => (
                    {length: LAPTIME_HEIGHT, offset: LAPTIME_HEIGHT * index, index}
                  )}
                keyExtractor={(laptime, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                    <Text style={styles.laptime}>Lap {index + 1}: {item.toString()}</Text>
                    </View>
                )}
                />)
                :
                (<></>)
                }
            </View>
            
            <View style={styles.buttonContainer}> 
                {running ? ( 
                    <>
                    <TouchableOpacity 
                        style={[styles.button, styles.pauseButton]} 
                        onPress={pauseStopwatch} 
                    > 
                        <Text style={styles.buttonText}>Pause</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity 
                    style={[styles.button, styles.lapButton]} 
                    onPress={lapStopwatch} 
                    > 
                    <Text style={styles.buttonText}>Lap</Text> 
                    </TouchableOpacity>
                    </>
                    
                ) : ( 
                    <> 
                        <TouchableOpacity 
                            style={[styles.button, styles.startButton]} 
                            onPress={startStopwatch} 
                        > 
                            <Text style={styles.buttonText}>Start</Text> 
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.button, styles.resetButton]} 
                            onPress={resetStopwatch} 
                        > 
                            <Text style={styles.buttonText}> 
                                Reset 
                            </Text> 
                        </TouchableOpacity> 
                    </> 
                )} 
                {!running && ( 
                    <TouchableOpacity 
                        style={[styles.button, styles.resumeButton]} 
                        onPress={resumeStopwatch} 
                    > 
                        <Text style={styles.buttonText}> 
                            Resume 
                        </Text> 
                    </TouchableOpacity> 
                )}
                            {/* Delete Button */}
            <TouchableOpacity 
                style={[styles.button, styles.deleteButton]} 
                onPress={onDelete} 
            > 
                <Text style={styles.buttonText}>Delete</Text> 
            </TouchableOpacity>  
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
}); 
  
export default Stopwatch;
