
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/EvilIcons';
import { Image, View } from 'react-native';
import { colors as COLORS, colors } from '../../components';
import { CalculatorScreen, NotificationScreen, PhotoScreen, Profile, TextScreen } from '../../screens';



const Tab = createBottomTabNavigator();

function TabMenu() {
    return (
        <View style={{ backgroundColor: COLORS.White, flex: 1, padding: 3, marginBottom: 5, marginHorizontal: 3 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: colors.BorderColor,
                    tabBarStyle: { borderRadius: 20, backgroundColor: COLORS.PrimaryColor, },
                }}
            >
                <Tab.Screen name="Notifications" component={NotificationScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='notification' size={20} style={{ color: color }} />
                    ),
                }} />
                <Tab.Screen name="Photos" component={PhotoScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='tooltip-image-outline' size={20} style={{ color: color }} />
                        ),
                    }} />

                <Tab.Screen name="Notes" component={TextScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='note-edit' size={20} style={{ color: color }} />
                        ),
                    }} />
                <Tab.Screen name="Calculator" component={CalculatorScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='calculator-variant' size={20} style={{ color: color }} />
                        ),
                    }} />
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name='user' size={20} style={{ color: color }} />
                        ),
                    }} />
            </Tab.Navigator>
        </View>
    )
}

export const MainNavigator = () => {
    return (
        <TabMenu />
    )
}


