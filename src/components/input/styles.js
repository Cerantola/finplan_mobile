import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.5);
`;

export const IconContainer = styled.View`
  width: 50px;
  height: 100%;
  padding: 15px;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  /* border-right-color: rgba(0, 0, 0, 0.5);
  border-right-width: 0.5px; */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const Icon = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

export const Content = styled.TextInput`
  flex: 1;
  padding-left: 10px;
`;
