import React, { useState } from 'react'
import { TextInput } from "react-native";

import { useField } from 'formik';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

import { theme } from '../../utils/theme';
import adjustFontSize from '../../utils/adjustText';
import TextStyled from './TextStyled';
import ViewStyled from './ViewStyled';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


export default function TextInputStyledLogin({
    labelFontSize = 14,
    label = 'Any Label',
    name,
    widthInput = 90,
    widthTextInput = 90,
    type,
    disabled,
    heightInput = 8,
    heightTextInput = 4,
    isSecure = false,
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
            backgroundColor={theme.transparent}
            width={widthInput}
            height={heightInput}
            style={{
                justifyContent: 'center',
                position: 'relative',
            }}
            marginBottom={1}
        >
            {
                isSecure
                && (
                    <Pressable
                        style={{
                            position: 'absolute',
                            top: 53,
                            right: 20,
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
                                        color={theme.tertiary}
                                    // color={ `${theme.secondary}cc` } 
                                    />
                                ) : (
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
                color={theme.dark}
                fontSize={labelFontSize}
                fontWeight='700'
                style={{
                    marginBottom: 10,
                }}
            >
                {
                    label
                }
            </TextStyled>
            <TextInput
                value={info.value}
                onChangeText={handleOnChange}
                keyboardType={type}
                onBlur={() => helpers.setTouched(true)}
                style={{
                    backgroundColor: '#f3f5f7cc',
                    paddingVertical: wp(1),
                    paddingHorizontal: hp(2),
                    borderRadius: wp(2),
                    width: wp(widthTextInput),
                    height: hp(heightTextInput),
                    alignSelf: 'center'
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
                        color={theme.danger}
                        style={{
                            paddingLeft: wp(3),
                            marginTop: 5
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
