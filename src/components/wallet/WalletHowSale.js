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

const slides = [
    {
        key: 'one',
        title: 'Visita tus lugares favoritos',
        text: 'Ve a cualquiera de nuestros negocios afiliados y compra con normalidad.\n(Paga el mismo precio de siempre)',
        image: How1,
    },
    {
        key: 'two',
        title: 'Gana dinero con Entereza',
        text: 'Indica que eres usuario de Entereza y dicta tu número de CI, este es tu código de compra en todos los negocios afiliados.',
        image: How2,
    },
    {
        key: 'three',
        title: 'Así de sencillo ganaste cashback con Entereza',
        text: 'Verifica tu saldo en tiempo real ingresando a tu aplicación y asegúrate que llego tu cashback (Reembolso).',
        image: How3,
    }
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
                    width={35}
                    height={25 / 2}
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
                    marginHorizontal={2}
                    borderRadius={2}
                >
                    <Animated.View
                        style={{
                            backgroundColor: theme.salmon,
                            height: heightInterpolation2,
                            width: widthInterpolation,
                            display: buttonOpen,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            bottom: heightPercentageToDP(11),
                            right: widthPercentageToDP(-1),
                            transform: [{ translateY: heightInterpolation }, { translateX: translateXInterpolation },],
                        }}
                    />
                    <TextStyled
                        textAlign='center'
                        fontSize={14}
                        numberOfLines={4}
                        color={theme.primary}
                        style={{
                            width: "90%",
                            // marginBottom: 5
                        }}
                    >
                        {'¿Cómo'}
                        <TextStyled
                            fontWeight='700'
                            textAlign='center'
                            fontSize={15}
                            numberOfLines={4}
                            color={theme.salmon}
                            style={{
                                width: "90%",
                                // marginBottom: 5
                            }}
                        >
                            {' GANAR '}
                        </TextStyled>
                        {'con Entereza?'}
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
                    renderItem={({ item }) => (
                        <ViewStyled
                            height={100}
                            width={100}
                            backgroundColor={theme.primary}
                            style={{
                                position: 'relative',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: item.key === 'two' ? 'column-reverse' : 'column',
                            }}
                        >
                            <ViewStyled
                                width={90}
                                backgroundColor={theme.transparent}
                                height={22}
                                marginBottom={item.key === 'two' ? 5 : 5}
                                marginTop={item.key === 'two' ? 5 : 5}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <TextStyled
                                    fontSize={26}
                                    color={theme.quaternary}
                                    fontWeight='700'
                                    style={{
                                        marginBottom: '3%',
                                        width: "90%"
                                    }}
                                >
                                    {
                                        item.title
                                    }
                                </TextStyled>
                                <TextStyled
                                    color={theme.tertiary}
                                    fontSize={16}
                                    style={{
                                        width: "90%"
                                    }}
                                >
                                    {
                                        item.text
                                    }
                                </TextStyled>
                            </ViewStyled>

                            <ImageStyled
                                source={item.image}
                                width={85}
                                height={40}
                                style={{
                                    marginBottom: item.key === 'two' ? 4 : 'auto',
                                    resizeMode: 'contain',
                                }}
                            />

                        </ViewStyled>
                    )}
                    data={slides}
                    onDone={handleOnDone}
                    showSkipButton={false}
                    showDoneButton={true}
                    showNextButton={true}
                    nextLabel={'Siguiente'}
                    skipLabel={'Saltar'}
                    doneLabel={'Finalizar'}
                    dotColor={theme.tertiaryGradient}
                    activeDotColor={theme.secondary}
                    renderNextButton={() => (
                        <ViewStyled
                            width={14}
                            height={7}
                            backgroundColor={`${theme.secondary}22`}
                            borderRadius={7}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: -15,
                                right: 10,
                            }}
                        >
                            <Ionicons name="arrow-forward" size={adjustFontSize(38)} color={theme.secondary} />
                        </ViewStyled>
                    )}
                    renderDoneButton={() => (
                        <ViewStyled
                            width={14}
                            height={7}
                            backgroundColor={`${theme.secondary}22`}
                            borderRadius={7}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: -15,
                                right: 10,
                            }}
                        >
                            <Ionicons name="checkmark" size={adjustFontSize(38)} color={theme.secondary} />
                        </ViewStyled>
                    )}
                    renderSkipButton={() => (
                        <TextStyled
                            fontSize={18}
                            color={theme.tertiary}
                        >
                            Saltar
                        </TextStyled>
                    )}
                    activeDotStyle={{
                        backgroundColor: `${theme.secondary}aa`,
                        top: -35
                    }}
                    dotStyle={{
                        backgroundColor: `${theme.secondary}22`,
                        top: -35
                    }}
                    bottomButton={false}
                />
            </Modal>
        </>
    )
}