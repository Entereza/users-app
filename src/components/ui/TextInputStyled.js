import React, { useState } from 'react'
import { TextInput, Pressable } from "react-native";

import { useField } from 'formik';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

import { theme } from '../../utils/theme';
import adjustFontSize from '../../utils/adjustText';
import TextStyled from './TextStyled';
import ViewStyled from './ViewStyled';


export default function TextInputStyled({
  labelFontSize=14,
  label='Any Label',
  name,
  width=90,
  type,
  disabled,
  heightInput=8,
  isSecure=false,
  ...rest
}) {



  const [secure, setSecure] = useState(isSecure);

  const handleSecure = () => {
    setSecure(!secure);
  }

  const [info, meta, helpers] = useField(name);

  const handleOnChange = (text) => {
    helpers.setValue(text);
  }

  return (
    <ViewStyled
      width={width}
      height={heightInput+4}
      style={{
        justifyContent: 'center',
        position: 'relative',
      }}
      marginBottom={2.5}
    >
      {
        isSecure
          && (
            <Pressable
              style={{
                position: 'absolute',
                right: '3%',
                top: '50%',
                zIndex: 2,
                backgroundColor: theme.transparent,
              }}
              onPress={handleSecure}
            >
              {
                secure
                  ? (
                    <Feather 
                      name="eye" 
                      size={adjustFontSize(22)} 
                      color={ theme.tertiary } 
                      // color={ `${theme.secondary}cc` } 
                    />
                  ): (
                    <Feather 
                      name="eye-off" 
                      size={adjustFontSize(22)} 
                      color={theme.tertiary}
                      // color={ `${theme.secondary}cc` } 
                    />
                  )
              }
              
            </Pressable>
          )
      }
      <TextStyled
        color={ theme.quaternary }
        fontSize={labelFontSize}
        fontWeight='700'
        style={{
          marginBottom: '1.5%',
        }}
      >
        {
          label
        }
      </TextStyled>
      <TextInput
        value={ info.value }
        onChangeText={handleOnChange}
        keyboardType={ type }
        onBlur={() => helpers.setTouched(true)}
        style={{
          backgroundColor: '#f3f5f7cc',
          paddingVertical: hp(1),
          paddingHorizontal: hp(2),
          borderRadius: wp(2),
          height: hp(heightInput),
          // fontFamily: 'BRFirma-Regular',
        }}
        editable={!disabled}
        secureTextEntry={secure}
        {
          ...rest
        }
      />
      {
        meta.touched && meta.error && (
          <TextStyled
            color={ theme.danger }
            style={{
              position: 'absolute',
              bottom: hp(-2.8),
              left: wp(4)
            }}
          >
            {
              meta.error
            }
          </TextStyled>
        )
      }
    </ViewStyled>
  )
}
