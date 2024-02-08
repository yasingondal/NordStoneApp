
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { windowHeight, windowWidth } from '../../../utils/constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = () => {

  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('')




  const fetchUserEmail = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('user_email');

      console.log("email is ", userEmail)


      setTimeout(() => {
        if (userEmail) {
          navigation.replace('MainNavigator');
        } else {
          navigation.replace('AuthNavigator');
        }

      }, 4000);


    } catch (error) {
      console.error('Error fetching user email from AsyncStorage:', error);
    }
  };






  useEffect(() => {
    fetchUserEmail();
  }, []);





  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ height: windowHeight, width: windowWidth }}
        resizeMode='cover'
        source={require('../../../assets/images/Background.png')}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ fontSize: 22, color: 'white', fontFamily: 'Roboto-Italic' }}>NordStone</Text>
        </View>

        <View style={{ width: windowWidth, flexDirection: 'row', position: 'absolute', bottom: windowHeight / 12, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Please wait...</Text>
          <ActivityIndicator size={18} color={'white'} />
        </View>

      </ImageBackground>
    </View>


  )
}

export default SplashScreen;

