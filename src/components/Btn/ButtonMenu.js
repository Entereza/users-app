import React from 'react';

//Importacion de Etiquetas de ReactNative
import { Pressable } from 'react-native';
import TextStyled from '../ui/TextStyled';
import ViewStyled from '../ui/ViewStyled';

import { theme } from '../../utils/theme';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import adjustFontSize from '../../utils/adjustText';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { fetchWithToken } from '../../utils/fetchWithToken';
import { useSelector } from 'react-redux';

export default function ButtonMenu({ showButton = 'none', onPress }) {

    return (
        <>
            <ViewStyled
                width={45}
                height={6}
                backgroundColor={theme.transparent}
                style={[
                    {
                        display: showButton,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10,
                        bottom: heightPercentageToDP(10),
                        right: 10,
                        zIndex: 2
                    }]}
            >
                <Pressable
                    onPress={onPress}
                    style={[
                        {
                            borderColor: theme.primary,
                            borderWidth: 1,
                            width: '100%',
                            height: '100%',
                            backgroundColor: theme.green,
                            borderRadius: 15,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 2,
                        }
                    ]}
                >
                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={7}
                        height={6}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            marginRight: 10
                        }}
                    >
                        <Ionicons
                            name="ios-fast-food-outline"
                            size={adjustFontSize(20)}
                            color={theme.primary}
                        />
                    </ViewStyled>
                    <TextStyled
                        fontSize={14}
                        color={theme.primary}
                        fontFamily='ArtegraBold'
                        textAlign='center'
                    >
                        {'Ver Menú'}
                    </TextStyled>
                </Pressable >
            </ViewStyled>
        </>
    )
}