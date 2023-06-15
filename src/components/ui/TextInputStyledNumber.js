import React, { useState } from 'react'
import { TextInput } from "react-native";

import { useField } from 'formik';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { theme } from '../../utils/theme';
import TextStyled from './TextStyled';
import ViewStyled from './ViewStyled';
import ImageStyled from './ImageStyled';

export default function TextInputStyledNumber({
    labelFontSize = 14,
    label = 'Any Label',
    name,
    width = 90,
    type,
    disabled,
    heightInput = 8,
    isSecure = false,
    display,
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
            height={heightInput + 4}
            style={{
                justifyContent: 'center',
                position: 'relative',
                display: display
            }}
            marginBottom={2.5}
        >
            <TextStyled
                color={theme.quaternary}
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
            <ViewStyled
                width={width}
                height={heightInput + 4}
                style={{
                    justifyContent: 'center',
                    position: 'relative',
                    flexDirection: 'row'
                }}
            >
                <ImageStyled
                    width={10}
                    height={8}
                    style={{
                        // backgroundColor: '#f3f5f7cc',
                        resizeMode: 'contain',
                        borderBottomLeftRadius: wp(2),
                        borderTopLeftRadius: wp(2),
                    }}
                    source={require('../../assets/profile/banderaBolivia.png')}
                />
                <TextInput
                    style={{
                        // backgroundColor: '#f3f5f7cc',
                        paddingVertical: hp(1),
                        paddingRight: hp(2),
                        paddingLeft: hp(1),
                        borderBottomRightRadius: wp(2),
                        borderTopRightRadius: wp(2),
                        height: hp(heightInput),
                    }}

                    editable={false}
                    value="+591"
                />
                <TextInput
                    value={info.value}
                    onChangeText={handleOnChange}
                    keyboardType={type}

                    onBlur={() => helpers.setTouched(true)}
                    style={{
                        backgroundColor: '#f3f5f7cc',
                        paddingVertical: hp(1),
                        paddingHorizontal: hp(2),
                        borderRadius: wp(2),
                        width: '70%',
                        marginTop: 10,
                        height: hp(heightInput - 2),
                        // fontFamily: 'BRFirma-Regular',
                    }}
                    editable={!disabled}
                    secureTextEntry={secure}
                    {
                    ...rest
                    }
                />
            </ViewStyled>
            {
                meta.touched && meta.error && (
                    <TextStyled
                        color={theme.danger}
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
