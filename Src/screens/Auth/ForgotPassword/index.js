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

 const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleForgotPassword = () => {

        if(email){

     
        setLoading(true);
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                setLoading(false);
                Toaster({
                    Title: "Success",
                    description:"Password Reset Email Sent', 'Please check your email to reset your password.",
                    type: "success"
                })
                setEmail("")
                navigation.replace("SinginScreen")
             
            })
            .catch(error => {
                setLoading(false);
                Toaster({
                    Title: "Error",
                    description: error.message,
                    type: "danger",
                })
                // Alert.alert('Error', error.message);
            });
        }else{
            Toaster({
                Title: "Error",
                description: "Please Enter Email",
                type: "danger",
            })
        }
    };

    return (
        <View style={{ width: windowWidth, height: windowHeight }}>
            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.welcomeText}>Forgot Password</Text>
                    <Text style={[styles.labelStyling, { color: '#B9BABD', alignSelf: 'center', marginVertical: 10 }]}>Please Provide valid Email</Text>

                    {/* Email Input */}
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

                    {/* Forgot Password Button */}
                    <TouchableOpacity style={styles.loginBtn} onPress={handleForgotPassword}>
                        <Text style={styles.textLoginBtn}>Forgot Password</Text>
                    </TouchableOpacity>

                    {/* Loading indicator */}
                    {loading &&
                        <View style={{ width: windowWidth, height: windowHeight, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={{ marginTop: 5 }}>Please Wait...</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
};


export default ForgotPassword;

