// REACT  
import React, { useState } from 'react'
import { Modal } from 'react-native';

// LIBRARIES 
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';

// CUSTOM 
import How1 from '../../assets/gif/Gif1Pasos.png';
import How2 from '../../assets/gif/Gif2Pasos.png';
import How3 from '../../assets/gif/Gif3Pasos.png';

import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import adjustFontSize from '../../utils/adjustText';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import Img1 from '../../assets/modal/im1.png'
import Img2 from '../../assets/modal/im3.png'
import Img3 from '../../assets/modal/im2.png'
import Img4 from '../../assets/modal/im4.png'
import Img5 from '../../assets/modal/im5.png'



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

    const [modal, setModal] = useState(true);

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
                            height={88}
                            backgroundColor={theme.transparent}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'flex-end',
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
                                marginTop={3}
                                marginBottom={1}
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
                                    fontSize={32}
                                    color={theme.primary}
                                    style={{
                                        marginBottom: '3%',
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
                            top: -55
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
                                fontSize={16}
                                color={theme.primary}
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
                            top: -55
                        }}
                    >
                        <ViewStyled
                            width={90}
                            height={7}
                            backgroundColor={theme.primary}
                            borderRadius={2}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                            }}
                        >
                            <TextStyled
                                fontSize={16}
                                color={theme.dark}
                            >
                                Empezar
                            </TextStyled>
                        </ViewStyled>
                    </ViewStyled>
                )}

                showSkipButton={false}

                dotClickEnabled={true}
                activeDotStyle={{
                    backgroundColor: theme.primary,
                    top: -100
                }}
                dotStyle={{
                    backgroundColor: theme.tertiary,
                    top: -100
                }}
            />
        </>
    )
}