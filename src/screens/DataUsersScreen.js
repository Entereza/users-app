import React from 'react'
import { Animated } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import { __authGetInfo, __authLogout } from '../redux/actions/authActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import CiUser from '../components/Users/CiUser';
import DateUser from '../components/Users/DateUser';
import NumberUser from '../components/Users/NumberUser';
import GenderUser from '../components/Users/GenderUser';
import { fetchWithToken, fetchWithToken2 } from '../utils/fetchWithToken';

export default function DataUsers() {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    // Variable para guardar la data del usuario
    const [userData, setUserData] = React.useState({
        carnet: '',
        contacto: '',
        fecha_nacimiento: '',
        sexo: '',
    });

    // Variables para mostrar u ocultar los componentes
    const [ciUserDisplay, setCiUserDisplay] = React.useState('none');
    const [numberUserDisplay, setNumberUserDisplay] = React.useState('none');
    const [dateUserDisplay, setDateUserDisplay] = React.useState('none');
    const [genderUserDisplay, setGenderUserDisplay] = React.useState('none');

    //Variables para la Animacion de los componentes
    const [CiOpacity] = React.useState(new Animated.Value(0));
    const ciRef = React.useRef(CiOpacity);

    const [NumberOpacity] = React.useState(new Animated.Value(0));
    const numberRef = React.useRef(NumberOpacity);

    const [DateOpacity] = React.useState(new Animated.Value(0));
    const dateRef = React.useRef(DateOpacity);

    const [GenderOpacity] = React.useState(new Animated.Value(0));
    const genderRef = React.useRef(GenderOpacity);

    // OutputRange of Components for Animations
    const [outputRangeCi, setOutputRangeCi] = React.useState(0);
    const [outputRangeCi2, setOutputRangeCi2] = React.useState(0);

    const [outputRangeNumber, setOutputRangeNumber] = React.useState(0);
    const [outputRangeNumber2, setOutputRangeNumber2] = React.useState(0);

    const [outputRangeDate, setOutputRangeDate] = React.useState(0);
    const [outputRangeDate2, setOutputRangeDate2] = React.useState(0);

    const [outputRangeGender, setOutputRangeGender] = React.useState(0);
    const [outputRangeGender2, setOutputRangeGender2] = React.useState(0);

    // Saber cual es el primer componente a mostrar
    const [firstComponent, setFirstComponent] = React.useState(null);

    // Ver la siguiente pantalla
    const goNextScreenFunctions = {
        carnet: async () => {
            setErrorCarnet(false)
            setMsgErrorCarnet('')

            if (userData.carnet === null || userData.carnet === '') {
                const isInitialComponent = firstComponent === 'carnet';

                const outputRange1 = isInitialComponent ? setOutputRangeCi2 : setOutputRangeCi;
                const outputRange2 = isInitialComponent ? setOutputRangeCi : setOutputRangeCi2;

                if (userData.contacto === null || userData.contacto === '') {
                    return await goNextScreen(ciRef, 1, numberRef, 1, outputRange1, outputRange2, setOutputRangeNumber, setCiUserDisplay, setNumberUserDisplay);
                } else if (userData.fecha_nacimiento === null || userData.fecha_nacimiento === '') {
                    return await goNextScreen(ciRef, 1, dateRef, 1, outputRange1, outputRange2, setOutputRangeDate, setCiUserDisplay, setDateUserDisplay);
                } else if (userData.sexo === null || userData.sexo === '') {
                    return await goNextScreen(ciRef, 1, genderRef, 1, outputRange1, outputRange2, setOutputRangeGender, setCiUserDisplay, setGenderUserDisplay);
                } else {
                    console.log('Todos los valores están completos (Menos CI)', userData)
                }
            } else {
                return await goNextScreenFunctions.contacto();
            }
        },
        contacto: async () => {
            const isInitialComponent = firstComponent === 'contacto';

            const outputRange1 = isInitialComponent ? setOutputRangeNumber2 : setOutputRangeNumber;
            const outputRange2 = isInitialComponent ? setOutputRangeNumber : setOutputRangeNumber2;

            if (userData.contacto === null || userData.contacto === '') {
                if (userData.fecha_nacimiento === null || userData.fecha_nacimiento === '') {
                    return await goNextScreen(numberRef, 1, dateRef, 1, outputRange1, outputRange2, setOutputRangeDate, setNumberUserDisplay, setDateUserDisplay);
                } else if (userData.sexo === null || userData.sexo === '') {
                    return await goNextScreen(numberRef, 1, genderRef, 1, outputRange1, outputRange2, setOutputRangeGender, setNumberUserDisplay, setGenderUserDisplay);
                }
            } else {
                return await goNextScreenFunctions.fecha_nacimiento();
            }
        },
        fecha_nacimiento: async () => {
            if (userData.fecha_nacimiento === null || userData.fecha_nacimiento === '') {
                const isInitialComponent = firstComponent === 'fecha_nacimiento';

                const outputRange1 = isInitialComponent ? setOutputRangeDate2 : setOutputRangeDate;
                const outputRange2 = isInitialComponent ? setOutputRangeDate : setOutputRangeDate2;

                if (userData.sexo === null || userData.sexo === '') {
                    return await goNextScreen(dateRef, 1, genderRef, 1, outputRange1, outputRange2, setOutputRangeGender, setDateUserDisplay, setGenderUserDisplay);
                } else {
                    return await goNextScreenFunctions.sexo();
                }
            } else {
                return await goNextScreenFunctions.sexo();
            }
        },
        sexo: async () => {
            console.log('Completados, tas en Setso')
            // return await goErrorScreen(numberRef, 0, setNumberUserDisplay, setOutputRangeNumber, setOutputRangeNumber2)
            /*No se necesita hacer una transición a una nueva pantalla aquí*/
        },
    };

    // Animations for the Components
    const goNextScreen = (componentActual, valueActual, componentForShow, valueShow, setOutputRangeActual, setOutputRangeActual2, setOutputRangeNext, setActualDisplay, setNextDisplay) => {
        try {
            console.log('goNextScreen... ', componentForShow)
            Keyboard.dismiss()

            setOutputRangeActual(-400);
            setOutputRangeActual2(0);

            setOutputRangeNext(400)

            setTimeout(() => {
                setActualDisplay('none');
                setNextDisplay('flex');
            }, 300);

            Animated.sequence([
                Animated.timing(componentActual.current, {
                    toValue: valueActual,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(componentForShow.current, {
                    toValue: valueShow,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } catch (error) {
            console.log('Error on goNextScreen: ', error)
        }
    };

    // Volver a la pantalla que contenga error
    const goErrorScreen = (errorScreen, valueError, setDisplayErrorScreen, setOutputRangeActual, setOutputRangeActual2) => {
        setOutputRangeActual(0);
        setOutputRangeActual2(-400);

        setDisplayErrorScreen('flex');
        Animated.sequence([
            Animated.timing(errorScreen.current, {
                toValue: valueError,
                duration: 300,
                delay: 100,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const goWalletScreen = () => {
        setGenderUserDisplay('none');
        navigation.navigate('WalletStack', {
            screen: 'WalletScreen', // El nombre de la pantalla dentro de WalletStack
            initial: false, // Esto es necesario para garantizar que los parámetros de la pantalla se pasen correctamente
            params: { firstTime: true }, // Parámetros para WalletScreen
        });
    }

    // Variables para el envío de los datos del usuario

    // Crear el array datosModal
    let datosModal = [];

    const PushDataModal = async () => {
        for (const [key, value] of Object.entries(userData)) {
            // Verificar si el valor es distinto de true
            if (value !== true) {
                // Construir el objeto id y valor
                const obj = {
                    id: key,
                    valor: value
                };

                // Agregar el objeto al array datosModal
                datosModal.push(obj);
                console.log('Datos: ', obj)
            }
        }

        // Verificar si todos los datos se han guardado en datosModal
        let lengthUserData = Object.keys(userData).length - Object.values(userData).filter(value => value === true).length
        console.log('DatosSend', datosModal.length, '- ', lengthUserData)

        if (datosModal.length === lengthUserData) {
            if (!postComplete) {
                SendDataUser(); // Llamar a SendDataUser cuando todos los datos estén guardados
            }
        }
    };

    const [errorCarnet, setErrorCarnet] = React.useState(false);
    const [postComplete, setPostComplete] = React.useState(false);
    const [msgErrorCarnet, setMsgErrorCarnet] = React.useState('');

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const SendDataUser = async () => {
        setIsSubmitting(true)
        setPostComplete(true)
        console.log('Starts Sending Data User')
        try {
            const emailUser = await info.usuarioBean?.mail

            let dataSend = {
                correo: emailUser,
                datosModal: datosModal
            };

            console.log('Datos para la petición: ', dataSend)

            const res = await fetchWithToken2('entereza/user_data_modal', 'POST', dataSend)
            const {
                codeError,
                msgError
            } = await res.json()

            if (codeError === 'COD200') {
                console.log('Datos Guardados: ', codeError, msgError)

                setTimeout(() => {
                    console.log('Starts goWalletScreen()')
                    goWalletScreen()
                }, 1000)
            } else if (codeError === 'COD575') {
                setIsSubmitting(false)
                setPostComplete(false)

                datosModal = []
                setErrorCarnet(true)
                setMsgErrorCarnet('El carnet ingresado ya está en uso.')
                goErrorScreen(ciRef, 0, setCiUserDisplay, setOutputRangeCi, setOutputRangeCi2)
                console.log('Error al guardar el carnet: ', codeError, '- ', msgError, '- ', userData.carnet)
            } else {
                setIsSubmitting(false)
                setPostComplete(false)

                console.log('Error al guardar los datos: ', codeError, msgError)
            }
        } catch (error) {
            setIsSubmitting(false)
            setPostComplete(false)

            console.log('Error on SendDataUser: ', error)
        }
    }

    // Verificar que todos los datos estén llenos
    React.useEffect(() => {
        if (!errorCarnet) {
            if (userData.carnet && userData.fecha_nacimiento && userData.contacto && userData.sexo) {
                PushDataModal()

                console.log('Datos completados: ', userData)
            } else {
                console.log('Aún está completando los datos.', userData)
            }
        } else {
            console.log('Hay un error en el carnet.')
        }
    }, [userData, datosModal, errorCarnet, postComplete])

    // Verificar que tiene y qué no tiene el usuario
    const { info } = useSelector(state => state.auth);

    const verifyDataUser = async () => {
        try {
            const CI = await info.usuarioBean?.carnet_identidad;
            const Numero = await info.usuarioBean?.contacto;
            const Fecha = await info.usuarioBean?.fecha_nacimiento;
            const Sexo = await info.usuarioBean?.sexo;

            setUserData({
                carnet: CI ? true : '',
                contacto: Numero ? true : '',
                fecha_nacimiento: Fecha ? true : '',
                sexo: Sexo ? true : '',
            });

            if (CI === null || CI === '') {
                setCiUserDisplay('flex');
                setFirstComponent('carnet');
            } else if (Numero === null || Numero === '') {
                setNumberUserDisplay('flex');
                setFirstComponent('contacto');
            } else if (Fecha === null || Fecha === '') {
                setDateUserDisplay('flex');
                setFirstComponent('fecha_nacimiento');
            } else if (Sexo === null || Sexo === '') {
                setGenderUserDisplay('flex');
                setFirstComponent('sexo');
            } else {
                console.log('Esta pantalla no deberia salir porque todos los datos están presentes')
                setUserData({ carnet: CI, contacto: Numero, fecha_nacimiento: Fecha, sexo: Sexo });
            }
        } catch (error) {
            console.log('Error verifyDataUser: ', error)
        }
    };

    React.useEffect(() => {
        if (info.usuarioBean !== null) {
            verifyDataUser()
        }
    }, [info])

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.dark }}>
                <ViewStyled
                    width={100}
                    height={100}
                    backgroundColor={theme.dark}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <CiUser
                        display={ciUserDisplay}
                        CiUserOpacity={CiOpacity}
                        goNextScreen={goNextScreenFunctions["carnet"]}
                        outputRange={outputRangeCi}
                        outputRange2={outputRangeCi2}
                        setCiUser={(carnet) => setUserData({ ...userData, carnet })}
                        errorCarnet={errorCarnet}
                        msgErrorCarnet={msgErrorCarnet}
                        isSubmitting={isSubmitting}
                    />

                    <NumberUser
                        display={numberUserDisplay}
                        NumberUserOpacity={NumberOpacity}
                        goNextScreen={goNextScreenFunctions["contacto"]}
                        outputRange={outputRangeNumber}
                        outputRange2={outputRangeNumber2}
                        setNumberUser={(contacto) => setUserData({ ...userData, contacto })}
                        isSubmitting={isSubmitting}
                    />

                    <DateUser
                        display={dateUserDisplay}
                        DateUserOpacity={DateOpacity}
                        goNextScreen={goNextScreenFunctions["fecha_nacimiento"]}
                        outputRange={outputRangeDate}
                        outputRange2={outputRangeDate2}
                        setDateUser={(fecha_nacimiento) => setUserData({ ...userData, fecha_nacimiento })}
                        isSubmitting={isSubmitting}
                    />

                    <GenderUser
                        display={genderUserDisplay}
                        GenderUserOpacity={GenderOpacity}
                        goNextScreen={goNextScreenFunctions["sexo"]}
                        outputRange={outputRangeGender}
                        outputRange2={outputRangeGender2}
                        setGenderUser={(sexo) => setUserData({ ...userData, sexo })}
                        isSubmitting={isSubmitting}
                    />
                </ViewStyled>
            </SafeAreaView>
        </>
    )
}