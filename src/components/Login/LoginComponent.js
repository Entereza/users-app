import React from 'react'
import { Animated } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { useFormik } from "formik";
import { schemaLogin } from '../../utils/schemas';

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import ForgotPassword from '../Modals/ForgotPassword';
import adjustFontSize from '../../utils/adjustText';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ButtonNext from '../Btn/ButtonNext';
import { _authLogin } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { codeErrors } from '../../utils/codeErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import { TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default function LoginComponent({ display = 'flex', loginOpacity, outputRange, outputRange2, goRegisterScreen, goBack }) {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorTotal, setErrorTotal] = React.useState(false);
    const [errorEntereza, setErrorEntereza] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [buttonText, setbuttonText] = React.useState('Iniciar Sesión')
    const [iconLoading, setIconLoading] = React.useState(false)
    const [iconCheck, setIconCheck] = React.useState(false)

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            vrf: "",
            code: "USER",
        },
        validationSchema: schemaLogin,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                console.log('Form: ', values)
                let data = {
                    mail: values.email,
                    password: values.password,
                    code: values.code,
                    vrf: values.vrf
                }

                const res = await fetchWithoutToken('entereza/login_user', "POST", data)
                const {
                    entereza,
                    codigoEntidad,
                    jwt,
                    rol,
                    mail,
                    ...rest
                } = await res.json()

                if (entereza.codeError === codeErrors.cod105 || entereza.codeError === codeErrors.cod95) {
                    // Para cambiar el color
                    startWidthAnimation(1, 1000); // Para la barra de carga completa
                    setTimeout(() => {
                        setErrorEntereza(false)
                        startAnimation();
                    }, 1000);

                    await Promise.all([
                        AsyncStorage.setItem('ENT-EMAIL', mail),
                        AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                        AsyncStorage.setItem('ENT-TKN', jwt),
                    ])

                    setTimeout(() => {
                        formik.resetForm()
                        dispatch(_authLogin(data))
                    }, 2100);
                } else {
                    //Sequencia de Animacion para error de la peticion
                    Animated.sequence([
                        Animated.timing(widthValue, {
                            toValue: 0.85,
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
                        setbuttonText('Iniciar Sesión')
                        setError(true)
                        console.log("Respuesta Login: ", entereza)
                        setErrorMessage(entereza.msgError)
                    }, 1500)
                }
            } catch (error) {
                setErrorTotal(true)
                console.log('Error LoginComponent: ', error);

                Animated.sequence([
                    Animated.timing(widthValue, {
                        toValue: 0.65,
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
                    setIsSubmitting(false)

                    setbuttonText('Iniciar Sesión')
                    setIsSubmitting(false)
                    setError(true)
                    setErrorMessage('Ocurrio un error. Por favor intente nuevamente en unos minutos.')
                }, 1000)
            }
        }
    });

    const showHiddenPassword = () => {
        setShowPassword(prevState => !prevState);
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
        inputText: {
            color: theme.primary
        },
        errorText: {
            color: theme.salmon
        },
        labelInput: {
            color: '#b3b3b3',
            fontSize: adjustFontSize(12)
        }
    }

    const delayFormik = () => {
        startWidthAnimation(0.5, 1500);

        setErrorTotal(false)
        setIsSubmitting(true)
        setIconLoading(true)
        setbuttonText('Iniciando Sesión... ')
        setError(false)
        setErrorMessage('')

        setTimeout(() => {
            formik.handleSubmit()
        }, 1500);
    }

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

    const resetWidthAnimation = () => {
        Animated.timing(widthValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false
        }).start();
    };

    // Función de animación para la anchura
    const startWidthAnimation = (toValue, duration) => {
        Animated.timing(widthValue, {
            toValue,
            duration,
            useNativeDriver: false
        }).start();
    };


    const startAnimation = () => {
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            style={{
                justifyContent: 'flex-end',
                height: heightPercentageToDP(74),
                display: display,
            }}
        >
            <ViewStyled
                width={100}
                height={70}
                backgroundColor={theme.dark}
                paddingTop={2}
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderTopLeftRadius: 70
                }}
            >
                <Animated.View
                    style={{
                        backgroundColor: theme.transparent,
                        transform: [
                            {
                                translateX: loginOpacity.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [outputRange, outputRange2], // Cambia estos valores según tus necesidades
                                }),
                            },
                        ],
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        width={100}
                        height={7}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopLeftRadius: 70,
                            // borderColor: theme.danger,
                            // borderWidth: 1,
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
                            {'Iniciar Sesión'}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        width={100}
                        height={54}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // borderColor: theme.info,
                            // borderWidth: 1,
                        }}
                    >
                        <ViewStyled
                            width={100}
                            height={42}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                        >
                            <Input
                                autoComplete='email'
                                label='Correo Electrónico'
                                placeholder="tucorreo@gmail.com"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                style={styles.inputText}
                                value={formik.values.email}
                                rightIcon={
                                    <Icon
                                        type='material-community'
                                        name="at"
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                onChangeText={text => formik.setFieldValue("email", text.trim())}
                                errorStyle={styles.errorText}
                                errorMessage={formik.errors.email}
                            />
                            <Input
                                label='Contraseña'
                                placeholder="******"
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                style={styles.inputText}
                                secureTextEntry={!showPassword}
                                value={formik.values.password}
                                rightIcon={
                                    <Icon
                                        type='material-community'
                                        name={!showPassword ? "eye-off" : "eye"}
                                        iconStyle={styles.inputIcon}
                                        onPress={showHiddenPassword}
                                    />
                                }
                                onChangeText={text => formik.setFieldValue("password", text)}
                                errorMessage={error ? errorMessage : formik.errors.password}
                                errorStyle={{ fontSize: error ? 14 : 12, color: errorTotal ? theme.danger : theme.salmon }}
                                onSubmitEditing={delayFormik}
                            />

                            <ForgotPassword />
                        </ViewStyled>

                        <ViewStyled
                            height={15}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
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
                                <TouchableOpacity onPress={delayFormik} disabled={!(formik.dirty && formik.isValid) || isSubmitting}>
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
                                                    style={{
                                                        marginRight: buttonText !== 'Iniciar Sesión' ? 5 : 0
                                                    }}
                                                >
                                                    {buttonText}
                                                </TextStyled>
                                                <MaterialCommunityIcons
                                                    name={iconLoading ? 'timer-sand' : 'check-bold'}
                                                    size={adjustFontSize(16)}
                                                    color={iconCheck ? theme.dark : theme.primary}
                                                    style={{
                                                        display: buttonText !== 'Iniciar Sesión' ? 'flex' : 'none'
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
                                    {'¿Aún no tienes una cuenta? '}
                                    <TextStyled
                                        fontWeight='700'
                                        textAlign='center'
                                        fontSize={15}
                                        color={theme.secondary}
                                        onPress={goRegisterScreen}
                                        style={{
                                            width: "90%",
                                            textDecorationLine: 'underline'
                                        }}
                                    >
                                        {'¡Regístrate!'}
                                    </TextStyled>
                                </TextStyled>
                            </ViewStyled>
                        </ViewStyled>
                    </ViewStyled>
                </Animated.View >
            </ViewStyled >
        </KeyboardAvoidingView >
    );
}