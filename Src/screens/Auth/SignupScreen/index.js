// import liraries
import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { windowHeight, windowWidth } from '../../../utils/constants/Constants';
import styles from './Styles';
import { Toaster } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
 const SignupScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const handleSignUp = async () => {

        try {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!name) {
                Toaster({
                    Title: "Name Error",
                    description: "Please Enter Name",
                    type: "danger",
                })
            } else if (!emailRegex.test(email)) {
                Toaster({
                    Title: "Email Error",
                    description: "Please Provide Valid Email",
                    type: "danger",
                })
            } else if (!password) {
                Toaster({
                    Title: "Password Error",
                    description: "Please Enter Password",
                    type: "danger",
                })
            } else {
                setLoading(true);
                // Sign up user with email and password
                const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

                // Save user data to Firestore
                await firestore().collection('users').doc(user.uid).set({
                    name: name,
                    email: email,
                })

                await saveUserDataToAsyncStorage(email);

                setEmail("")
                setPassword("")
                setName("")


                navigation.replace('MainNavigator');


                Toaster({
                    Title: "Success",
                    description: "User Created Successfully",
                    type: "success",

                })


                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            console.log("error is :", error.message)
            Toaster({
                Title: "Signup Error",
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

        <ScrollView style={styles.container}>
            <ImageBackground style={{ width: windowWidth, height: windowHeight }}
                resizeMode='cover'
                source={require('../../../assets/images/Background.png')}>
                <View style={styles.innerContainer}>

 
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={[styles.labelStyling, { color: '#B9BABD', alignSelf: 'center', marginVertical: 10 }]}>Sign Up to your account</Text>

                    <View>
                        <Text style={styles.labelStyling}>Name</Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                placeholder='Enter your Name!'
                                placeholderTextColor={'#B7BFCC'}
                                style={styles.inputFieldStyling}
                                autoCapitalize='none'
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

     
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

                    <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
                        <Text style={styles.textLoginBtn}>Sign Up</Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:windowWidth}}>
                        <Text>Already registered? </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("SinginScreen")
                    }}
                    style={{alignItems:'center'}}>
                    <Text>Already, have an account?</Text>
                    </TouchableOpacity>
                    

           
                    {loading &&
                        <View style={{ width: windowWidth, height: windowHeight, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={{ marginTop: 5 }}>Please Wait...</Text>
                        </View>
                    }

      
                </View>
            </ImageBackground>
        </ScrollView>


    );
};


export default SignupScreen;



