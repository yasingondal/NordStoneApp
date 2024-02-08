import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { colors } from '../../components';
import { DefaultTheme, Provider } from 'react-native-paper';

import { AuthNavigator, MainNavigator } from '..';
import SplashScreen from '../../screens/Auth/SplashScreen';



const Stack = createStackNavigator();
const theme = {
    ...DefaultTheme,
    // roundness: 10,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};
export const RootNavigator = () => {
    return (
        <Provider theme={theme}>
            <StatusBar
                backgroundColor={colors.PrimaryColor}
                barStyle={"light-content"}
            />
            <Stack.Navigator initialRouteName='SplashScreen'>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AuthNavigator" component={AuthNavigator} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </Provider>
    )
}