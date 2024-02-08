import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { windowHeight, windowWidth } from '../../utils/constants/Constants';
import PushNotification from 'react-native-push-notification';

// Configure notification channel
PushNotification.createChannel(
  {
    channelId: "default-channel-id", // Change this to your desired channel ID
    channelName: "Default channel",
    channelDescription: "A default channel for app notifications",
    soundName: "default",
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`Channel created: ${created}`),
);

export const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: "default-channel-id", 
      title: "New Notification",
      message: "This is a test notification",
    });
    setNotifications([...notifications, { id: notifications.length + 1, title: "New Notification", date: new Date().toLocaleDateString() }]);
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Icon name="notifications" size={20} color="#0098d9" />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={sendNotification} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Send Notification</Text>
      </TouchableOpacity>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    padding: 10,
  },
  notificationText: {
    paddingRight: 5,
    flex: 1,
  },
  notificationTitle: {
    alignItems: 'center',
    marginStart: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  notificationDate: {
    alignItems: 'center',
    marginStart: 8,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

