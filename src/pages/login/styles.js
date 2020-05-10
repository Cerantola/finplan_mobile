import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: flex-end;
`;

export const Content = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Footer = styled.View`
  height: ${height / 3};
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  margin: 5px 50px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px #000;
`;

export const ContainerButton = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 45px;
`;

export const ContentButton = styled.View`
  flex: 1;
  padding-horizontal: 5px;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.color};
`;

export const ContentFooter = styled.View`
  height: ${height / 3};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
`;

export const ContainerInput = styled.View`
  margin: 5px 50px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -20px;
  left: ${width / 2 - 20};
  box-shadow: 2px 2px 2px gray;
`;

export const TextClose = styled.Text`
  font-size: 15px;
`;

export const Logo = styled.View`
  width: 100%;
  top: 100px;
  position: absolute;
  z-index: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 34px;
  color: #fff;
  font-weight: bold;
`;
