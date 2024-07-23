import React from 'react';
import { View, Image, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';

const CircleImageGallery = () => {
  const profiles = [
    { id: 1, name: 'Quaxly', age: 25, occupation: 'Professional Sleeper', bio: 'Are you a 2 cuz that\'s a 10 in binary', image: require('../../images/Backgrounds/forest_pfp.jpg'), animalType: require('../../images/PlayableAnimals/duckRizz.gif'), personality: 'Sporty', verified: false },
    { id: 2, name: 'Waddles', age: 21, occupation: 'Pond Ambassador', bio: 'Seeking someone for pond soirées', image: require('../../images/Backgrounds/duckPond.png'), animalType: require('../../images/PlayableAnimals/combatDuck.gif'), personality: 'Grumpy', verified: true },
    { id: 3, name: 'Floppers', age: 19, occupation: 'Divorce Attorney', bio: 'Willing to share my bread crumbs', image: require('../../images/Backgrounds/livingRoom.jpg'), animalType: require('../../images/PlayableAnimals/combatDuck2.gif'), personality: 'Smug', verified: true },
    // Add more profiles as needed...
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Conversations</Text> */}
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {profiles.map((profile) => (
          <View key={profile.id} style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              <Image source={profile.image} style={styles.backgroundImage} />
              <Image source={profile.animalType} style={styles.image} />
            </View>
            <Text style={styles.nameText}>{profile.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width,
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute', // Position this image behind the overlay image
    top: 0,
    left: 0,
  },
  nameText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});

export default CircleImageGallery;
