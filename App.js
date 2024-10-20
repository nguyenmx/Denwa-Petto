import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NameScreen from './pages/main/NameScreen';
import HowToPlay from './pages/main/HowToPlay';
// import StoryModeScreen from './pages/story/StoryModeScreen';
import CombatModeScreen from './pages/combat/CombatModeScreen';
import StepTracker from './pages/steps/StepTracker';
import TestChatGPT from "./pages/story/TestChatGPT";
import { ReferenceDataContextProvider } from "./components/ReferenceDataContext";
import { useEffect} from 'react';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Home from './pages/home/HomeScreen';
import TestingScreen from './pages/combat/TestingScreen';
import WinScreen from './pages/combat/WinScreen';
import LossScreen from './pages/combat/LossScreen';
import BattleScreen from './pages/combat/BattleScreen';
import PetHouse from './pages/main/PetHouse';
import Title from './images/Logos/Denwa_Petto.png'
import { ReferenceDataContext } from './components/ReferenceDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpriteAnimation from './modules/SpriteAnimation';
import TinderPage from './pages/story/TinderSwipePage';
import Shop from './pages/main/Shop';
import ItemShop from './pages/main/ItemShop';
import Currency from './pages/main/Currency';
import ProfilePage from './pages/main/ProfilePage';
import { CurrencyProvider } from './components/main_game_logic/CurrencyContext';
import Inventory from './pages/main/Inventory';
import StepsConversion from './pages/combat/StepsConversion';
import FriendshipLevel from './components/main_game_logic/FriendshipLevel';
import { TasksProvider } from './components/main_game_logic/TasksContext';
import { Audio } from 'expo-av';
import CharacterSelector from './modules/CharacterSelector';
import { TapProvider } from './components/main_game_logic/TapContext';
import { useNavigation } from '@react-navigation/native';
//import { HealthProvider } from './modules/HealthContext';
import Slider from '@react-native-community/slider';
import PetProfile from './pages/main/PetProfile';
import { useDailyReward } from './modules/DailyReward';
import Achievements from './pages/main/Achievements';
import ChatBot from './components/story_logic/Chatbot';
import { useSound } from './modules/useSound';

//import {AppleHealthKit} from 'react-native-health';

const Stack = createStackNavigator();
const window = Dimensions.get('window');
const backgroundImage = require('./images/Backgrounds/background.gif');


export default function App() {
  const [fontsLoaded] = useFonts({
    "NiceTango-K7XYo": require("./assets/fonts/NiceTango-K7XYo.ttf"),
    "StayPixelRegular-EaOxl": require("./assets/fonts/StayPixelRegular-EaOxl.ttf"),
    "BowlbyOneSC-Regular": require("./assets/fonts/BowlbyOneSC-Regular.ttf"),
    "Gunkid-0W9yv": require("./assets/fonts/Gunkid-0W9yv.otf"),
  })

  useEffect(() => {
    async function getSelectedDuck() {
      try {
        const value = await AsyncStorage.getItem('selectedDuck');
        if (value !== null) {
          // Convert the retrieved value to a number
          saveSelectedDuck(parseInt(value, 10));
        }
      } catch (error) {
        console.error('Error getting selectedDuck from AsyncStorage:', error);
      }
    }
  
    getSelectedDuck();

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded){
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
      <ReferenceDataContextProvider>
        <TapProvider>
          <CurrencyProvider>
            <TasksProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name="Home" component={Home} options={{ headerTransparent: true, title: '' }}/>
                  <Stack.Screen name="NameScreen" component={NameScreen} options={{ headerShown: false }}/>
                  {/* <Stack.Screen name="StoryMode" component={StoryModeScreen} /> */}
                  <Stack.Screen name="CombatModeScreen" component={CombatModeScreen} options={{ headerShown: false }}/>
                  <Stack.Screen name="StepTracker" component={StepTracker} options={{ headerShown: false }}/>
                  <Stack.Screen name="Inventory" component={Inventory}/>
                  <Stack.Screen name="HowToPlay" component={HowToPlay} options={{ headerShown: false}}/>
                  <Stack.Screen name="TestingScreen" component={TestingScreen} options={{ headerShown: false }}/>
                  <Stack.Screen name="WinScreen" component={WinScreen} options={{ headerShown: false }}/>
                  <Stack.Screen name="LossScreen" component={LossScreen} options={{ headerShown: false }}/>
                  {/* <Stack.Screen name="StoryModeScreen" component={StoryModeScreen} options={{ headerShown: false }}/> */}
                  <Stack.Screen name="ChatBotScreen" component={ChatBot} options={{ headerShown: false }}/>
                  <Stack.Screen name="TestChatGPT" component={TestChatGPT} options={{ headerShown: false }}/>
                  <Stack.Screen name="BattleScreen" component={BattleScreen} options={{ headerShown: false}}/>
                  <Stack.Screen name="PetHouse" component={PetHouse} options={{ headerShown: false}}/>
                  <Stack.Screen name="SpriteAnimation" component={SpriteAnimation} />
                  <Stack.Screen name="Shop" component={Shop} options={{ headerShown: false}}/>
                  <Stack.Screen name="Currency" component={Currency} options={{ headerShown: false}}/>
                  <Stack.Screen name="TinderSwipePage" component={TinderPage} options={{ headerShown: false}} />
                  <Stack.Screen name="ItemShop" component={ItemShop} options={{ headerShown: false}} />
                  <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false}} />
                  <Stack.Screen name="StepsConversion" component={StepsConversion} options={{ headerShown: false}} />
                  <Stack.Screen name="FriendshipLevel" component={FriendshipLevel} options={{ headerShown: false}} />
                  <Stack.Screen name="PetProfile" component={PetProfile} options={{ headerShown: false}}/>
                </Stack.Navigator>
              </NavigationContainer>
            </TasksProvider>
          </CurrencyProvider>
        </TapProvider>
      </ReferenceDataContextProvider>
  );
}