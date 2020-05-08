import React from 'react';

import {Container, IconContainer, Icon, Content} from './styles';

export default function Input({
  icon = false,
  placeholder,
  value,
  onChangeText,
}) {
  return (
    <Container>
      {icon && (
        <IconContainer>
          <Icon source={icon} />
        </IconContainer>
      )}

      <Content
        placeholder={placeholder}
        placeholderTextColor={'#7A7A7A'}
        value={value}
        onChangeText={onChangeText}
      />
    </Container>
  );
}
