
import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';


import { windowHeight, windowWidth } from '../../../utils/constants/Constants';
import { useNavigation } from '@react-navigation/native';



 const LandingScreen = () => {

    const navigation = useNavigation()

    return (

        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <ImageBackground style={{ width: windowWidth, height: windowHeight }}
                resizeMode='cover'
                source={require('../../../assets/images/Background.png')}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>

                    <Image
                        source={require('../../../assets/images/image9.png')}
                        style={{ height: windowHeight / 5.8, width: windowWidth / 3.5, resizeMode: 'cover', borderRadius: 30, marginStart: -30, marginRight: 10 }}
                    />

                    <Image
                        source={require('../../../assets/images/image11.png')}
                        style={{ height: windowHeight / 5.8, width: windowWidth / 3.5, resizeMode: 'cover', borderRadius: 30, marginRight: 10 }}
                    />

                    <Image
                        source={require('../../../assets/images/image8.png')}
                        style={{ height: windowHeight / 5.8, width: windowWidth / 3.5, resizeMode: 'cover', borderRadius: 30, marginRight: 10 }}
                    />

                    <Image
                        source={require('../../../assets/images/image12.png')}
                        style={{ height: windowHeight / 5.8, width: windowWidth / 5, resizeMode: 'center', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, marginRight: 10, opacity: .5, }}
                    />

                </View>


                <View style={{ flexDirection: 'row', marginTop: 20 }}>

                    <Image
                        source={require('../../../assets/images/image6.png')}
                        style={{ height: windowHeight / 5.8, resizeMode: 'cover', borderRadius: 30, marginStart: -30, marginRight: 10 }}
                    />

                    <Image
                        source={require('../../../assets/images/image10.png')}
                        style={{ height: windowHeight / 5.8, width: windowWidth / 3.2, resizeMode: 'cover', borderRadius: 30, marginRight: 10 }}
                    />

                    <Image
                        source={require('../../../assets/images/image3.png')}
                        style={{ height: windowHeight / 5.8, width: windowWidth / 3.2, resizeMode: 'cover', borderRadius: 30, marginRight: 10 }}
                    />

                    <Image
                        source={require('../../../assets/images/image7.png')}
                        style={{ height: windowHeight / 5.8, width: windowWidth / 3.2, resizeMode: 'center', borderRadius: 30, marginRight: 10, opacity: .7, }}
                    />

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 30, color: 'rgba(255, 255, 255, 1)', }}>
                        Nordstone Gallery
                    </Text>

                </View>

                <View style={{ marginTop: 30, alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SingupScreen');

                        }}
                        style={{ backgroundColor: '#fff', width: '70%', borderRadius: 30, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Image
                                source={require('../../../assets/images/ic_firebasee.png')}
                                style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            />
                            <View style={{ height: 'auto', width: 1, backgroundColor: '#F4F4F4' }} />
                            <Text style={{ color: 'rgba(25, 30, 49, 1)', fontSize: 14 }}>Sign up Firebase</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '70%', borderRadius: 30, padding: 15, marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Image
                                source={require('../../../assets/images/Apple.png')}
                                style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            />
                            <View style={{ height: 'auto', width: 1, backgroundColor: '#F4F4F4' }} />
                            <Text style={{ color: 'rgba(25, 30, 49, 1)', fontSize: 14 }}>Comming Soon...</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#fff', width: '70%', borderRadius: 30, padding: 15, marginTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Image
                                source={require('../../../assets/images/Email.png')}
                                style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            />
                            <View style={{ height: 'auto', width: 1, backgroundColor: '#F4F4F4' }} />
                            <Text style={{ color: 'rgba(25, 30, 49, 1)', fontSize: 14 }}>Comming Soon...</Text>
                        </View>

                    </TouchableOpacity>


                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SigninScreen');
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold', marginStart: 5 }}>Sign In</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>
                        By registering, you confirm that you accept our
                    </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 3 }}>
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold', marginStart: 5 }}>Terms of Use</Text>
                        <Text style={{ fontSize: 12, color: '#fff' }}> and</Text>
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold', marginStart: 5 }}>Privacy Policy</Text>
                    </View>
                </View>

            </ImageBackground>
        </View>

    );
};


export default LandingScreen;



