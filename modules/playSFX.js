import { Audio } from 'expo-av';

export const playSFX = async (soundFile) => {
  const soundObject = new Audio.Sound();
  
  if (soundObject._loaded) {
    try {
      await soundObject.replayAsync();
    } catch (error) {
      console.error('Error replaying the sound:', error);
    }
  } else {
    try {
      await soundObject.loadAsync(soundFile);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error loading or playing the sound:', error);
    }
  }
};