import React from 'react'
import Toast from "react-native-toast-message";

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { Animated, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import adjustFontSize from '../../utils/adjustText';
import { useDispatch } from 'react-redux';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import { useFormik } from 'formik';
import { schemaRegister } from '../../utils/schemas';
import { Input, Icon, Button } from '@rneui/themed';
import ButtonNext from '../Btn/ButtonNext';
import { codeErrors } from '../../utils/codeErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _authLogin } from '../../redux/actions/authActions';
import { Keyboard } from 'react-native';

export default function RegisterComponent({ display = 'none', registerOpacity, registerRef, outputRange, goBack }) {
    const [animation] = React.useState(new Animated.Value(0));
    const animationRef = React.useRef(animation);

    const [arrowDisplay, setArrowDisplay] = React.useState('none')

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [heightPercentageToDP(70), heightPercentageToDP(90)],
    });

    const heightInterpolationArrow = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [heightPercentageToDP(30), heightPercentageToDP(10)],
    });

    const startAnimation = () => {
        setArrowDisplay('flex')

        Animated.parallel([
            Animated.timing(animationRef.current, {
                toValue: 1,
                duration: 300,
                delay: 20,
                useNativeDriver: false,
            }),
            Animated.timing(registerRef.current, {
                toValue: 2,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    };

    React.useEffect(() => {
        if (display === 'flex') {
            startAnimation()
        }
    }, [display])

    const goLoginScreen = () => {
        setArrowDisplay('none')
        setIsSubmitting(false)
        setTimeout(() => {
            goBack()
        }, 300);

        Animated.parallel([
            Animated.timing(animationRef.current, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(registerRef.current, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    }

    const [keyboardPadding, setKeyboardPadding] = React.useState(0);

    const _keyboardDidShow = (e) => {
        setKeyboardPadding(e.endCoordinates.height / 2);
    };

    const _keyboardDidHide = () => {
        setKeyboardPadding(0);
    };

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeAllListeners('keyboardDidHide', _keyboardDidHide);
        };
    }, []);


    // Funciones para el  Registro
    const inputNombres = React.useRef(null);
    const inputApellidos = React.useRef(null);
    const inputEmail = React.useRef(null);
    const inputPassword = React.useRef(null);
    const inputPasswordConfirm = React.useRef(null);

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [buttonText, setbuttonText] = React.useState('Crear Cuenta')

    const [showPassword, setShowPassword] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [errorEmail, setErrorEmail] = React.useState(false);

    const showHiddenPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            nombres: "",
            apellidos: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: schemaRegister,
        validateOnChange: true,
        onSubmit: async (values) => {
            setError(false)
            setbuttonText('Creando Usuario... ⏳')
            setIsSubmitting(true)
            try {
                let data = {
                    nombres: values.nombres,
                    apellidos: values.apellidos,
                    mail: values.email,
                    contacto: null,
                    codigo_usuario: '',
                    extension_carnet: '',
                    sexo: '',
                    fecha_nacimento: '',
                    password_confirm: values.passwordConfirm,
                    userAuth: {
                        user_password: values.password,
                        user_code: "",
                    },
                };

                console.log('Values: ', data)

                const res = await fetchWithoutToken(
                    "entereza/usuarios_op",
                    "POST",
                    data
                );
                const response = await res.json();

                if (response.codeError === "COD215") {
                    setbuttonText('Iniciando Sesión... ⏳')
                    console.log("Registro exitoso: ", response)
                    let dataLogin = {
                        mail: values.email,
                        password: values.password,
                        code: "USER",
                        vrf: ""
                    }

                    loginUser(dataLogin)
                } else if (response.codeError === "COD056") {
                    console.log('Correo en Uso: ', response)
                    setbuttonText('Crear Cuenta')
                    setErrorEmail(true)
                } else {
                    setError(true)
                    setbuttonText('Crear Cuenta')
                    console.log('Error Register Entereza: ', response)
                    setErrorMessage(response.msgError)
                }
            } catch (err) {
                console.log('Error Register: ', err);
                setbuttonText('Crear Cuenta')
                setError(true)
                setErrorMessage('Error al Registrar. Por favor, intente nuevamente en unos minutos.')
            }
            setIsSubmitting(false)
        }
    });

    const loginUser = async (dataLogin) => {
        setIsSubmitting(true)
        try {
            const res = await fetchWithoutToken('entereza/login_use', "POST", dataLogin)
            const {
                entereza,
                codigoEntidad,
                jwt,
                rol,
                mail,
                ...rest
            } = await res.json()

            if (entereza.codeError === codeErrors.cod105 || entereza.codeError === codeErrors.cod95) {
                formik.resetForm()
                startAnimationButton()

                await Promise.all([
                    AsyncStorage.setItem('ENT-EMAIL', mail),
                    AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                    AsyncStorage.setItem('ENT-TKN', jwt),
                ])

                dispatch(_authLogin(dataLogin))
            } else {
                setbuttonText('Crear Cuenta')
                console.log("Respuesta Login: ", entereza)

                setErrorMessage(entereza.msgError)
            }
        } catch (error) {
            formik.resetForm()
            console.log('Error Login: ', error)
            setbuttonText('Crear Cuenta')
            setError(true)
            setErrorMessage('Su cuenta fue creada exitosamente, intente nuevamente en la pantalla de Iniciar Sesión.')

            goBackOnError()
        }
        setIsSubmitting(false)
    }

    const goBackOnError = () => {
        setIsSubmitting(true)

        setTimeout(() => {
            setError(false)
            setIsSubmitting(false)
            goLoginScreen()
        }, 4000);
    }

    const styles = {
        inputIcon: {
            color: theme.secondary,
            fontSize: adjustFontSize(22)
        },
        containerInput: {
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(13),

            marginBottom: 5
        },
        labelInput: {
            color: theme.primary,
            fontSize: adjustFontSize(12)
        }
    }

    const colorValue = React.useRef(new Animated.Value(0)).current;

    const backgroundColor = colorValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.dark, theme.success]
    });

    const startAnimationButton = () => {
        Animated.parallel([
            Animated.timing(colorValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            }),
        ]).start();

        setTimeout(() => {
            setbuttonText('¡Bienvenido!')
        }, 800);
    };

    return (
        <>
            <Animated.View
                style={{
                    backgroundColor: theme.transparent,
                    display: arrowDisplay,
                    height: heightInterpolationArrow,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    width={100}
                    height={10}
                    backgroundColor={theme.transparent}
                    paddingLeft={5}
                    borderRadius={1}
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',

                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={adjustFontSize(28)}
                        color={theme.primary}
                        onPress={goLoginScreen}
                    />
                </ViewStyled>
            </Animated.View>

            <Animated.View
                style={{
                    width: widthPercentageToDP(100),
                    height: heightInterpolation,
                    backgroundColor: theme.dark,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderTopLeftRadius: 70,
                    display: display,
                    marginBottom: keyboardPadding
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: theme.transparent,
                        height: '110%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollToOverflowEnabled={false}
                >
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    translateX: registerOpacity.interpolate({
                                        inputRange: [1, 2],
                                        outputRange: [outputRange, 0], // Cambia estos valores según tus necesidades
                                    }),
                                },
                            ],
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ViewStyled
                            width={100}
                            height={10}
                            marginTop={2}
                            marginBottom={1}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontFamily='BRFirmaBold'
                                textAlign='center'
                                fontSize={28}
                                color={theme.secondary}
                                style={{
                                    width: "90%",
                                }}
                            >
                                {'Crea tu cuenta'}
                            </TextStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={100}
                            height={80}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Input
                                label='Nombres'
                                placeholder="Inti"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                rightIcon={
                                    <Icon
                                        type='material-community'
                                        name="account-circle-outline"
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                value={formik.values.nombres}
                                onChangeText={text => {
                                    const formattedText = text.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                                    formik.setFieldValue("nombres", formattedText);
                                }}
                                returnKeyType='next'
                                onSubmitEditing={() => inputApellidos.current.focus()}
                                errorMessage={formik.errors.nombres}
                            />

                            <Input
                                label='Apellidos'
                                placeholder="Rojas Saldias"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                rightIcon={
                                    <Icon
                                        type='material-community'
                                        name="account-multiple-outline"
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                value={formik.values.apellidos}
                                onChangeText={text => {
                                    const formattedText = text.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                                    formik.setFieldValue("apellidos", formattedText);
                                }}
                                errorMessage={formik.errors.apellidos}
                                ref={inputApellidos}
                                returnKeyType='next'
                                onSubmitEditing={() => inputEmail.current.focus()}
                            />

                            <Input
                                label='Correo Electrónico'
                                placeholder="tucorreo@gmail.com"
                                onChange={() => setErrorEmail(false)}
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                rightIcon={
                                    <Icon
                                        type='material-community'
                                        name="at"
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                value={formik.values.email}
                                onChangeText={text => formik.setFieldValue("email", text.trim())}
                                errorMessage={errorEmail ? 'El correo ya está en uso' : formik.errors.email}
                                ref={inputEmail}
                                returnKeyType='next'
                                onSubmitEditing={() => inputPassword.current.focus()}
                            />

                            <Input
                                label='Crea una Contraseña'
                                placeholder="********"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                secureTextEntry={!showPassword}
                                rightIcon={
                                    <Icon
                                        type='material-community'
                                        name={!showPassword ? "eye-off" : "eye"}
                                        iconStyle={styles.inputIcon}
                                        onPress={showHiddenPassword}
                                    />
                                }
                                value={formik.values.password}
                                onChangeText={text => formik.setFieldValue("password", text)}
                                errorMessage={formik.errors.password}
                                ref={inputPassword}
                                returnKeyType='next'
                                onSubmitEditing={() => inputPasswordConfirm.current.focus()}
                            />

                            <Input
                                label='Confirma tu Contraseña'
                                placeholder="*********"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                rightIcon={
                                    <Icon
                                        type='material-community'
                                        name={"eye-check"}
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                value={formik.values.passwordConfirm}
                                onChangeText={text => formik.setFieldValue("passwordConfirm", text)}
                                errorMessage={error ? errorMessage : formik.errors.passwordConfirm}
                                onSubmitEditing={formik.handleSubmit}
                                errorStyle={{ fontSize: error ? 14 : 12 }}
                                ref={inputPasswordConfirm}
                            />

                            <ViewStyled
                                height={14}
                                backgroundColor={theme.transparent}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >

                                <ViewStyled
                                    backgroundColor={theme.transparent}
                                    width={100}
                                    height={7}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TouchableOpacity onPress={formik.handleSubmit} disabled={!(formik.dirty && formik.isValid) || isSubmitting}>
                                        <ViewStyled
                                            width={90}
                                            height={6}
                                            backgroundColor={theme.transparent}
                                            borderRadius={2}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Animated.View
                                                style={{
                                                    backgroundColor: !(formik.dirty && formik.isValid) ? theme.background : backgroundColor,
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <TextStyled
                                                    fontSize={16}
                                                    color={!(formik.dirty && formik.isValid) ? theme.tertiaryGradient : theme.primary}
                                                    textAlign={'center'}
                                                    style={{
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {buttonText}
                                                </TextStyled>
                                            </Animated.View>
                                        </ViewStyled>
                                    </TouchableOpacity >
                                </ViewStyled>

                                <ViewStyled
                                    marginTop={1}
                                    height={4}
                                    backgroundColor={theme.transparent}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        textAlign='center'
                                        fontSize={14}
                                        color={theme.tertiary}
                                        style={{
                                            width: "90%",
                                        }}
                                    >
                                        {'¿Ya tienes una cuenta? '}
                                        <TextStyled
                                            fontWeight='700'
                                            textAlign='center'
                                            fontSize={15}
                                            color={theme.secondary}
                                            onPress={goLoginScreen}
                                            style={{
                                                width: "90%",
                                                textDecorationLine: 'underline'
                                            }}
                                        >
                                            {'¡Inicia Sesión!'}
                                        </TextStyled>
                                    </TextStyled>
                                </ViewStyled>
                            </ViewStyled>
                        </ViewStyled>
                    </Animated.View>
                </ScrollView>
            </Animated.View>
        </>
    );
}