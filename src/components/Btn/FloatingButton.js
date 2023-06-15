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

export default function FloatingButton() {
    const [numberWpp, setNumberWpp] = React.useState('')


    const RedirectWhatsapp = () => {
        Linking.openURL(numberWpp)
    }

    const NumberWp = async () => {
        try {
            const res = await fetchWithToken(`entereza/numero_entereza`, 'GET')

            const { codeError, msgError } = await res.json()

            console.log('Número Disponible para: ', msgError)
            if (codeError === 'COD200') {
                setNumberWpp(msgError)
            }
        } catch (error) {
            console.log('NumberWp Error: ', error)
        }
    }

    React.useEffect(() => {
        NumberWp()
    }, [])

    return (
        <>
            <ViewStyled
                width={42}
                height={5}
                backgroundColor={theme.transparent}
                style={[
                    {
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bottom: heightPercentageToDP(8),
                        marginBottom: 10,
                        right: 10,
                        zIndex: 2
                    }]}
            >
                <Pressable
                    onPress={RedirectWhatsapp}
                    style={[
                        {
                            borderColor: theme.green2,
                            borderWidth: 1,
                            width: '100%',
                            height: '100%',
                            backgroundColor: theme.dark,
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
                        borderRadius={4}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            marginRight: 3
                        }}
                    >
                        <Ionicons
                            name="logo-whatsapp"
                            size={adjustFontSize(20)}
                            color={theme.green2}
                        />
                    </ViewStyled>
                    <TextStyled
                        fontSize={11}
                        color={theme.green2}
                        fontFamily='ArtegraBold'
                        textAlign='center'
                    >
                        {'¿Conversemos?'}
                    </TextStyled>
                </Pressable >
            </ViewStyled>
        </>
    )
}