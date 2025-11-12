import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import { ActivityIndicator, Alert,  LogBox,  PermissionsAndroid } from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import RootNavigator from './src/routes/RootNavigator';
import {NativeBaseProvider} from 'native-base';
import messaging, {firebase} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Platform } from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {


  // useEffect(()=>{
  //   onDisplayNotification('title','Body')
  // },[])



  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: true,
      alert: true,
      badge: true,
    });

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
      // handle notification here
      const token = await messaging().getToken();
      console.warn('token: ', token);
      console.warn('token: ', token);
      // end handling notification
    }
  }


  async function onDisplayNotification(title_,body_) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'kuwaitiApp2025',
      name: 'Kuwaiti Delivery',
    });

    // Display a notification
    await notifee.displayNotification({
      title: title_,
      body: body_,
      soundName: 'default',
      importance: AndroidImportance.HIGH,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
            importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'kuwaitiApp2025',
        },
      },
    });
  }

  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
      }
    }

    //console.log(firebase);
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        //console.log('Authorization status:', authStatus);
      }
    } else {

      const hasPermission = await firebase.messaging().hasPermission();
      const authStatus = await messaging().requestPermission();
      //console.log('hasPermission status:', hasPermission);
      if (hasPermission) {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
         // console.log('Authorization status:', authStatus);
        } else {
          Alert.alert("POST NOTIFICATIONS REQUIRED");
        }
      } else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }
    }

  }



  useEffect(() => {
    checkApplicationPermission();
    async function showNotification(remoteMessage) {
      console.log('ssss',remoteMessage)
      let id = '5';
      // let name = 'SkDeliveryApp';
      let name = 'KuwaitiDeliveryApp';
      const channelId = await notifee.createChannel({
        id,
        name,
      });

      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
        },
      });
    }

      requestUserPermission();
      messaging().setBackgroundMessageHandler(showNotification);

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        try {
          console.log('============foreground notification', remoteMessage.notification);
          onDisplayNotification(remoteMessage.notification.title,remoteMessage.notification.body);
        } catch (err) { console.log(err) }
      });

      return unsubscribe;
  }, []);



  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
