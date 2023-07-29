import * as React from 'react'

import { ScrollView, RefreshControl, Modal, } from 'react-native'

import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import ImageStyled from '../components/ui/ImageStyled'
import TextStyled from '../components/ui/TextStyled'
import { Ionicons } from '@expo/vector-icons'
import { _authSetLocation } from '../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native'
import adjustFontSize from '../utils/adjustText'
import { ImageBackground } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import SucursalItem from '../components/business/SucursalItem'
import { codeErrors } from '../utils/codeErrors'
import { fetchWithToken, fetchWithToken4 } from '../utils/fetchWithToken'
import { Skeleton, Box, HStack, NativeBaseProvider } from "native-base";
import { useSelector } from 'react-redux'
import ButtonMenu from '../components/Btn/ButtonMenu'
import Pdf from 'react-native-pdf'

export default function BusinessInfo({ route }) {
    const { data } = route.params;
    const { location } = useSelector(state => state.auth);

    const navigation = useNavigation()

    const { codigoEmpresa, ahorro, background, img, nombre } = data;

    const [loadingSkeleton, setLoadingSkeleton] = React.useState(true)
    const [showMenu, setShowMenu] = React.useState('none')

    const [urlMenu, setUrlMenu] = React.useState('')

    const GetMenuPdf = async () => {
        try {
            console.log(data)
            const res = await fetchWithToken4(`menus-ms/menu-get?codigoEmpresa=${codigoEmpresa}`, 'GET')

            const { urlMenu, entereza } = await res.json()

            console.log('Entereza Response: ', entereza, '- ', urlMenu)

            if (entereza.codeError === 'COD200' && urlMenu.length > 0) {
                setUrlMenu(urlMenu[0])
                setShowMenu('flex')
            } else {
                setShowMenu('none')
                setUrlMenu('')
            }
        } catch (error) {
            console.log('Error on GetMenu: ', error)
        }
    }

    const openPdf = () => {
        setModal(!modal)
    }

    React.useEffect(() => {
        if (codigoEmpresa) {
            console.log('Codigo Empresa: ', codigoEmpresa)
            GetMenuPdf()
        }
    }, [data])

    const SkeletonSucursals = () => {
        return (
            <NativeBaseProvider>
                <Box w="100%" alignItems={'center'} >
                    <HStack marginBottom={heightPercentageToDP(0.5)} backgroundColor={theme.primary} w={widthPercentageToDP(94)} h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="12" marginLeft={"-2"} />
                    </HStack>

                    <HStack marginBottom={heightPercentageToDP(0.5)} backgroundColor={theme.primary} w={widthPercentageToDP(94)} h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="12" marginLeft={"-2"} />
                    </HStack>

                    <HStack marginBottom={heightPercentageToDP(0.5)} backgroundColor={theme.primary} w={widthPercentageToDP(94)} h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="12" marginLeft={"-2"} />
                    </HStack>

                    <HStack backgroundColor={theme.primary} w={widthPercentageToDP(94)} h={heightPercentageToDP(11)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton speed={1} w={widthPercentageToDP(13)} h={heightPercentageToDP(6)} rounded="lg" startColor={theme.skeleton} endColor={theme.secondary} />

                        <Skeleton.Text speed={1} lines={2} alignItems="center" px="12" marginLeft={"-2"} />
                    </HStack>
                </Box>
            </NativeBaseProvider>
        )
    }

    const SkeletonDescription = () => {
        return (
            <NativeBaseProvider>
                <Box w="100%" alignItems={'flex-start'} justifyContent={'center'}>
                    <HStack backgroundColor={theme.primary} w={widthPercentageToDP(93)} h={heightPercentageToDP(10)} borderWidth="1" space={1} rounded="lg" _dark={{
                        borderColor: "coolGray.500"
                    }} _light={{
                        borderColor: "coolGray.200"
                    }} p="4">
                        <Skeleton.Text speed={1} lines={2} alignItems="center" w={widthPercentageToDP(88)} marginLeft={"-2"} />
                    </HStack>
                </Box>
            </NativeBaseProvider>
        )
    }

    const [sucursalData, setSucursalData] = React.useState([])

    const getInfoSucursals = async () => {
        setLoadingSkeleton(true)
        try {
            setSucursalData([]);

            const lat = await location.coords?.latitude
            const lng = await location.coords?.longitude

            let res = await fetchWithToken(
                `entereza/emp_filt?patron=${codigoEmpresa}&opcion=7&pageno=0&size=20&ciudad=&categoria=&lat=${lat}&lng=${lng}`,
                "GET"
            );

            const { entereza, lista_empresas, lista_empresas_img, horarios, codKilometros } = await res.json();

            if (entereza.codeError === codeErrors.cod200) {
                let newSucursal = lista_empresas.map((sucursal) => {
                    let imgBusiness = lista_empresas_img.find((img) => img.codigoEmpresa === sucursal.codigoEmpresa);
                    let horariosEmpresa = horarios.find((h) => h.codigoEmpresa === sucursal.codigoEmpresa);
                    let codKm = codKilometros.find((k) => k.codigoEmpresa === sucursal.codigoEmpresa);

                    sucursal.img = imgBusiness ? { uri: `${imgBusiness.imgEmpresa}` } : require('../assets/business/01.png');
                    sucursal.horarios = horariosEmpresa ? horariosEmpresa.estado : 'empty';
                    sucursal.codKm = codKm ? codKm.km : Number.MAX_SAFE_INTEGER;

                    return sucursal;
                });

                newSucursal.sort((a, b) => {
                    // Si la empresa A tiene link de WhatsApp y la empresa B no, A va primero
                    if (a.wpp && !b.wpp) {
                        return -1;
                    } else if (!a.wpp && b.wpp) { // Si la empresa B tiene link de WhatsApp y la empresa A no, B va primero
                        return 1;
                    } else { // Si ambas empresas tienen o no tienen link de WhatsApp, se compara por horarios
                        if (a.horarios === true && b.horarios !== true) { // true antes que 'empty' y false
                            return -1;
                        } else if (a.horarios !== true && b.horarios === true) { // true antes que 'empty' y false
                            return 1;
                        } else if (a.horarios === false && b.horarios === 'empty') { // false antes que 'empty'
                            return -1;
                        } else if (a.horarios === 'empty' && b.horarios === false) { // false antes que 'empty'
                            return 1;
                        } else { // Si los horarios son iguales, se compara por kilometraje
                            return a.codKm - b.codKm;
                        }
                    }
                });

                setSucursalData((prev) => [...prev, ...newSucursal]);
            } else {
                console.log("Error entereza BusinessInfo");
            }
        } catch (error) {
            console.log("Error entereza BusinessInfo", error);
        }
        setLoadingSkeleton(false)
    };

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = () => {
        setRefreshing(true)
        getInfoSucursals()
        setTimeout(() => { setRefreshing(false) }, 800);
    }

    React.useEffect(() => {
        if (location.ubication !== null) {
            getInfoSucursals()
        }
    }, [location])

    const [modal, setModal] = React.useState(false);

    const handleOnModal = async () => {
        setModal(!modal)
    };

    const styles = {
        pdf: {
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(92),
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: theme.transparent
                }}
                showsVerticalScrollIndicator={false}
                scrollToOverflowEnabled={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

                }
            >
                <ViewStyled
                    backgroundColor={theme.transparent}
                    width={100}
                    height={sucursalData.length > 4 ? 65 + (12.5 * sucursalData.length) : 110}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ImageBackground
                        source={background}
                        style={{
                            width: widthPercentageToDP(100),
                            height: heightPercentageToDP(22),
                            position: 'relative',
                            resizeMode: 'cover',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginBottom: heightPercentageToDP(2.5)
                        }}
                    >
                        <ViewStyled
                            width={96.5}
                            backgroundColor={theme.transparent}
                            height={5}
                            style={{
                                bottom: heightPercentageToDP(1),
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <ViewStyled
                                width={10}
                                backgroundColor={theme.primary}
                                height={5}
                                borderRadius={1}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={adjustFontSize(28)}
                                    color={theme.black}
                                    onPress={() => navigation.goBack()}
                                />
                            </ViewStyled>
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme.transparent}
                            width={100}
                            height={9}
                            style={{
                                top: widthPercentageToDP(14),
                                justifyContent: 'flex-end',
                                alignItems: 'flex-start',
                                zIndex: 1
                            }}
                        >
                            <ViewStyled
                                backgroundColor={theme.transparent}
                                marginLeft={6}
                                borderRadius={'50%'}
                                width={20}
                                height={20}
                                style={{
                                    maxHeight: 70,
                                    maxWidth: 70,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 0.5,
                                    borderColor: `${theme.dark}55`,
                                }}
                            >
                                <ImageStyled
                                    source={img}
                                    borderRadius={'50%'}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </ViewStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={90}
                            backgroundColor={theme.primary}
                            height={3.5}
                            style={{
                                top: heightPercentageToDP(3.3),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomLeftRadius: 20,
                            }}
                        >
                            <TextStyled
                                fontFamily='BRFirmaBold'
                                fontSize={18}
                                color={theme.dark}
                            >
                                {ahorro}% Cashback
                            </TextStyled>
                        </ViewStyled>
                    </ImageBackground>

                    <ViewStyled
                        width={94.5}
                        height={10}
                        marginTop={3}
                        backgroundColor={theme.transparent}
                        borderRadius={2}
                        paddingHorizontal={2}
                    >
                        {
                            loadingSkeleton
                                ? SkeletonDescription()
                                : <>
                                    <TextStyled
                                        fontFamily='BRFirmaBold'
                                        textAlign='left'
                                        fontSize={15}
                                        color={theme.secondary}
                                    >
                                        Dato Enterezante:
                                    </TextStyled>
                                    <TextStyled
                                        textAlign='left'
                                        fontSize={13}
                                        color={theme.quaternary}
                                    >
                                        {`Sabías que N-T, el asistente de Entereza no tarda más de 5 segundos en responderte por Whatsapp. ¿No nos crees? ¡Intentalo!`}
                                    </TextStyled>
                                </>
                        }
                    </ViewStyled>

                    <ViewStyled
                        width={100}
                        marginTop={1}
                        height={sucursalData.length >= 4 ? 2 + (12.5 * sucursalData.length) : 50}
                        backgroundColor={theme.transparent}
                        marginBottom={1}
                        paddingVertical={1}
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        {
                            loadingSkeleton
                                ? SkeletonSucursals()
                                : sucursalData.map((item) => (
                                    <SucursalItem key={item.codigoEmpresa} item={item} />
                                ))

                        }
                    </ViewStyled>
                </ViewStyled>
            </ScrollView>

            <ButtonMenu onPress={openPdf} showButton={showMenu} />

            <Modal
                animationType="slide"
                transparent={false}
                visible={modal}
                onRequestClose={handleOnModal}
            >
                <ViewStyled
                    backgroundColor={theme.primary}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme.transparent}
                        paddingHorizontal={4}
                        height={7}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }}
                    >
                        <Ionicons
                            name="arrow-back-outline"
                            size={adjustFontSize(28)}
                            color={theme.quaternary}
                            style={{
                                marginRight: 'auto',
                            }}
                            onPress={handleOnModal}
                        />

                        <TextStyled
                            textAlign={'center'}
                            fontFamily='ArtegraBold'
                            fontSize={18}
                            style={{
                                marginRight: 'auto'
                            }}
                            fontWeight='500'
                            color={theme.quaternary}
                        >
                            {
                                `Menú de ${nombre}`
                            }
                        </TextStyled>
                    </ViewStyled>

                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: urlMenu, cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf}

                    />
                </ViewStyled>
            </Modal>
        </>

    )
}