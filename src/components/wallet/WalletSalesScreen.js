import React from 'react'
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native'


import { theme } from '../../utils/theme';
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled';
import WalletSalesItem from './WalletSalesItem';
import { Skeleton, HStack, Center, NativeBaseProvider } from "native-base";
import { fetchWithToken } from '../../utils/fetchWithToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const SinCompras = `Aún no compraste con Entereza \n¡No te quedes atrás y ve a nuestros negocios!`
const ConCompras = `¡Sigue ganando con Entereza!`

export default function WalletSalesScreen() {
    const SkeletonVentas = () => {
        return (
            <NativeBaseProvider>
                <Center w="90%">
                    <HStack marginBottom={3} backgroundColor={theme.primary} w="90%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={3} backgroundColor={theme.primary} w="90%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={3} backgroundColor={theme.primary} w="90%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={3} backgroundColor={theme.primary} w="90%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={3} backgroundColor={theme.primary} w="90%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={3} backgroundColor={theme.primary} w="90%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="10" marginLeft={"-2"} />
                    </HStack>
                    <HStack marginBottom={3} backgroundColor={theme.primary} w="90%" h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
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

    const [page, setPage] = React.useState(0)
    const [dataSales, setDataSales] = React.useState('')
    const [loadingSkeleton, setLoadingSkeleton] = React.useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    const [hasMore, setHasMore] = React.useState(true)
    const [comprasUser, setComprasUser] = React.useState(true)

    const nextPage = () => {
        setPage(page + 1)
    }

    const Ventas = async () => {
        setLoading(true)
        try {

            const codUser = await AsyncStorage.getItem('ENT-CODUSR')

            const res = await fetchWithToken('entereza/ventas_user', "POST", {
                codigoUsuario: codUser,
                pageNo: `${page}`
            })

            const { entereza, ventaUsuario, imgEmpresas } = await res.json()

            let numeroVentas = ventaUsuario.length;

            if (entereza.codeError === 'COD200') {
                console.log('Page Nro: ', page, ' - Ventas Usuario: ', numeroVentas)

                if (numeroVentas !== 0) {
                    setComprasUser(true)
                    let newSale = ventaUsuario.map((sale) => {
                        let imgSale = imgEmpresas.find(
                            (img) => img.codigoEmpresa === sale.userVentDetail.codigoEmpresa
                        );

                        sale.img = !!imgSale ? { uri: `${imgSale.imgEmpresa}` } : require('../../assets/business/01.png')

                        return sale;
                    })

                    setDataSales(prev => [...prev, ...newSale])
                } else {
                    if (page === 0) {
                        setComprasUser(false)
                    }
                    setHasMore(false)
                }
            } else {
                console.log("Wallet Sales Error: ", entereza)
            }
        } catch (error) {
            console.log("Wallet Sales Error: ", error);
        }
        setLoadingSkeleton(false)
        setLoading(false)
    }

    const onRefresh = () => {
        setRefreshing(true)
        setLoadingSkeleton(true)
        Ventas()
        console.log('Reloading Page Wallet Screen... ')
        setRefreshing(false)
    }

    React.useEffect(() => {
        if (hasMore === true) {
            Ventas()
        }
    }, [page])

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={100}
                height={110}
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                {loadingSkeleton
                    ? SkeletonVentas()
                    : <FlatList
                        contentContainerStyle={{
                            paddingBottom: comprasUser ? heightPercentageToDP(30) : 0
                        }}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={dataSales}
                        renderItem={({ item }) => <WalletSalesItem item={item} key={item.userVentDetail} />}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        numColumns={1}
                        onEndReachedThreshold={0.7}
                        onEndReached={nextPage}
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
                                : comprasUser
                                    ? <ViewStyled
                                        width={90}
                                        height={7}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}
                                        marginLeftAuto
                                        marginRightAuto
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
                                    : <ViewStyled
                                        width={90}
                                        height={70}
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
                                            {SinCompras}
                                        </TextStyled>
                                    </ViewStyled>
                        )}
                    />
                }
            </ViewStyled>
        </>
    )
}