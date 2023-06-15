import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import adjustFontSize from '../../utils/adjustText';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

export default function BusinessHeaderSecondary({
    title
}) {

    const navigation = useNavigation()

    const handleGoBack = () => navigation.goBack()

  return (
    <ViewStyled
        width={100}
        height={6}
        backgroundColor={theme.primary}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        paddingHorizontal={2.5}
      >
        <Pressable
            onPress={handleGoBack}
            style={{
                marginRight: 'auto',
            }}
        >
            <Ionicons 
            name="chevron-back" 
            size={adjustFontSize(24)} 
            color={theme.quaternary}
              
            />
        </Pressable>
        <TextStyled
          fontSize={16}
          color={theme.quaternary}
          fontWeight='500'
          style={{
            marginRight: 'auto',
            paddingRight: '6%'
          }} 
        >
          {
            title
          }
        </TextStyled>
      </ViewStyled>
  )
}