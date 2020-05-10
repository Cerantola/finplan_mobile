import React, {useEffect} from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {Button, TextButton} from './styles';

export default function Google() {
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.tron.log(error);
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      console.tron.log('User Info --> ', userInfo);
    } catch (error) {
      console.tron.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.tron.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.tron.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.tron.log('Play Services Not Available or Outdated');
      } else {
        console.tron.log('Some Other Error Happened');
      }
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.tron.log('User Info --> ', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.tron.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.tron.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (isSignedIn) {
      alert('User is already signed in');
      getCurrentUserInfo();
    } else {
      console.tron.log('Please Login');
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:
        '1026222133431-egfdmlaotlr9vulr86b300elsfb2n7m9.apps.googleusercontent.com',
    });

    isSignedIn();
  }, []);

  return (
    <Button onPress={signIn}>
      <TextButton>Entrar com Google</TextButton>
    </Button>
  );
}
