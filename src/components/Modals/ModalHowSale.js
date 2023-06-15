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

const slides = [
    {
        key: 'one',
        title1: '¡Bienvenid@ a la App donde',
        title2: ' Ganarás Dinero ',
        title3: 'con tus compras!',
        text: 'Descubre cómo funciona Entereza ->',
        // image: Entereza,
    },
    {
        key: 'one1',
        title: 'Paso 1',
        text: 'Ve a un negocio afiliado. (Verás nuestros letreros)',
        image: How1,
    },
    {
        key: 'two',
        title: 'Paso 2',
        text: 'Indica que eres usuario Entereza y dicta tu CI. (Código de compra)',
        image: How2,
    },
    {
        key: 'three',
        title: 'Paso 3',
        text: 'Verifica tu saldo en la App y vuélvelo a gastar en cualquier empresa afiliada.',
        image: How3,
    },
];

export default function ModalHowSale() {

    const [modal, setModal] = useState(true);

    const handleOnDone = () => {
        send2()
        setModal(!modal)
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

    const handleOnModal = () => setModal(!modal);
    return (
        <>
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
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: item.key === 'two' ? 'column-reverse' : 'column',
                            }}
                        >
                            <ViewStyled
                                width={96}
                                backgroundColor={theme.transparent}
                                height={item.key === 'one' ? 80 : 14}
                                marginBottom={item.key === 'two' ? 3 : 7}
                                marginTop={item.key === 'two' ? 3 : item.key === 'one' ? 5 : 12}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // borderWidth: 1,
                                    // borderColor: 'red'
                                }}
                            >
                                {
                                    item.key === 'one'
                                        ?
                                        <ViewStyled
                                            width={95}
                                            backgroundColor={theme.transparent}
                                            height={22}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                // borderWidth: 1,
                                                // borderColor: 'red'
                                            }}
                                        >
                                            <TextStyled
                                                fontSize={30}
                                                color={theme.quaternary}
                                                style={{
                                                    width: "95%"
                                                }}
                                            >
                                                {
                                                    item.title1
                                                }
                                                <TextStyled
                                                    fontSize={30}
                                                    color={theme.secondary}
                                                    style={{
                                                        width: "95%"
                                                    }}
                                                >
                                                    {
                                                        item.title2
                                                    }
                                                </TextStyled>
                                                <TextStyled
                                                    fontSize={30}
                                                    color={theme.quaternary}
                                                    style={{
                                                        width: "95%"
                                                    }}
                                                >
                                                    {
                                                        item.title3
                                                    }
                                                </TextStyled>
                                            </TextStyled>
                                        </ViewStyled>
                                        : <TextStyled
                                            fontSize={28}
                                            color={theme.quaternary}
                                            style={{
                                                marginBottom: '3%',
                                                width: "90%"
                                            }}
                                        >
                                            {
                                                item.title
                                            }
                                        </TextStyled>
                                }

                                <TextStyled
                                    color={theme.tertiary}
                                    fontSize={19}
                                    style={{
                                        width: item.key === 'one' ? "95%" : "90%" 
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
                                height={item.key === 'one' ? 0 : 40}
                                style={{
                                    marginBottom: item.key === 'two' ? 0 : 'auto',
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