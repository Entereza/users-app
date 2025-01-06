import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function SelectAmmountItem({ disabled, value, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      disabled={disabled}
      style={{
        width: '31%',
      }}
    >
      <ViewStyled
        borderRadius={2.5}
        height={6}
        backgroundColor={theme_colors.transparent}
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: disabled ? theme_colors.greyLine : theme_colors.primary,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <TextStyled
          fontFamily='SFPro-SemiBold'
          textAlign='center'
          fontSize={theme_textStyles.medium}
          color={disabled ? theme_colors.greyLine : theme_colors.primary}
        >
          {`Bs. ${value}`}
        </TextStyled>
      </ViewStyled >
    </TouchableOpacity >
  );
}
