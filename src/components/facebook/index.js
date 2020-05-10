import React from 'react';

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {Button, TextButton} from './styles';

function FacebookButton() {
  const getResponseInfo = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.tron.log('dasidoiajs', result);

      alert(JSON.stringify(result));
      // this.setState({ user_name: 'Welcome' + ' ' + result.name });
      // this.setState({ token: 'User Token: ' + ' ' + result.id });
      // this.setState({ profile_pic: result.picture.data.url });
    }
  };

  const signIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        alert('Login cancelado');
      } else {
        try {
          const data = await AccessToken.getCurrentAccessToken();

          console.tron.log('data', data);

          const processRequest = new GraphRequest(
            '/me?fields=name,picture.type(large)',
            null,
            getResponseInfo,
          );

          new GraphRequestManager().addRequest(processRequest).start();
        } catch (error) {}
      }
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  return (
    <Button onPress={signIn}>
      <TextButton>Entrar com Facebook</TextButton>
    </Button>
  );
}

export default FacebookButton;
