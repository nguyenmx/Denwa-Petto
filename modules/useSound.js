import { useEffect, useState, useRef } from 'react';
import { Audio } from 'expo-av';

export const useSound = (soundFile, options = { shouldPlay, isLooping}) => {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const soundObject = useRef(new Audio.Sound()).current;

  useEffect(() => {
    const handlePlay = async () => {
      if (soundLoaded) {
        try {
          await soundObject.replayAsync();
        } catch (error) {
          console.error('Error replaying the sound:', error);
        }
      } else {
        try {
          await soundObject.loadAsync(soundFile, options);
          await soundObject.playAsync();
          setSoundLoaded(true);
        } catch (error) {
          console.error('Error loading or playing the sound:', error);
        }
      }
    };

    handlePlay();

    return () => {
      if (soundLoaded) {
        soundObject.unloadAsync();
      }
    };
  }, [soundLoaded]);

  return { soundLoaded };
};