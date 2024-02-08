import {useState , useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import LandingScreen from '../../screens/Auth/LandingScreen';
import SigninScreenn from '../../screens/Auth/SigninScreenn';
import SignupScreen from '../../screens/Auth/SignupScreen';
// import { ForgotPassword, LandingScreen,  SigninScreenn,  SignupScreen } from '../../screens';


const Stack = createStackNavigator();

export const AuthNavigator = () => {

    return (
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
      
        <Stack.Screen
          name="SingupScreen"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SigninScreen"
          component={SigninScreenn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
}
