import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ReferenceDataContext } from '../components/ReferenceDataContext';
import { SplashScreen } from 'expo';
import { PanResponder } from 'react-native';
import LeftArrow from '../images/LeftArrow.png';
import RightArrow from '../images/RightArrow.png';
import { Audio } from 'expo-av';

const window = Dimensions.get('window');

const CharacterSelector = ({ navigation }) => {
  const { selectedDuck, setSelectedDuck } = useContext(ReferenceDataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState(null); // State to keep track of the sound object

  const petSprites = [
    { name: 'Quacky', image: require('../images/PlayableAnimals/duckWave.gif'), cry: require('../assets/sfx/duck-default.wav') },
    { name: 'Stabbo', image: require('../images/PlayableAnimals/capyKnife.gif'), cry: require('../assets/sfx/capybara-default.wav') },
    { name: 'Rizzy', image: require('../images/PlayableAnimals/duckRizz.gif'), cry: require('../assets/sfx/duck-default.wav')},
    { name: 'Sippy', image: require('../images/PlayableAnimals/duckCoffee.gif'), cry: require('../assets/sfx/duck-default.wav')},
    { name: 'Ducky', image: require('../images/PlayableAnimals/ducky.gif'), cry: require('../assets/sfx/duck-default.wav')},
    { name: 'CrowBro', image: require('../images/PlayableAnimals/simpleBird.gif'), cry: require('../assets/sfx/crowbro/crow-default.wav')},
    { name: 'Squiddy', image: require('../images/PlayableAnimals/simpleSquid.gif'), cry: require('../assets/sfx/squiddy/octo.mp3') },
  ];

    // Play sound when the selected animal changes
    useEffect(() => {
      async function playSound() {
        // Stop any previously playing sound
        if (sound) {
          await sound.unloadAsync();
          setSound(null);
        }
          
        // Check if the selected animal has a cry
        const selectedPet = petSprites[selectedDuck];
        if (selectedPet.cry) {
          const { sound: newSound } = await Audio.Sound.createAsync(selectedPet.cry);
          setSound(newSound);
          await newSound.playAsync(); // Play the sound
        }
      }
  
      playSound(); // Call the function to play the sound on animal change
  
      return () => {
        // Cleanup: unload the sound when the component unmounts or when the effect is re-triggered
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [selectedDuck]); // Trigger the effect when the selectedDuck changes

  const handleSwipeLeft = () => {
    // Move to the next character
    setSelectedDuck((prevDuck) => (prevDuck + 1) % petSprites.length);
  };

  const handleSwipeRight = () => {
    setSelectedDuck((prevDuck) => prevDuck === 0 ? petSprites.length - 1 : prevDuck - 1
    );
  };

  useEffect(() => {
    async function getSelectedDuck() {

      try {
        const value = await AsyncStorage.getItem('selectedDuck');
        if (value !== null) {
          setSelectedDuck(parseInt(value, 10));
        }
      } catch (error) {
        console.error('Error getting selectedDuck from AsyncStorage:', error);
      }
    }
  
    getSelectedDuck();

    async function prepare() {
      // await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectDuck = (index) => {
    setSelectedDuck(index);
    closeModal();
  };  

  const handleLongPress = () => {
    // Disable long press while modal is open
    if (!modalVisible) {
      openModal();
    }
  };
  
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.centeredContainer}>
        
        {/* Left Arrow */}
        <TouchableOpacity onPress={handleSwipeLeft}>
          <Image source={LeftArrow} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLongPress}>
          <View style={styles.swiperContainer}>
            <Image source={petSprites[selectedDuck].image} style={styles.petImage} />
          </View>
        </TouchableOpacity>

         {/* Right Arrow */}
         <TouchableOpacity onPress={handleSwipeRight}>
          <Image source={RightArrow} style={styles.arrow} />
        </TouchableOpacity>

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Character Selector</Text>
              <ScrollView contentContainerStyle={styles.scrollViewContent} indicatorStyle="black">
                {petSprites.map((pet, index) => (
                  <TouchableOpacity key={index} onPress={() => selectDuck(index)}>
                    <View style={styles.modalItem}>
                      <Image source={pet.image} style={styles.modalItemImage} />
                      <Text style={styles.modalItemName}>{pet.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  swiperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  petImage: {
    width: window.width * 0.6, 
    height: window.height * 0.3,
    resizeMode: 'contain'
  },
  petName: {
    fontSize: 16,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: window.height * 0.6,
    width: window.width * 0.9,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 70,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalItem: {
    width: '100%', // Adjust width as needed
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 0,
  },
  modalItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  modalItemName: {
    fontSize: 14,
    marginTop: 5,
  },
  arrow: {
    width: window.width * 0.05,
    height: window.height * 0.05,
    aspectRatio: 1,
  },
});

export default CharacterSelector;
