import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Dimensions} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import CharacterSelector from '../../modules/CharacterSelector'; // Adjust path as needed
import { useDailyReward } from '../../modules/DailyReward';
import Title from '../../images/Logos/Denwa_Petto.png'; // Update to require
import OrangeButton from '../../images/OrangeBttn2.png'; // Update to require
import backgroundImage from '../../images/Backgrounds/background.gif'; // Update to require
import { Audio } from 'expo-av';
import { playSFX } from '../../modules/playSFX';

const window = Dimensions.get('window');
const HomeScreen = () => {
    useFocusEffect(
        React.useCallback(() => {
          // The screen is focused, handle the sound here
          const soundObject = new Audio.Sound();
          let isActive = true;
    
          const playSound = async () => {
            if (isActive) {
              try {
                await soundObject.loadAsync(require('../../assets/music/home.mp3'), { shouldPlay: true, isLooping: true });
                await soundObject.playAsync();
              } catch (error) {
                console.error('Error playing the sound:', error);
              }
            }
          };
    
          playSound();
    
          return () => {
            // Unload sound when the screen is blurred (navigated away)
            isActive = false;
            soundObject.unloadAsync();
          };
        }, [])
      );

    // const { soundLoaded } = useSound(require('../../assets/sfx/steps.wav'),{ shouldPlay: true, isLooping: true });
    const navigation = useNavigation();
    const { handleLogin } = useDailyReward(); // Destructure the handleLogin function from the hook
    
    // Call handleLogin when the component mounts to check for daily reward
    useEffect(() => {
        handleLogin();
    }, []);


    const handlePress = async (route) => {
        await playSFX(require('../../assets/sfx/button-pressed.mp3'));
        navigation.navigate(route); // Then navigate to the specified route
    };

    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.centeredContainer}>
            <Image source={Title} style={styles.titleText} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('PetHouse')}>
                <Text style={styles.buttonText}>Main Game</Text>
                <Image source={OrangeButton} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('TinderSwipePage')}>
                <Text style={styles.buttonText}>Story Mode</Text>
                <Image source={OrangeButton} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('CombatModeScreen')}>
                <Text style={styles.buttonText}>Combat Mode</Text>
                <Image source={OrangeButton} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('StepTracker')}>
                <Text style={styles.buttonText}>Steps</Text>
                <Image source={OrangeButton} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>
            <CharacterSelector />
            </View>
        </ImageBackground>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        marginTop: window.height * 0.04,
        width: 275,
        height: 130,
        position: 'relative',
    },
    buttonContainer: {
        marginTop: window.height * 0.025,
        alignItems: 'center',
    },
    button: {
        width: window.width * 0.54,
        height: window.height * 0.078,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: window.height * 0.045, // increase spacing between buttons
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
    },
    buttonText: {
        fontFamily: 'NiceTango-K7XYo',
        fontSize: window.width * 0.065,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        color: 'white',
        zIndex: 997,
    },
    swiperSlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    gif: {
        width: window.width,
        height: window.height,
    },
    arrowButton: {
        width: window.width * 0.05,
        height: window.height * 0.05,
        aspectRatio: 1,
    },
    buttonImage: {
        position: 'absolute',
        transform: [{ scale: 0.2 }],
    },
    });

    export default HomeScreen;