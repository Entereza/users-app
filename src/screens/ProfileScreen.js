import React, { useState } from 'react'
import { StyleSheet, Share, Linking, Modal, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import ImageStyled from '../components/ui/ImageStyled'
import TextStyled from '../components/ui/TextStyled'
import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import ProfileOptions from '../components/profile/ProfileOptions';
import { __authLogout } from '../redux/actions/authActions';
import adjustFontSize from '../utils/adjustText';
import ProfileOptionSuggestions from '../components/profile/ProfileOptionSuggestions';
import { MaterialIcons } from "@expo/vector-icons";
import ProfileTermsConditions from '../components/Modals/TermsConditionsProfile';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileOptionsPassword from '../components/profile/ProfileOptionsPassword';
import FloatingButton from '../components/Btn/FloatingButton';
import ImageProfile from '../components/profile/ProfileImage';
import { useNavigation } from '@react-navigation/native';
import ProfileOptionsInfo from '../components/profile/ProfileOptionsInfo';
import { fetchWithToken } from '../utils/fetchWithToken';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

export default function ProfileScreen() {

    const navigation = useNavigation()

    const [Nombres, setNombres] = React.useState('');
    const [entereza, setEntereza] = React.useState(false);

    const dispatch = useDispatch()
    const { info } = useSelector(state => state.auth)

    const [closeSesion, setCloseSesion] = useState(false)
    const [closing, setClosing] = useState(false)

    const Code = async () => {
        const nombresUser = await AsyncStorage.getItem('CODE-NOMBRE')

        console.log('UserEnterezaAccount: ', info.entereza)
        if (info.entereza !== null) {
            if (info.entereza !== false) {
                setEntereza(true)
            }
        }

        setNombres(nombresUser)
    }

    React.useEffect(() => {
        Code()
    }, [info])


    const [numberWpp, setNumberWpp] = React.useState('')

    const NumberWp = async () => {
        try {
            const res = await fetchWithToken(`entereza/numero_entereza`, 'GET')

            const { codeError, msgError } = await res.json()

            console.log('Número Disponible para: ', msgError)
            if (codeError === 'COD200') {
                setNumberWpp(msgError)
            }
        } catch (error) {
            console.log('NumberWp Error: ', error)
        }
    }

    React.useEffect(() => {
        NumberWp()
    }, [])


    const onRegisterAccount = async () => {
        Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScgvPQIPtKH7V6ivix01xESDIsdcKZtbJXiznlKScBeoZREPA/viewform?usp=sf_link')
    };

    const RedirectWhatsapp = () => {
        Linking.openURL(numberWpp)
    }

    const handleOnNavigation = () => {
        navigation.navigate('PersonalInfo', { enterezaAccount: entereza, buttonOpen: buttonOpen });
    }

    const onShare = async () => {
        await Share.share({
            message:
                '¡Hola! Quiero invitarte a formar parte de Entereza, con esta aplicación podrás ganar dinero en cada compra que realices. \n\n 📲 Descarga nuestra app en : \n PLAY STORE: https://play.google.com/store/apps/details?id=com.entereza.client \n APP STORE: https://apps.apple.com/bo/app/entereza/id6443708697?l=en',
        });
    };

    const ModalLogout = () => {
        setCloseSesion(true)
    }

    const ModalLogoutClose = () => {
        setCloseSesion(false)
    }

    const handleOnLogout = () => {
        try {
            setCloseSesion(false)

            GoogleSignin.signOut()
            setClosing(true)
            dispatch(__authLogout())
            setClosing(false)
        } catch (error) {
            console.log('Error handleOnLogout', error)

            Alert.alert('No se pudo cerrar la sesión', 'Por favor intente nuevamente en unos minutos')
        }
    }

    const [buttonOpen, setButtonOpen] = React.useState(false)

    const MostrarCompletar = async () => {
        const Sexo = await info.usuarioBean?.sexo;
        const Fecha = await info.usuarioBean?.fecha_nacimiento;
        const Contacto = await info.usuarioBean?.contacto;

        if (Sexo != null && Fecha != null && Contacto != null) {
            setButtonOpen(false)
        } else {
            console.log('Check Info Faltan valores')
            setButtonOpen(true)
        }
    }

    React.useEffect(() => {
        if (info) {
            MostrarCompletar()
        }
    }, [info])


    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ViewStyled
                    width={100}
                    height={100}
                    backgroundColor={theme.background}
                    paddingTop={3}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        marginBottom={3}

                        marginLeftAuto
                        marginRightAuto
                        height={20}
                        width={100}
                        backgroundColor={theme.transparent}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ImageProfile />
                        <TextStyled
                            fontSize={20}
                            fontFamily='BRFirmaBold'
                            fontWeight='bold'
                            color={theme.quaternary}
                            style={{
                                width: '70%',
                                textTransform: 'capitalize',
                                marginTop: 10
                            }}
                            textAlign='center'
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {
                                `${info?.usuarioBean
                                    ? info.usuarioBean?.nombres + ' ' + info.usuarioBean?.apellidos
                                        ? info.usuarioBean?.nombres + ' ' + info.usuarioBean?.apellidos
                                        : info.usuarioBean?.nombres + ' '
                                    : Nombres + ' '
                                }`
                            }
                        </TextStyled>
                        <TextStyled
                            fontSize={14}
                            color={theme.tertiary}
                            textAlign='center'
                            style={{
                                marginTop: 5,
                                marginBottom: '2.5%',
                                width: wp(70),
                            }}
                        >
                            {`${'CI: ' + info?.usuarioBean?.carnet_identidad}`}
                        </TextStyled>
                    </ViewStyled>
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            backgroundColor: theme.transparent,
                        }}
                        showsVerticalScrollIndicator={false}
                        scrollToOverflowEnabled={false}
                    >
                        <ViewStyled
                            marginLeftAuto
                            marginRightAuto
                            width={95}
                            height={85}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'flex-start',
                                alingItems: 'center'
                            }}
                        >
                            <TextStyled
                                color={theme.quaternary}
                                fontSize={16}
                                fontWeight='600'
                                style={{
                                    marginLeft: 10,
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                Configuración de la cuenta
                            </TextStyled>

                            <ProfileOptionsInfo
                                title='Información Personal'
                                onPress={handleOnNavigation}
                            >
                                <MaterialCommunityIcons
                                    name={buttonOpen ? "account-alert" : "information-outline"}
                                    size={adjustFontSize(26)}
                                    color={buttonOpen ? "#FF9085" : '#34B7F1'}
                                    style={{
                                        ...styles.optionIcon,
                                        backgroundColor: buttonOpen ? `${'#FF9085'}30` : `${'#34B7F1'}30`
                                    }}
                                />
                            </ProfileOptionsInfo>

                            {
                                numberWpp !== ''
                                    ?
                                    <ProfileOptions
                                        title='¿Necesitas ayuda?'
                                        onPress={RedirectWhatsapp}
                                    >
                                        <Ionicons
                                            name="logo-whatsapp"
                                            size={adjustFontSize(26)}
                                            color={'#25D366'}
                                            style={{
                                                ...styles.optionIcon,
                                                backgroundColor: `${'#25D366'}30`
                                            }}
                                        />
                                    </ProfileOptions>
                                    : <></>
                            }


                            <ProfileOptions
                                title='Registra tu Empresa/Negocio'
                                onPress={onRegisterAccount}
                            >
                                <Ionicons
                                    name="business"
                                    size={adjustFontSize(26)}
                                    color={theme.secondary}
                                    style={{
                                        ...styles.optionIcon,
                                        backgroundColor: `${theme.secondary}30`
                                    }}
                                />
                            </ProfileOptions>

                            <ProfileTermsConditions />

                            <ProfileOptions
                                title={'Compartir con amigos'}
                                onPress={onShare}
                            >
                                <Ionicons
                                    name="share-social-outline"
                                    size={adjustFontSize(26)}
                                    color={"#F28B8B"}
                                    style={{
                                        ...styles.optionIcon,
                                        backgroundColor: '#F28B8B20',
                                    }}
                                />
                            </ProfileOptions>

                            <ProfileOptions
                                title={'Ayuda / Faqs'}
                                onPress={() => Linking.openURL('https://enterezabol.com/preguntas')}
                            >
                                <Ionicons
                                    name="ios-help-outline"
                                    size={adjustFontSize(26)}
                                    color={"#8BADF2"}
                                    style={{
                                        ...styles.optionIcon,
                                        backgroundColor: '#8BADF220',
                                    }}
                                />
                            </ProfileOptions>

                            <ViewStyled width={95} height={1} backgroundColor={theme.transparent} />

                            <ProfileOptions
                                title={'Cerrar Sesión'}
                                onPress={ModalLogout}
                            >
                                <Feather
                                    name="log-out"
                                    size={adjustFontSize(26)}
                                    color={"#545854"}
                                    style={{
                                        ...styles.optionIcon,
                                        backgroundColor: '#54585415',
                                    }}
                                />
                            </ProfileOptions>
                        </ViewStyled>
                    </ScrollView >
                </ViewStyled>
            </SafeAreaView>

            <Modal
                visible={closeSesion}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    backgroundColor='#000000AA'
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={90}
                        height={25}
                        backgroundColor={theme.primary}
                        borderRadius={2}

                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ViewStyled
                            width={80}
                            height={11}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MaterialIcons
                                name="error"
                                size={25}
                                color={theme.danger}
                            />
                            <TextStyled
                                fontSize={17}
                                textAlign='center'
                                color={theme.quaternary}
                                style={{
                                    marginTop: 5
                                }}
                            >
                                ¿Estas seguro de cerrar sesión?
                            </TextStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={65}
                            height={6}
                            marginTop={1}
                            backgroundColor={theme.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity onPress={ModalLogoutClose} style={{ marginRight: 10 }}>
                                <ViewStyled
                                    width={35}
                                    height={5}
                                    backgroundColor={theme.secondary}
                                    borderRadius={2}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={13}
                                        color={theme.primary}
                                        style={{
                                            marginBottom: 4,
                                            // fontFamily: 'Raleway',
                                        }}>
                                        Cancelar
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleOnLogout}>
                                <ViewStyled
                                    width={38}
                                    height={5}
                                    backgroundColor={theme.danger}
                                    borderRadius={2}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={13}
                                        color={theme.primary}
                                        textAlign={'center'}
                                        style={{
                                            marginBottom: 4,
                                            width: '90%',
                                            // fontFamily: 'Raleway',
                                        }}>
                                        Cerrar Sesión
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        </ViewStyled>
                    </ViewStyled>
                </ViewStyled>
            </Modal>

            <Modal
                visible={closing}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    backgroundColor='#000000AA'
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={70}
                        height={18}
                        backgroundColor='#ffffff'
                        borderRadius={2}

                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontSize={18}
                            textAlign='center'
                            color='#888cf3'
                            style={{
                                marginBottom: 20,
                                width: '90%'
                            }}
                        >
                            Cerrando Sesión...
                        </TextStyled>
                        <ActivityIndicator size="large" color={theme.secondary} />
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>

    )
}


const styles = StyleSheet.create({
    optionIcon: {
        padding: '2%',
        marginRight: '3%',
        borderRadius: 10,
    }
})
