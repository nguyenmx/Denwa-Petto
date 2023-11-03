import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import lvlUp from '../../images/themducks.png'

const window = Dimensions.get('window');

const MG = () => {

  const navigation = useNavigation(); // Get the navigation object

  return (
    <ImageBackground
      source={require('../../images/zkx9_iwg1_210415.jpg')}
      style={styles.backgroundImage}
    >
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={false}
        horizontal={true}
      >
        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>Slide 1</Text>
            <Image source={lvlUp} style={styles.lvlUp} />
            <Text style={styles.desc}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique id ipsum non tristique!</Text>
          </View>

        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>Slide 2</Text>
          </View>
        </View>

        <View style={styles.slide}>
          <View style={styles.slideInner}>
            <Text style={styles.text}>Slide 3</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PetHouse')}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>

      <View style={styles.overlay}>
        <Text style={styles.howToPlayText}>How to Play</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    
  },
  slide: {
    zIndex: 998,
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor : "#0000" 
  },
  slideInner: {
    width: '80%',
    height: '80%', 
    borderWidth: 10, 
    borderColor: 'rgba(156, 130, 176, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 232, 255, 0.8)',
    borderRadius: 20,
    elevation: 7,
  },
  backgroundImage: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  howToPlayText: {
    fontSize: window.width * 0.094,
    marginBottom: window.height * -0.83,
    color: 'white',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  lvlUp: {
    width:  500,
    height: 290,
    //borderWidth: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //top: window.height * -0.2,
    marginBottom: 20,

    //position: 'absolute',
    transform: [{ scale: .5 }]
  },
  text: {
    fontSize: window.width * 0.09,
    marginBottom: window.height * 0.83,
    top: window.height * -0.03,
    color: 'white',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    position: 'absolute',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  overlay: {
    position: 'absolute',
    top: window.height * -0.082,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    marginBottom: window.height * 0.83,
  },
  button: {
    backgroundColor: '#e9f1ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20, 
    borderWidth: 5, 
    borderColor: 'white',
    ShadowColor: 'rgba(0, 0, 0, 0.48)',
    ShadowOffset: { width: 1, height: 1 },
    ShadowRadius: 5,
    marginBottom: window.height * 0.35,
  },
  desc: {
    fontSize: window.width * 0.08,
    marginBottom: 20,
    top: -75,
    color: '#ffffff',
    fontFamily: 'NiceTango-K7XYo',
    textAlign: 'center', 
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonText: {
    color: '#91adfa',
    fontFamily: 'NiceTango-K7XYo',
  },
});

export default MG;
