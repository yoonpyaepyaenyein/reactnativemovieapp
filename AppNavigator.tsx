import {View, Text, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabNavigator from './src/navigation/tab/HomeTabNavigator';
import NoInternetScreen from './src/components/noInternet/NoInternetScreen';
import withNetworkSubscription from './src/utils/noDetection/withNetworkSubscription';
import {LoadingModal} from './src/components/modal/loadingModal';
import SplashScreen from 'react-native-splash-screen';
import {getFcmToken, registerListenerWithFCM} from './src/utils/firebase';
// import AuthenticatedNavigator from './src/navigation/stack/AuthenticatedNavigator';

const AppNavigator = () => {
  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <HomeTabNavigator />
      <NoInternetScreen />
      <LoadingModal />
    </NavigationContainer>
  );
};

export default withNetworkSubscription(AppNavigator);
