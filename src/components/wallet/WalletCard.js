import React from 'react'
import { ImageBackground } from 'react-native'

// LIBRARIES 
import { useSelector } from 'react-redux';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Skeleton, HStack, Center, NativeBaseProvider } from "native-base";

import { theme } from '../../utils/theme'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import ImageStyled from '../ui/ImageStyled';

export default function WalletCard({ reload, WalletCardOpacity, CardOpacity }) {

    const backgroundColorCard = WalletCardOpacity.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [theme.green, theme.secondary, theme.salmon]
    });

    const [Nombres, setNombres] = React.useState('');
    const [Saldo, setSaldo] = React.useState('');

    const [loadingSkeleton, setLoadingSkeleton] = React.useState(true);

    const { info } = useSelector(state => state.auth)
    const Code = async () => {
        const nombresUser = await AsyncStorage.getItem('CODE-NOMBRE')
        const saldoUser = await AsyncStorage.getItem('CODE-SALDO')

        if (saldoUser > 0) {
            let redond = Number(Saldo).toFixed(2)
            setSaldo(redond)
        } else {
            setSaldo('0')
        }
        setNombres(nombresUser)
    }

    const SkeletonSaldo = () => {
        return (
            <NativeBaseProvider>
                <Center w="100%" paddingTop={2}>
                    <HStack backgroundColor={theme.transparent} w="100%" h={heightPercentageToDP(6)} space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} >
                        <Skeleton speed={1} w={100} h={heightPercentageToDP(4)} rounded="lg" startColor={theme.primary} endColor={theme.transparent} />
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    };

    React.useEffect(() => {
        if (info !== null) {
            Code()
        }
    }, [info])

    React.useEffect(() => {
        if (info !== null) {
            if (reload === true) {
                setLoadingSkeleton(true)
            } else {
                setLoadingSkeleton(false)
            }
        }
    }, [reload, info])

    return (
        <Animated.View
            style={{
                opacity: CardOpacity,
                backgroundColor: backgroundColorCard,
                width: widthPercentageToDP(92),
                height: widthPercentageToDP(57),
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: heightPercentageToDP(2),
                paddingTop: heightPercentageToDP(2),
                paddingBottom: heightPercentageToDP(4),
                position: 'relative',
                overflow: 'hidden',
                borderWidth: 2.5,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderColor: '#2a2a2a22',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                width={80}
                backgroundColor={theme.transparent}
                height={6.5}
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                }}
            >
                <ViewStyled
                    width={60}
                    backgroundColor={theme.transparent}
                    height={5}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        // borderColor: theme.danger,
                        // borderWidth: 1
                    }}
                >
                    <TextStyled
                        fontSize={25}
                        color={theme.primary}
                        style={{
                            fontFamily: 'ArtegraBold',
                        }}
                    >
                        ENTEREZA
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={11}
                    height={6}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ImageStyled
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                        source={require('../../../assets/img/LogoEnterezaWhite.png')}
                    />
                </ViewStyled>
            </ViewStyled>

            <ViewStyled
                width={80}
                backgroundColor={theme.transparent}
                height={13}
                style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                {
                    loadingSkeleton
                        ? SkeletonSaldo()
                        : <TextStyled
                            fontSize={25}
                            fontFamily='BRFirmaBold'
                            fontWeight='bold'
                            color={theme.primary}
                        >
                            {
                                `${info?.ahorro > 0 ? 'Bs.' + ' ' + Number(info?.ahorro).toFixed(2) : 'Bs' + ' ' + Saldo}`
                            }
                        </TextStyled>
                }

                <TextStyled
                    fontSize={18}
                    color={theme.primary}
                    style={{
                        fontFamily: 'Gemunu',
                    }}
                >
                    {
                        loadingSkeleton
                            ? 'Buscando...'
                            : 'Saldo'
                    }
                </TextStyled>

                <TextStyled
                    fontSize={23}
                    fontWeight='300'
                    color={theme.primary}
                    style={{
                        marginTop: 10,
                        width: '80%',
                        fontFamily: 'Gemunu',
                    }}
                    numberOfLines={1}
                >
                    {
                        loadingSkeleton
                            ? 'Buscando Datos...'
                            : `${info?.usuarioBean
                                ? info.usuarioBean?.nombres + ' ' + info.usuarioBean?.apellidos
                                    ? info.usuarioBean?.nombres + ' ' + info.usuarioBean?.apellidos
                                    : info.usuarioBean?.nombres + ' '
                                : Nombres + ' '
                            }`
                    }
                </TextStyled>
            </ViewStyled>
        </Animated.View>
    )
}