import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Dimensions} from 'react-native';

import {
  Container,
  Content,
  Footer,
  Button,
  TextButton,
  ContentFooter,
  ContainerInput,
  CloseButton,
  TextClose,
  Logo,
  Text,
  ContainerButton,
  ContentButton,
} from './styles';

import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

import {background, bg, bgDark, lock, user} from '../../assets';

import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import Input from '../../components/input';
import FacebookButton from '../../components/facebook';
import Google from '../../components/google';

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

const ButtonAnimated = Animated.createAnimatedComponent(Button);
const ContainerButtonAnimated = Animated.createAnimatedComponent(
  ContainerButton,
);
const ContentAnimated = Animated.createAnimatedComponent(Content);
const ContentFooterAnimated = Animated.createAnimatedComponent(ContentFooter);
const CloseButtonAnimated = Animated.createAnimatedComponent(CloseButton);
const TextCloseAnimated = Animated.createAnimatedComponent(TextClose);

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, dest)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

const {width, height} = Dimensions.get('window');

export default function Login({navigation}) {
  const buttonOpacity = new Value(1);

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const inputZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  const inputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });

  const inputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  const onStateChange = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0)),
          ),
        ]),
    },
  ]);

  const onCloseState = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1)),
          ),
        ]),
    },
  ]);

  return (
    <Container>
      <Logo>
        <Text>FINPLAN</Text>
      </Logo>

      <ContentAnimated style={{transform: [{translateY: bgY}]}}>
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>

          <Image
            href={bgDark}
            height={height + 50}
            width={width}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
      </ContentAnimated>

      <Footer>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <ButtonAnimated
            color={'#fff'}
            opacity={buttonOpacity}
            style={{transform: [{translateY: buttonY}]}}>
            <TextButton color={'#000'}>Entrar ou cadastrar</TextButton>
          </ButtonAnimated>
        </TapGestureHandler>

        <ContainerButtonAnimated
          opacity={buttonOpacity}
          style={{transform: [{translateY: buttonY}]}}>
          <ContentButton>
            <FacebookButton />
          </ContentButton>

          <ContentButton>
            <Google />
          </ContentButton>
        </ContainerButtonAnimated>

        <ContentFooterAnimated
          opacity={inputOpacity}
          style={{zIndex: inputZindex, transform: [{translateY: inputY}]}}>
          <TapGestureHandler onHandlerStateChange={onCloseState}>
            <CloseButtonAnimated>
              <TextCloseAnimated
                style={{transform: [{rotate: concat(rotateCross, 'deg')}]}}>
                X
              </TextCloseAnimated>
            </CloseButtonAnimated>
          </TapGestureHandler>

          <ContainerInput>
            <Input
              placeholder={'E-mail'}
              icon={user}
              value={''}
              onChangeText={() => {}}
            />
          </ContainerInput>

          <ContainerInput>
            <Input
              placeholder={'Senha'}
              icon={lock}
              value={''}
              onChangeText={() => {}}
            />
          </ContainerInput>

          <ButtonAnimated color={'#fff'}>
            <TextButton color={'#000'}>Entrar</TextButton>
          </ButtonAnimated>
        </ContentFooterAnimated>
      </Footer>
    </Container>
  );
}
