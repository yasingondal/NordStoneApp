//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/constants/Constants';
import { colors } from '../../components';

import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
export const Profile = ({ navigation }) => {

    const [email, setEmail] = useState('');


    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user_email');
            console.log('AsyncStorage cleared');
            navigation.replace('AuthNavigator');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    };


    useEffect(() => {
        fetchUserEmail();
    }, []);

    const fetchUserEmail = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('user_email');
            if (userEmail) {
                setEmail(userEmail);
            }
        } catch (error) {
            console.error('Error fetching user email from AsyncStorage:', error);
        }
    };


    return (

        <View style={{ flex: 1, }}>


            <ScrollView>
                <View style={{ flexDirection: 'row', marginTop: 20, marginStart: 10 }}>
                    <Image
                        source={require('../../assets/images/user.png')}
                        style={{ height: 60, width: 60, resizeMode: 'contain' }}
                    />
                    <View style={{ marginStart: 10, justifyContent: 'center' }}>
                        <Text style={{ color: colors.PrimaryColor, fontSize: 14, }}>{email ? email : ""}</Text>
                        <Text style={{ fontSize: 10, color: colors.PrimaryColor, marginTop: 5 }}>View Profile</Text>
                    </View>
                </View>


                <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 15, backgroundColor: colors.AshGrey, borderRadius: 18, justifyContent: 'center', marginTop: windowHeight / 18 }}>



                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Languages</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Audio Quality</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Send Feedback</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Clear Music Cache</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Privacy Policy</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Rate This App</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Get Help</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>About</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>FAQ’s</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', padding: 12, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, color: '#fff' }}>Delete My Data</Text>
                            <Image
                                source={require('../../assets/images/arrowright.png')}
                                style={{ height: 22, width: 22, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.10)', marginTop: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleLogout}
                        style={{ width: '100%', backgroundColor: 'red', borderRadius: 10, marginVertical: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 12 }}>
                            <Text style={{ fontSize: 14, color: '#fff', }}>Logout</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </View>

    )
}


