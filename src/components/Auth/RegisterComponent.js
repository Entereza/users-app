import React from 'react'

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { Animated, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import adjustFontSize from '../../utils/adjustText';
import { useDispatch } from 'react-redux';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import { useFormik } from 'formik';
import { schemaRegister } from '../../utils/schemas';
import { Input, Icon, Button } from '@rneui/themed';
import ButtonNext from '../Btn/ButtonNext';
import { codeErrors } from '../../utils/codeErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { __authGetInfo, _authLogin } from '../../redux/actions/authActions';
import { Keyboard } from 'react-native';

export default function RegisterComponent({ display = 'none', registerOpacity, registerRef, outputRange, goBack }) {
    const [animation] = React.useState(new Animated.Value(0));
    const animationRef = React.useRef(animation);

    const [arrowDisplay, setArrowDisplay] = React.useState('none')

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [heightPercentageToDP(70), heightPercentageToDP(95)],
    });

    const heightInterpolationArrow = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [heightPercentageToDP(30), heightPercentageToDP(5)],
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
        setIsSubmitting(false)
        setTimeout(() => {
            setArrowDisplay('none')
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
    // Funciones para el  Registro
    const inputNombres = React.useRef(null);
    const inputApellidos = React.useRef(null);
    const inputEmail = React.useRef(null);
    const inputPassword = React.useRef(null);
    const inputPasswordConfirm = React.useRef(null);

    const [focusedInput, setFocusedInput] = React.useState(null);

    const paddingInput = 2.5;

    const [keyboardPadding, setKeyboardPadding] = React.useState(0);

    const _keyboardDidShow = (e) => {
        if (focusedInput !== null) {
            setKeyboardPadding(e.endCoordinates.height / paddingInput);
        }
    };

    const _keyboardDidHide = () => {
        setFocusedInput(null)
        setKeyboardPadding(0)
    };

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.removeAllListeners('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeAllListeners('keyboardDidHide', _keyboardDidHide);
        };
    }, [focusedInput]);

    const [error, setError] = React.useState(false);
    const [errorTotal, setErrorTotal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorEntereza, setErrorEntereza] = React.useState(true);

    const [buttonText, setbuttonText] = React.useState('Crear Cuenta')
    const [iconLoading, setIconLoading] = React.useState(false)
    const [iconCheck, setIconCheck] = React.useState(false)

    const [showPassword, setShowPassword] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [errorEmail, setErrorEmail] = React.useState(false);

    const showHiddenPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const dispatch = useDispatch()

    const delayFormik = () => {
        setbuttonText('Creando Usuario... ')
        startWidthAnimation(0.4, 1500);
        setErrorEmail(false)
        setErrorTotal(false)
        setIsSubmitting(true)
        setIconLoading(true)
        setError(false)
        setErrorMessage('')

        setTimeout(() => {
            formik.handleSubmit()
        }, 2000);
    }

    //Animations

    const colorValue = React.useRef(new Animated.Value(0)).current;
    const errorColor = React.useRef(new Animated.Value(0)).current;
    const widthValue = React.useRef(new Animated.Value(0)).current;

    const backgroundColor = colorValue.interpolate({
        inputRange: [0, 1],
        outputRange: [errorEntereza ? theme.transparent : theme.secondary, theme.green3]
    });

    const errorBackgroundColor = errorColor.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.secondary, errorTotal ? theme.danger : theme.salmon] // cambia theme.dark a tu color de inicio preferido
    });

    const buttonWidth = widthValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    // Función de animación para la anchura
    const startWidthAnimation = (toValue, duration) => {
        Animated.timing(widthValue, {
            toValue,
            duration,
            useNativeDriver: false
        }).start();
    };

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

                console.log('Values For Register: ', data)

                const res = await fetchWithoutToken(
                    "entereza/usuarios_op",
                    "POST",
                    data
                );
                const response = await res.json();

                if (response.codeError === "COD215") {
                    console.log("Registro exitoso: ", response)

                    let dataLogin = {
                        mail: values.email,
                        password: values.password,
                        code: "USER",
                        vrf: ""
                    }
                    setIconLoading(false)
                    setbuttonText('Registro Exitoso ')
                    startWidthAnimation(0.7, 1000);

                    setTimeout(() => {
                        setIconLoading(true)
                        loginUser(dataLogin)
                        setbuttonText('Iniciando Sesión... ')
                    }, 1500);
                } else if (response.codeError === "COD056") {
                    Animated.sequence([
                        Animated.timing(widthValue, {
                            toValue: 0.6,
                            duration: 1000,
                            useNativeDriver: false
                        }),
                        Animated.timing(errorColor, {
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: false
                        }),
                        Animated.timing(widthValue, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: false
                        }),
                        Animated.timing(errorColor, {
                            toValue: 0,
                            duration: 0,
                            useNativeDriver: false
                        }),
                    ]).start();

                    setTimeout(() => {
                        setIsSubmitting(false)
                        setErrorEmail(true)
                        setbuttonText('Crear Cuenta')
                        console.log('Correo en Uso: ', response)
                    }, 1800)
                } else {
                    console.log('Error Register Entereza: ', response)

                    Animated.sequence([
                        Animated.timing(widthValue, {
                            toValue: 0.6,
                            duration: 1000,
                            useNativeDriver: false
                        }),
                        Animated.timing(errorColor, {
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: false
                        }),
                        Animated.timing(widthValue, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: false
                        }),
                        Animated.timing(errorColor, {
                            toValue: 0,
                            duration: 0,
                            useNativeDriver: false
                        }),
                    ]).start();

                    setTimeout(() => {
                        setbuttonText('Crear Cuenta')
                        setIsSubmitting(false)
                        setError(true)
                        setErrorMessage(response.msgError)
                    }, 1800)
                }
            } catch (err) {
                console.log('Error Register: ', err);

                Animated.sequence([
                    Animated.timing(widthValue, {
                        toValue: 0.5,
                        duration: 500,
                        useNativeDriver: false
                    }),
                    Animated.timing(errorColor, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: false
                    }),
                    Animated.timing(widthValue, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: false
                    }),
                    Animated.timing(errorColor, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: false
                    }),
                ]).start();

                setTimeout(() => {
                    setbuttonText('Crear Cuenta')
                    setIsSubmitting(false)
                    setErrorTotal(true)
                    setError(true)
                    setErrorMessage('Error al Registrar. Por favor, intente nuevamente en unos minutos.')
                }, 1100)
            }
        }
    });

    const loginUser = async (dataLogin) => {
        try {
            const res = await fetchWithoutToken('entereza/login_user', "POST", dataLogin)
            const {
                entereza,
                codigoEntidad,
                jwt,
                rol,
                mail,
                ...rest
            } = await res.json()

            if (entereza.codeError === codeErrors.cod105 || entereza.codeError === codeErrors.cod95) {
                startWidthAnimation(0.8, 1000);

                console.log('Inicio de sesión exitoso: ', entereza)

                await Promise.all([
                    AsyncStorage.setItem('ENT-EMAIL', mail),
                    AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                    AsyncStorage.setItem('ENT-TKN', jwt),
                ]);

                setTimeout(async () => {
                    await Promise.all([
                        console.log('Starts __authGetInfo from loginUser'),
                        dispatch(__authGetInfo()),
                    ]).then(() => {
                        setTimeout(() => {
                            setErrorEntereza(false)
                            setIconCheck(true)
                            console.log('Submitting: ', isSubmitting)
                            setIconLoading(false)
                            setbuttonText('¡Bienvenido!')
                        }, 1000);
                        Animated.sequence([
                            Animated.timing(widthValue, {
                                toValue: 1,
                                duration: 1000,
                                useNativeDriver: false
                            }),
                            Animated.timing(colorValue, {
                                toValue: 1,
                                duration: 1200,
                                useNativeDriver: false
                            })
                        ]).start(() => {
                            console.log('Finish Animations from Login.')
                            formik.resetForm()
                            dispatch(_authLogin(dataLogin))
                        })
                    })
                }, 1000);
            } else {
                //Sequencia de Animacion para error de la peticion
                Animated.sequence([
                    Animated.timing(widthValue, {
                        toValue: 0.9,
                        duration: 1000,
                        useNativeDriver: false
                    }),
                    Animated.timing(errorColor, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(widthValue, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: false
                    }),
                    Animated.timing(errorColor, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: false
                    }),
                ]).start();

                setTimeout(() => {
                    console.log("Respuesta Login: ", entereza)

                    setIsSubmitting(false)
                    setbuttonText('Crear Cuenta')
                    setError(true)
                    setErrorMessage(entereza.msgError)
                }, 1900)
            }
        } catch (error) {
            setErrorTotal(true)
            console.log('Error onLogin: ', error)

            Animated.sequence([
                Animated.timing(widthValue, {
                    toValue: 0.8,
                    duration: 1000,
                    useNativeDriver: false
                }),
                Animated.timing(errorColor, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: false
                }),
                Animated.timing(widthValue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(errorColor, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false
                }),
            ]).start();

            setTimeout(() => {
                formik.resetForm()

                setIsSubmitting(false)
                setbuttonText('Crear Cuenta')
                setIsSubmitting(false)
                setError(true)
                setErrorMessage('Su cuenta fue creada exitosamente, intente nuevamente en la pantalla de Iniciar Sesión.')
                goBackOnError()
            }, 1700)
        }
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
            height: heightPercentageToDP(12),

            marginBottom: 5
        },
        passwordErrorInput: {
            width: widthPercentageToDP(90),
            height: error ? heightPercentageToDP(13) : heightPercentageToDP(12),

            marginBottom: 5
        },
        labelInput: {
            color: theme.primary,
            fontSize: adjustFontSize(12)
        },
        inputText: {
            color: theme.primary
        },
        errorText: {
            color: theme.salmon
        },
    }

    const startAnimationButton = () => {
        Animated.timing(colorValue, {
            toValue: 1,
            duration: 1300,
            useNativeDriver: false
        }).start();

        setTimeout(() => {
            setIconCheck(true)
            console.log('Submitting: ', isSubmitting)
            setIconLoading(false)
            setbuttonText('¡Bienvenido!')
        }, 700);
    };

    return (
        <>
            <Animated.View
                style={{
                    backgroundColor: theme.transparent,
                    transform: [
                        {
                            translateX: registerOpacity.interpolate({
                                inputRange: [1, 2],
                                outputRange: [outputRange, 0], // Cambia estos valores según tus necesidades
                            }),
                        },
                    ],
                    display: arrowDisplay,
                    height: heightPercentageToDP(5),
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    width={100}
                    height={5}
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
                    height: heightPercentageToDP(95),
                    backgroundColor: theme.transparent,
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
                        height: '105%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    showsVerticalScrollIndicator={true}
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
                            height={5}
                            marginBottom={2}
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
                                ref={inputNombres}
                                label='Nombres'
                                placeholder="Inti"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                style={styles.inputText}
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
                                errorStyle={styles.errorText}
                            />

                            <Input
                                label='Apellidos'
                                placeholder="Rojas Saldias"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                style={styles.inputText}
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
                                errorStyle={styles.errorText}
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
                                style={styles.inputText}
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
                                errorStyle={styles.errorText}
                                ref={inputEmail}
                                returnKeyType='next'
                                onSubmitEditing={() => inputPassword.current.focus()}
                            />

                            <Input
                                label='Crea una Contraseña'
                                placeholder="********"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                style={styles.inputText}
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
                                errorStyle={styles.errorText}
                                ref={inputPassword}
                                onFocus={() => setFocusedInput('password')}
                                returnKeyType='next'
                                onSubmitEditing={() => inputPasswordConfirm.current.focus()}
                            />

                            <Input
                                label='Confirma tu Contraseña'
                                placeholder="*********"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.passwordErrorInput}
                                style={styles.inputText}
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
                                onSubmitEditing={(formik.dirty && formik.isValid) ? delayFormik : null}
                                errorStyle={{ fontSize: error ? 14 : 12, color: errorTotal ? theme.danger : theme.salmon }}
                                ref={inputPasswordConfirm}
                                onFocus={() => setFocusedInput('confirmPassword')}
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
                                    <TouchableOpacity
                                        onPress={delayFormik}
                                        disabled={!(formik.dirty && formik.isValid) || isSubmitting}
                                    >
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
                                            <ViewStyled // este sería el contenedor de la "barra de carga"
                                                width={90}
                                                height={6}
                                                borderRadius={2}
                                                backgroundColor={theme.transparent}
                                                style={{
                                                    overflow: 'hidden', // para que la barra de carga no se desborde
                                                }}
                                            >
                                                <Animated.View // esta es la "barra de carga"
                                                    style={{
                                                        width: buttonWidth,
                                                        height: '100%',
                                                        backgroundColor: errorBackgroundColor,
                                                        display: isSubmitting ? 'flex' : 'none'
                                                    }}
                                                />
                                                <Animated.View
                                                    style={{
                                                        backgroundColor:
                                                            !(formik.dirty && formik.isValid)
                                                                ? theme.tertiaryGradient
                                                                : isSubmitting
                                                                    ? backgroundColor
                                                                    : theme.dark,
                                                        borderColor: !(formik.dirty && formik.isValid) ? theme.tertiary : theme.primary,
                                                        borderWidth: 1,
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        position: 'absolute', // agregamos esta propiedad
                                                    }}
                                                >
                                                    <TextStyled
                                                        fontSize={16}
                                                        color={
                                                            !(formik.dirty && formik.isValid)
                                                                ? theme.tertiary
                                                                : iconCheck
                                                                    ? theme.dark
                                                                    : theme.primary
                                                        }
                                                        textAlign={'center'}
                                                    >
                                                        {buttonText}
                                                    </TextStyled>
                                                    <MaterialCommunityIcons
                                                        name={
                                                            iconLoading
                                                                ? 'timer-sand'
                                                                : 'check-bold'
                                                        }
                                                        size={adjustFontSize(16)}
                                                        color={iconCheck ? theme.dark : theme.primary}
                                                        style={{
                                                            display: buttonText !== 'Crear Cuenta' && buttonText !== 'Registro exitoso ' ? 'flex' : 'none'
                                                        }}
                                                    />
                                                </Animated.View>
                                            </ViewStyled>
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