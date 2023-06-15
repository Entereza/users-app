import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchWithToken } from '../../utils/fetchWithToken'
import { theme } from '../../utils/theme'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled'
import WalletSalesItem from './WalletSalesItem'
import { Skeleton, HStack, Center, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';

import { __authGetInfo } from '../../redux/actions/authActions';
import { ScrollView } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import NotificationSales from './NotificationSales';

const SinCompras = `Aún no compraste con Entereza. \n¡No te quedes atrás y ve a nuestros negocios!`
const ConCompras = `¡Sigue ganando con Entereza!`

export default function WalletSales({ reload, handleRefresh }) {
    const SkeletonVentas = () => {
        return (
            <NativeBaseProvider>
                <Center w="100%" paddingTop={3}>
                    <HStack marginBottom={2} backgroundColor={theme.primary} w="95%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={2} backgroundColor={theme.primary} w="95%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={2} backgroundColor={theme.primary} w="95%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={2} backgroundColor={theme.primary} w="95%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    };
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const [page, setPage] = useState(0)
    const [sales, setSales] = useState([])
    const [loadingSkeleton, setLoadingSkeleton] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [comprasUser, setComprasUser] = useState(true)

    const nextPage = () => {
        setPage(page + 1)
    }

    const handleOnModal = () => {
        navigation.navigate('WalletTransactions')
    };

    const [promocionInicial, setPromocionInicial] = React.useState('')
    const [horasRestantes, setHorasRestantes] = React.useState(null)
    const [numeroUsuarios, setNumeroUsuarios] = React.useState('')

    const Ventas = async () => {
        setLoading(true)
        try {
            const codUser = await AsyncStorage.getItem('ENT-CODUSR')

            const res = await fetchWithToken('entereza/ventas_user', "POST", {
                //USR-368831b9
                codigoUsuario: `${codUser}`,
                pageNo: `${page}`
            })

            const { entereza, ventaUsuario, imgEmpresas, promocionInicial, horasRestantesPromocionInicial, numeroUsuarios } = await res.json()

            const numeroVentas = ventaUsuario.length;

            console.log('Page Nro: ', page, ' - Ventas Usuario: ', numeroVentas, '- Compras User: ', comprasUser)

            if (numeroVentas === 0) {
                setHasMore(false)
                if (page === 0) {
                    setComprasUser(false)
                    setPromocionInicial(promocionInicial)
                    setHorasRestantes(horasRestantesPromocionInicial)
                    setNumeroUsuarios(numeroUsuarios)
                }
            } else {
                if (entereza.codeError === 'COD200') {
                    setComprasUser(true)
                    let newSale = ventaUsuario.map((sale) => {
                        let imgSale = imgEmpresas.find(
                            (img) => img.codigoEmpresa === sale.userVentDetail.codigoEmpresa
                        );

                        sale.img = imgSale ? { uri: `${imgSale.imgEmpresa}` } : require('../../assets/business/01.png')

                        return sale;
                    })

                    setSales(prev => [...prev, ...newSale])
                } else {
                    console.log("Wallet Sales Error: ", entereza)
                }
            }
        } catch (error) {
            console.log("Wallet Sales Error: ", error);
        }
        setLoadingSkeleton(false)
        setLoading(false)

        handleRefresh()
    }

    const onRefresh = () => {
        setPage(0)
        setRefreshing(true)
        setSales([])
        setLoadingSkeleton(true)
        setTimeout(() => {
            dispatch(__authGetInfo())
            console.log('Reloading Page Wallet Screen... ', page)
            Ventas()
        }, 1000);
        setRefreshing(false)
    }

    const onRefreshWallet = () => {
        setPage(0)
        setSales([])
        setLoadingSkeleton(true)
        setTimeout(() => {
            console.log('Reloading Page Wallet Screen... ', page)
            Ventas()
        }, 1000);
    }

    useEffect(() => {
        if (reload !== true) {
            if (hasMore === true) {
                Ventas()
            }
        }
    }, [page])

    useEffect(() => {
        if (reload === true) {
            onRefreshWallet()

        }
    }, [reload])

    return (
        <ViewStyled
            width={100}
            height={57}
            backgroundColor={theme.primary}
            paddingTop={2.5}
            style={{
                // ...customStyles.shadowStyle,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
            }}
        >
            <ViewStyled
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
                width={87}
                height={5}
                marginLeftAuto
                marginRightAuto
                backgroundColor={theme.transparent}
            >
                <TextStyled
                    fontSize={15}
                    fontFamily='BRFirmaBold'
                    fontWeight='bold'
                    color={theme.quaternary}

                >
                    {
                        comprasUser ? 'Transacciones' : 'Notificaciones'
                    }
                </TextStyled>

                {
                    comprasUser
                        ? <TextStyled
                            fontSize={15}
                            fontWeight='400'
                            color={theme.tertiary}
                            onPress={handleOnModal}
                            style={{
                                textDecorationLine: 'underline',
                                textDecorationColor: theme.tertiary,
                            }}
                        >
                            Ver todo
                        </TextStyled>
                        : <></>
                }
            </ViewStyled>

            <ViewStyled
                width={95}
                height={45}
                marginLeftAuto
                marginRightAuto
                backgroundColor={theme.background}
                style={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ScrollView
                    horizontal={true}
                    scrollEnabled={false}
                    contentContainerStyle={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}
                >
                    {loadingSkeleton
                        ? SkeletonVentas()
                        : comprasUser
                            ? <FlatList
                                scrollEnabled={true}
                                contentContainerStyle={{
                                    paddingBottom: heightPercentageToDP(15)
                                }}
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                data={sales}
                                keyExtractor={sales.userVentDetail}
                                renderItem={({ item }) =>
                                    <WalletSalesItem item={item} />
                                }
                                numColumns={1}
                                onEndReachedThreshold={0.7}
                                onEndReached={sales.length > 3 ? nextPage : null}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                                ListFooterComponent={() => (
                                    loading
                                        ? <ViewStyled
                                            width={90}
                                            height={7}
                                            backgroundColor={theme.transparent}
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                            }}
                                        >
                                            <ActivityIndicator size="large" color={theme.secondary} />
                                        </ViewStyled>
                                        : <ViewStyled
                                            width={90}
                                            height={6}
                                            backgroundColor={theme.transparent}
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <TextStyled
                                                fontSize={14}
                                                fontWeight='400'
                                                color={theme.tertiary}
                                                textAlign='center'
                                                style={{
                                                    width: '90%'
                                                }}
                                            >
                                                {ConCompras}
                                            </TextStyled>
                                        </ViewStyled>

                                )}
                            />
                            : <NotificationSales promocionInicial={promocionInicial} horas={horasRestantes} numeroUsuarios={numeroUsuarios} refresh={onRefresh} />
                    }
                </ScrollView>
            </ViewStyled>
        </ViewStyled >
    )
}