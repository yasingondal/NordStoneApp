
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';
import { windowHeight, windowWidth } from '../../../utils/constants/Constants';
import { Toaster } from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SigninScreenn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();


  const handleSignIn = async () => {

    try {
      if (!email || !password) {
        Toaster({
          Title: "Error",
          description: "Email and password are required",
          type: "danger",
        })
      } else {
        setLoading(true);
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await saveUserDataToAsyncStorage(email);
        setLoading(false);
        setEmail("")
        setPassword("")
        navigation.replace('MainNavigator');
      }

    } catch (error) {
      setLoading(false);
      Toaster({
        Title: "Error",
        description: error.message,
        type: "danger",
      })
    }
  };

  const saveUserDataToAsyncStorage = async (email) => {
    try {
      await AsyncStorage.setItem('user_email', email);
      console.log('User email saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving user email to AsyncStorage:', error);
    }
  };

  return (
    <View style={{ width: windowWidth, height: windowHeight }}>
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={[styles.labelStyling, { color: '#B9BABD', alignSelf: 'center', marginVertical: 10 }]}>Sign in to your account</Text>

          <View>
            <Text style={styles.labelStyling}>Email</Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                placeholder='Enter your email here!'
                placeholderTextColor={'#B7BFCC'}
                style={styles.inputFieldStyling}
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View>
            <Text style={styles.labelStyling}>Password</Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={'#B7BFCC'}
                style={styles.inputFieldStyling}
                autoCapitalize='none'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleSignIn} style={styles.loginBtn}>
            <Text style={styles.textLoginBtn}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgotPassword")
            }}
            style={{ alignItems: 'center', marginTop: 5 }}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>

          {loading &&
            <View style={{ width: windowWidth, height: windowHeight, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={{ marginTop: 5 }}>Please Wait...</Text>
            </View>
          }

        </View>
      </ScrollView>
    </View>
  )
}

export default SigninScreenn;
