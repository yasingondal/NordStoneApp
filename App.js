
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { RootNavigator } from './Src/navigators';




 const App = () =>{
  return(
    <>

    {/* <View style={{flexDirection:'row',justifyContent:'space-around',padding:10,backgroundColor:colors.PrimaryColor}}>
      
      <Text style={{color:'white',fontWeight:'bold'}}>Hi, Muhammad Yaseen</Text>
      <View style={{flexDirection:'row'}}>
      <MaterialCommunityIcons name='logout' size={20} style={{ color: 'white' }} />
      <Text style={{fontStyle:'italic',color:'white'}}>Logout</Text>
      </View>
      
    </View>  */}
     <NavigationContainer>
      <RootNavigator />
      <FlashMessage duration={3000} />
    </NavigationContainer>
    </>
  )
}

export default App;