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


export default function LoginComponent({ display = 'flex', loginOpacity, outputRange, outputRange2, goRegisterScreen, goBack }) {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);

    const [buttonText, setbuttonText] = React.useState('Iniciar Sesión')

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
            setbuttonText('Iniciando Sesión... ⏳')
            setErrorMessage(false)
            setIsSubmitting(true)
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
                    startAnimation()

                    await Promise.all([
                        AsyncStorage.setItem('ENT-EMAIL', mail),
                        AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                        AsyncStorage.setItem('ENT-TKN', jwt),
                    ])

                    setTimeout(() => {
                        dispatch(_authLogin(data))
                    }, 1100);
                } else {
                    setbuttonText('Iniciar Sesión')
                    console.log("Respuesta Login: ", entereza)

                    setErrorMessage(true)
                    // Toast.show({
                    //     type: "error",
                    //     position: "bottom",
                    //     text1: `${entereza.msgError}`,
                    //     bottomOffset: 195,
                    //     visibilityTime: 2500,
                    // })
                }
            } catch (error) {
                setbuttonText('Iniciar Sesión')

                console.log('Error LoginComponent: ', error);

                // Toast.show({
                //     type: "error",
                //     position: "bottom",
                //     text1: "Ha ocurrido un Error",
                //     text2: "Por favor, intente nuevamente en unos minutos",
                //     bottomOffset: 195,
                //     visibilityTime: 2500,
                // })
            }
            setIsSubmitting(false)
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
        labelInput: {
            color: theme.quaternary,
            fontSize: adjustFontSize(12)
        }
    }

    const colorValue = React.useRef(new Animated.Value(0)).current;

    const backgroundColor = colorValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.dark, theme.success]
    });

    const startAnimation = () => {
        Animated.parallel([
            Animated.timing(colorValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            }),
        ]).start();

        setTimeout(() => {
            setbuttonText('¡Bienvenido! ✔')
        }, 800);
    };

    return (
        <ViewStyled
            width={100}
            height={70}
            backgroundColor={theme.primary}
            paddingTop={2}
            style={{
                display: display,
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
                    height={53}
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
                            label='Correo Electrónico'
                            placeholder="tucorreo@gmail.com"
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
                            errorMessage={formik.errors.email}
                        />
                        <Input
                            label='Contraseña'
                            placeholder="******"
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
                            errorMessage={errorMessage ? 'Las credenciales que ingresaste son incorrectas.' : formik.errors.password}
                            errorStyle={{ fontSize: errorMessage ? 14 : 12 }}
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
                            <TouchableOpacity onPress={formik.handleSubmit} disabled={isSubmitting}>
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
                                            backgroundColor: backgroundColor,
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TextStyled
                                            fontSize={16}
                                            color={theme.primary}
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
            </Animated.View>
        </ViewStyled>
    );
}