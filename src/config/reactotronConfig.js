import Reactotron from 'reactotron-react-native';

console.tron = Reactotron.configure({host: '192.168.0.16'}) // IP LOCAL
  .useReactNative();

if (__DEV__) {
  console.tron.connect();
}
