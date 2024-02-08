/**
 * @format
 */

import { firebase } from '@react-native-firebase/app';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


const firebaseConfig = {
    apiKey: "AIzaSyApSEw4_lA1othlRnnqcPwKsTgGolX2nhs",
    // authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "nordstone-50e34",
    storageBucket: "nordstone-50e34.appspot.com",
    messagingSenderId: "71881931878",
    appId: "1:71881931878:android:0191baaa4057ed341d41a7",
    databaseURL: 'https ://databaseLink-default-rtdb.firebaseio.com/',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

AppRegistry.registerComponent(appName, () => App);
