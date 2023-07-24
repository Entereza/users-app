// REACT  
import React, { useState, useRef } from 'react'
import { Modal, Pressable, Animated } from 'react-native';

// LIBRARIES 
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';

// CUSTOM 
import How1 from '../../assets/gif/Gif1Pasos.png';
import How2 from '../../assets/gif/Gif2Pasos.png';
import How3 from '../../assets/gif/Gif3Pasos.png';

import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import adjustFontSize from '../../utils/adjustText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import Img1 from '../../assets/modal/im1.png'
import Img2 from '../../assets/modal/im3.png'
import Img3 from '../../assets/modal/im2.png'
import Img4 from '../../assets/modal/im4.png'
import Img5 from '../../assets/modal/im5.png'
import { LinearGradient } from 'expo-linear-gradient';

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
export default function WalletHowSale() {

    const [modal, setModal] = useState(false);
    const [buttonOpen, setButtonOpen] = React.useState('flex')

    const handleOnDone = async () => {
        setModal(!modal)

        const Win = await AsyncStorage.getItem('ButtonWin')
        console.log('Abierto?: ', Win)
        if (Win === null) {
            console.log('Primera vez abierto', Win)
            setButtonOpen('none')
            await AsyncStorage.setItem('ButtonWin', 'none')
        }
    }

    const handleOnModal = async () => {
        setModal(!modal)
    };

    const [animation] = useState(new Animated.Value(0));
    const animationRef = useRef(animation);

    const startAnimation = () => {
        animationRef.current.setValue(0);
        Animated.timing(animationRef.current, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
        }).start(() => startAnimation());
    };

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -2, 0],
    });

    const widthInterpolation = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [14, 20, 14],
    });

    const heightInterpolation2 = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [14, 20, 14],
    });

    const translateXInterpolation = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 6, -0],
    });

    const Verify = async () => {
        const Win = await AsyncStorage.getItem('ButtonWin')
        if (Win === 'none') {
            console.log('Win: ', Win)
            setButtonOpen('none')
        }
    }

    React.useEffect(() => {
        startAnimation()
        Verify()
    }, [])

    return (
        <>
            <Pressable
                onPress={handleOnModal}
            >
                <ViewStyled
                    backgroundColor={theme.black}
                    width={44}
                    height={13}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: theme.salmon,
                        shadowOffset: {
                            width: 5,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 3.5,
                        elevation: 15,
                    }}
                    borderRadius={2}
                    paddingHorizontal={2}
                >
                    <TextStyled
                        textAlign='center'
                        fontSize={17}
                        color={theme.primary}
                    >
                        {'¿Cómo'}
                        <TextStyled
                            fontWeight='bold'
                            textAlign='center'
                            fontSize={17}
                            color={theme.salmon}
                        >
                            {' FUNCIONA'}
                        </TextStyled>
                        {'?'}
                    </TextStyled>
                </ViewStyled>

            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={handleOnModal}
            >
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
                                paddingTop={2}
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
                                top: -10
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
                                top: -10
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
                        top: -50
                    }}
                    dotStyle={{
                        backgroundColor: theme.tertiary,
                        top: -50
                    }}
                />
            </Modal>
        </>
    )
}