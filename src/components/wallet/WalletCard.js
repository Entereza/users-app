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

export default function WalletCard({ reload }) {
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
                        <Skeleton speed={1} w={100} h={heightPercentageToDP(4)} rounded="lg" startColor={theme.primary} endColor={theme.transparent}/>
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
        <SafeAreaView style={{ backgroundColor: theme.transparent }}>
            <ImageBackground
                source={require('../../assets/wallet/WalletCard.png')}
                resizeMode="stretch"
                style={{
                    width: widthPercentageToDP(92),
                    height: widthPercentageToDP(57),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(0.5),
                    paddingHorizontal: widthPercentageToDP(7),
                    paddingVertical: heightPercentageToDP(2),
                    position: 'relative',
                    overflow: 'hidden',
                    borderWidth: 2.5,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderColor: '#2a2a2a22',
                }}
            >
                <ViewStyled
                    width={90 - 8}
                    backgroundColor={theme.transparent}
                    height={13}
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                    }}
                    marginTopAuto
                    marginLeft={-2}
                >
                    <ViewStyled
                        width={68}
                        backgroundColor={theme.transparent}
                        height={13}
                        style={{
                            justifyContent: 'flex-end',
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
                            fontWeight='400'
                            color={theme.primary}
                            style={{
                                fontFamily: 'Gemunu',
                            }}
                        >
                            Saldo
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
                </ViewStyled>
            </ImageBackground>
        </SafeAreaView>
    )
}