// REACT  
import React, { useState } from 'react'
import { Modal } from 'react-native';

// LIBRARIES 
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';

import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import Img1 from '../../assets/modal/im1.png'
import Img2 from '../../assets/modal/im3.png'
import Img3 from '../../assets/modal/im2.png'
import Img4 from '../../assets/modal/im4.png'
import Img5 from '../../assets/modal/im5.png'
import { SafeAreaView } from 'react-native-safe-area-context';



const slides = [
    {
        key: '1',
        text: 'Visita empresas afiliadas o pide por delivery.',
        image: Img1,
    },
    {
        key: '2',
        text: 'Informa al cajero que eres usuario de Entereza',
        image: Img2,
    },
    {
        key: '3',
        text: 'Dile al cajero tu número de Carnet de Identidad',
        image: Img3,

    },
    {
        key: '4',
        text: 'Paga el mismo precio de siempre',
        image: Img4,
    },
    {
        key: '5',
        text: '¡Y listo! Verifica el saldo de tu cuenta Entereza',
        image: Img5,
    },
];

export default function ModalExplications() {

    const navigation = useNavigation()

    const handleOnDone = () => {
        send2()

        navigation.navigate('AuthenticationScreen')
    }

    const send1 = () => {
        console.log("Send 1 GET")
        void fetchWithoutToken(
            `/entereza/mod?data=1`,
            "GET"
        );
    }
    const send2 = () => {
        console.log("Send 2 GET")
        void fetchWithoutToken(
            `/entereza/mod?data=2`,
            "GET"
        );
    }

    React.useEffect(() => {
        send1()
    }, [])

    return (
        <>
            <AppIntroSlider
                style={{
                    position: 'relative',
                }}

                contentContainerStyle={{
                    backgroundColor: theme.dark,
                    justifyContent: 'flex-end',
                }}

                data={slides}
                renderItem={({ item }) => (
                    <>
                        <ViewStyled
                            width={100}
                            height={100}
                            backgroundColor={theme.transparent}
                            paddingTop={3}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <ViewStyled
                                width={100}
                                height={6}
                                marginBottom={8}
                                backgroundColor={theme.transparent}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <TextStyled
                                    textAlign='center'
                                    fontFamily='ArtegraBold'
                                    fontSize={25}
                                    color={theme.primary}
                                >
                                    Entereza
                                </TextStyled>
                            </ViewStyled>

                            <ViewStyled
                                width={100}
                                height={50}
                                backgroundColor={theme.transparent}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // borderWidth: 1,
                                    // borderColor: theme.orange,
                                }}
                            >
                                <ImageStyled
                                    source={item.image}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                    }}
                                />
                            </ViewStyled>

                            <ViewStyled
                                width={100}
                                height={16}
                                marginTop={1}
                                marginBottom={3}
                                backgroundColor={theme.transparent}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // borderWidth: 1,
                                    // borderColor: theme.danger,
                                }}
                            >
                                <TextStyled
                                    textAlign='center'
                                    fontFamily='ArtegraBold'
                                    fontSize={30}
                                    color={theme.primary}
                                    style={{
                                        width: '95%'
                                    }}
                                >
                                    {
                                        item.text
                                    }
                                </TextStyled>
                            </ViewStyled>
                        </ViewStyled>
                    </>
                )}

                showNextButton={true}
                renderNextButton={() => (
                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={90}
                        height={8}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: -25
                        }}
                    >
                        <ViewStyled
                            width={90}
                            height={7}
                            backgroundColor={theme.dark}
                            borderRadius={2}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: theme.primary
                            }}
                        >
                            <TextStyled
                                fontSize={20}
                                color={theme.primary}
                                fontFamily='ArtegraBold'
                            >
                                Continuar
                            </TextStyled>
                        </ViewStyled>
                    </ViewStyled>
                )}

                showDoneButton={true}
                onDone={handleOnDone}
                renderDoneButton={() => (
                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={90}
                        height={8}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: -25
                        }}
                    >
                        <LinearGradient
                            colors={[theme.green3, theme.secondary, theme.salmon]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                width: widthPercentageToDP(90),
                                height: heightPercentageToDP(7),
                                borderRadius: heightPercentageToDP(2),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                            }}
                        >
                            <TextStyled
                                fontSize={20}
                                color={theme.dark}
                                fontFamily='ArtegraBold'
                            >
                                Empezar
                            </TextStyled>
                        </LinearGradient>
                    </ViewStyled >
                )}

                showSkipButton={false}

                dotClickEnabled={true}
                activeDotStyle={{
                    backgroundColor: theme.primary,
                    top: -65
                }}
                dotStyle={{
                    backgroundColor: theme.tertiary,
                    top: -65
                }}
            />
        </>
    )
}