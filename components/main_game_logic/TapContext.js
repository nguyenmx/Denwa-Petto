import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { PanResponder, Image, TouchableOpacity } from 'react-native';
import hand from '../../images/hand.png';
import { useWindowDimensions, Dimensions } from 'react-native';
import { ReferenceDataContext } from '../../components/ReferenceDataContext';
import { playSFX } from '../../modules/playSFX';

const TapContext = createContext();

export const useTap = () => useContext(TapContext);


export const withTap = (WrappedComponent) => {
  return (props) => {
    const tapContext = useTap();
    return <WrappedComponent {...props} tapHandler={tapContext} />;
  };
};

export const TapProvider = ({ children}) => {
  const [tapCount, setTapCount] = useState(0);
  const tapThreshold = 15;
  const swipeTimeout = useRef(null);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const [showHandImage, setShowHandImage] = useState(false);
  const {selectedDuck} = useContext(ReferenceDataContext);
  const petSprites = [
    { name: 'Quacky', image: require('../../images/PlayableAnimals/duckWave.gif'), cry: require('../../assets/sfx/duck-default.wav') },
    { name: 'Stabbo', image: require('../../images/PlayableAnimals/capyKnife.gif'), cry: require('../../assets/sfx/capybara-default.wav') },
    { name: 'Rizzy', image: require('../../images/PlayableAnimals/duckRizz.gif'), cry: require('../../assets/sfx/duck-default.wav')},
    { name: 'Sippy', image: require('../../images/PlayableAnimals/duckCoffee.gif'), cry: require('../../assets/sfx/duck-default.wav')},
    { name: 'Ducky', image: require('../../images/PlayableAnimals/ducky.gif'), cry: require('../../assets/sfx/duck-default.wav')},
    { name: 'CrowBro', image: require('../../images/PlayableAnimals/simpleBird.gif'), cry: require('../../assets/sfx/crowbro/crow-default.wav')},
    { name: 'Squiddy', image: require('../../images/PlayableAnimals/simpleSquid.gif'), cry: require('../../assets/sfx/squiddy/octo.mp3') },
  ];
  const selectedPet = petSprites[selectedDuck];

  useEffect(() => {
    if (showHandImage) {
      const timeoutId = setTimeout(() => {
        setShowHandImage(false);
      }, 2000); // Adjust the duration

      return () => clearTimeout(timeoutId);
    }
  }, [showHandImage]);

  // const rubNoise = async () => {
  //   await playSFX(require('../../assets/sfx/ac-rub.mp3'));
  //   console.log('now play rubbing noise');
  // }

  const handleTap = () => {
    playSFX(selectedPet.cry);
    setTapCount((prevCount) => prevCount + 1);
    if (tapCount >= tapThreshold) {
      // console.log('You are tapping too much on the pet!');
      setTapCount(0);
      return true;
    } 
    else {
      setShowHandImage(false);
      //console.log('Duck tapped!');
      return false;
    }
  };
  const handleSwipe = (gestureState) => {
    if (!gestureState) {
      return;
    }
  
    setShowHandImage(true);
    // playSFX(require('../../assets/sfx/ac-rub.mp3'));
  
    // Update hand position
    setHandPosition({ x: gestureState.moveX, y: gestureState.moveY });
    clearTimeout(swipeTimeout.current);
  
    swipeTimeout.current = setTimeout(() => {
      setShowHandImage(false);
    }, 200);
   
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onPanResponderGrant: () => {
      //   rubNoise();  // Start playing the rubbing sound
      // },
      onPanResponderMove: () => handleSwipe,
      onPanResponderRelease: () => {
      setShowHandImage(false);
      },
    })
  ).current;

  return (
    <TapContext.Provider value={{ handleTap, handleSwipe, panResponder }}>
      {children}
      {showHandImage && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            //increasing the number subtracted will move the cursor to the left
            left: handPosition.x - 58,
            top: handPosition.y,
            zIndex: 1001
          }}
          onPress={() => setShowHandImage(false)}
          {...panResponder.panHandlers}
        >
          <Image source={hand} style={{ width: 80, height: 80 }} />
        </TouchableOpacity>
      )}
    </TapContext.Provider>
  );
};