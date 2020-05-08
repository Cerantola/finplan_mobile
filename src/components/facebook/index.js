import React from 'react';
import {Text} from 'react-native';
import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

// import { Container } from './styles';

function FacebookButton() {
  const getResponseInfo = (error, result) => {
    if (error) {
      //Alert for the Error
      alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      console.tron.log('dasidoiajs', result);

      alert(JSON.stringify(result));
      // this.setState({ user_name: 'Welcome' + ' ' + result.name });
      // this.setState({ token: 'User Token: ' + ' ' + result.id });
      // this.setState({ profile_pic: result.picture.data.url });
    }
  };

  const onLoginFinished = async (error, result) => {
    if (error) {
      alert('Erro ao fazer login: ' + error.message);
    } else if (result.isCancelled) {
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
  };

  return (
    <LoginButton
      style={{
        height: 50,
        marginHorizontal: 50,
      }}
      publishPermissions={['email']}
      readPermissions={['public_profile']}
      onLoginFinished={onLoginFinished}
      onLogoutFinished={() => alert('User logged out')}
    />
  );
}

export default FacebookButton;
