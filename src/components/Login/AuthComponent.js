import React from 'react'
import { Animated } from 'react-native';

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import ContinueGoogle from '../Google/ContinueGoogle';
import ContinueFacebook from '../Facebook/ContinueFacebook';
import ContinueApple from '../Apple/ContinueApple';
import ContinueEntereza from '../Entereza/ContinueEntereza';
import TermsConditions from '../Modals/ModalTermsConditions';

export default function AuthComponent({ showButton, display = 'flex', goLogin, authOpacity, shadow, outputRange, outputRange2 }) {

    return (
        <ViewStyled
            width={100}
            height={70}
            backgroundColor={theme.primary}
            style={{
                display: display,
                alignItems: 'center',
                justifyContent: 'flex-start',  // Añade esto
                borderTopLeftRadius: 70,
            }}
        >
            <Animated.View
                style={{
                    transform: [
                        {
                            translateX: authOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [outputRange2, outputRange], // Cambia estos valores según tus necesidades
                            }),
                        },
                    ],
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    width={100}
                    height={70}
                    backgroundColor={theme.transparent}
                    paddingVertical={3}
                    style={{
                        display: display,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTopLeftRadius: 70,
                    }}
                >
                    <ViewStyled
                        width={100}
                        height={10}
                        backgroundColor={theme.transparent}

                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            textAlign='center'
                            fontSize={24}
                            color={theme.dark}
                            style={{
                                width: "100%",
                            }}
                        >
                            {'¡Bienvenido a'}
                            <TextStyled
                                fontFamily='BRFirmaBold'
                                textAlign='center'
                                fontSize={24}
                                color={theme.secondary}
                                style={{
                                    width: "100%",
                                }}
                            >
                                {' Entereza'}
                            </TextStyled>
                            {'!'}
                        </TextStyled>

                        <TextStyled
                            textAlign='center'
                            fontSize={16}
                            color={theme.tertiary}
                            style={{
                                width: "90%",
                            }}
                        >
                            {'¿Cómo te gustaría iniciar sesión?'}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        width={100}
                        height={showButton === 'flex' ? 38 : 30}
                        backgroundColor={theme.transparent}
                        style={{
                            display: display,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ContinueGoogle shadow={shadow} />

                        <ContinueFacebook shadow={shadow} />

                        <ContinueApple shadow={shadow} display={showButton} />

                        <ContinueEntereza shadow={shadow} onPress={goLogin} />
                    </ViewStyled>

                    <ViewStyled
                        width={100}
                        height={10}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontSize={14}
                            textAlign='center'
                            color={theme.dark}
                            style={{
                                width: '100%',
                            }}
                        >
                            Al continuar, estás de acuerdo con los
                        </TextStyled>
                        <TermsConditions color={theme.dark} />
                    </ViewStyled>
                </ViewStyled>
            </Animated.View>
        </ViewStyled>
    );
}