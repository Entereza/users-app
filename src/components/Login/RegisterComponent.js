import React from 'react'
import Toast from "react-native-toast-message";

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { Animated, KeyboardAvoidingView, ScrollView } from 'react-native';
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
                duration: 200,
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
        setTimeout(() => {
            goBack()
        }, 200);

        Animated.parallel([
            Animated.timing(registerRef.current, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animationRef.current, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            })
        ]).start()
    }

    // Funciones para el  Registro
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
                    console.log("Registro exitoso: ", response)
                    let dataLogin = {
                        mail: values.email,
                        password: values.password,
                        code: "USER",
                        vrf: ""
                    }

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
                        Toast.show({
                            type: "success",
                            position: "bottom",
                            text1: "Inicio de Sesión Exitoso",
                            visibilityTime: 1000,
                            bottomOffset: 130,
                        })

                        await Promise.all([
                            AsyncStorage.setItem('ENT-EMAIL', mail),
                            AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                            AsyncStorage.setItem('ENT-TKN', jwt),
                        ])

                        dispatch(_authLogin(data))
                    } else {
                        console.log("Respuesta Login: ", entereza)

                        Toast.show({
                            type: "error",
                            position: "bottom",
                            text1: `${entereza.msgError}`,
                            bottomOffset: 130,
                        })
                    }
                } else if (response.codeError === "COD056") {
                    console.log('Correo en Uso: ', response)

                    setErrorEmail(true)
                } else {
                    console.log('Error Register Entereza: ', response)

                    Toast.show({
                        type: "error",
                        position: "bottom",
                        text1: "Ha ocurrido un error al Registrar.",
                        text2: `${response.msgError}`
                    })
                }
            } catch (err) {
                console.log('Error Register: ', err);

                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Ha ocurrido un Error",
                    text2: "Por favor, intente nuevamente en unos minutos."
                })
            }
            Toast.hide()
            setIsSubmitting(false)
        }
    });

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
            color: theme.quaternary,
            fontSize: adjustFontSize(12)
        }
    }

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
                    backgroundColor: theme.primary,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderTopLeftRadius: 70,
                    display: display
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
                                        name="account-multiple-outline"
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                onChangeText={text => formik.setFieldValue("nombres", text)}
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
                                        name="account-multiple"
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                onChangeText={text => formik.setFieldValue("apellidos", text)}
                                errorMessage={formik.errors.apellidos}
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
                                        name="account-circle-outline"
                                        iconStyle={styles.inputIcon}
                                    />
                                }
                                onChangeText={text => formik.setFieldValue("email", text)}
                                errorMessage={errorEmail ? 'El correo ya está en uso' : formik.errors.email}
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
                                onChangeText={text => formik.setFieldValue("password", text)}
                                errorMessage={formik.errors.password}
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
                                onChangeText={text => formik.setFieldValue("passwordConfirm", text)}
                                errorMessage={formik.errors.passwordConfirm}
                            />

                            <ViewStyled
                                height={13}
                                backgroundColor={theme.transparent}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >

                                <ButtonNext
                                    disabled={isSubmitting}
                                    color={theme.dark}
                                    colorText={theme.primary}
                                    width={90}
                                    text={!isSubmitting ? 'Crear Cuenta' : 'Registrando Usuario...⏳'}
                                    onPress={formik.handleSubmit}
                                />

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