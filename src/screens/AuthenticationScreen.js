import React, { useRef } from 'react'
import { Animated, Platform, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native';

//Importar Responsive View
import ViewStyled from '../components/ui/ViewStyled';
import ImageStyled from '../components/ui/ImageStyled';

//import styles
import { theme } from '../utils/theme'
import AuthComponent from '../components/Auth/AuthComponent';
import LoginComponent from '../components/Auth/LoginComponent';
import RegisterComponent from '../components/Auth/RegisterComponent';
import { Ionicons } from '@expo/vector-icons';
import adjustFontSize from '../utils/adjustText';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthenticationScreen() {

    const [showButton, setShowButton] = React.useState('none')

    const IosOrAndroid = async () => {
        if (Platform.OS === 'ios') {
            setShowButton('flex')
        }
    }

    React.useEffect(() => {
        IosOrAndroid()
    }, [])

    const [shadow, setShadow] = React.useState(true);
    const [outputRangeAuth, setOutputRangeAuth] = React.useState(0);
    const [outputRangeAuth2, setOutputRangeAuth2] = React.useState(0);

    const [outputRangeLogin, setOutputLogin] = React.useState(0);
    const [outputRangeLogin2, setOutputLogin2] = React.useState(0);

    const [outputRangeRegister, setOutputRangeRegister] = React.useState(0);

    const [outputImage, setOutputImage] = React.useState(0);
    const [outputImage2, setOutputImage2] = React.useState(0);

    const [auth, setAuth] = React.useState('flex');
    const [login, setLogin] = React.useState('none');

    const [register, setRegister] = React.useState('none');

    const [authOpacity] = React.useState(new Animated.Value(0));
    const authRef = useRef(authOpacity);

    const [loginOpacity] = React.useState(new Animated.Value(1));
    const loginRef = useRef(loginOpacity);

    const [registerOpacity] = React.useState(new Animated.Value(1));
    const registerRef = useRef(registerOpacity);

    const [imageOpacity] = React.useState(new Animated.Value(1));
    const imageRef = useRef(imageOpacity);

    const GoLogin = () => {
        setOutputRangeAuth(-400);
        setOutputLogin(400)
        setShadow(false);

        setTimeout(() => {
            setAuth('none');
            setLogin('flex');
        }, 10);

        Animated.parallel([
            Animated.timing(authRef.current, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(loginRef.current, {
                toValue: 2,
                duration: 200,
                useNativeDriver: true,
                delay: 300,
            }),
        ]).start();
    };

    const GoBackAuth = () => {

        setOutputRangeAuth(-400)
        setOutputRangeAuth2(0)

        setOutputLogin(400)
        setOutputLogin2(0)

        setShadow(true);

        setTimeout(() => {
            setLogin('none');
            setAuth('flex');
        }, 10);

        Animated.parallel([
            Animated.timing(loginRef.current, {
                toValue: 1, // Cambia el valor de toValue a 0 para que vuelva a su posición original
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(authRef.current, {
                toValue: 0, // Cambia el valor de toValue a 1 para que vuelva a su posición original
                duration: 200,
                useNativeDriver: true,
                delay: 300,
            }),
        ]).start();
    };

    const GoRegister = () => {

        setOutputLogin2(-400)
        setOutputLogin(0);

        setOutputImage2(-400)
        setOutputImage(0);

        setOutputRangeRegister(400);

        setTimeout(() => {
            setLogin('none');
            setRegister('flex');
        }, 10);

        Animated.parallel([
            Animated.timing(loginRef.current, {
                toValue: 2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(imageRef.current, {
                toValue: 2,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const GoBackLogin = () => {
        setRegister('none');
        setLogin('flex');

        setOutputLogin(0);
        setOutputLogin2(-400); // Establece outputRangeAuth2 a 0 para que vuelva a su posición original

        setOutputImage(0);
        setOutputImage2(-400);

        Animated.parallel([
            Animated.timing(loginRef.current, {
                toValue: 1, // Cambia el valor de toValue a 0 para que vuelva a su posición original
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(imageRef.current, {
                toValue: 1, // Cambia el valor de toValue a 0 para que vuelva a su posición original
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.dark }}>
            <ViewStyled
                backgroundColor={theme.dark}
                width={100}
                height={100}
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <Animated.View
                    style={{
                        display: login,
                        transform: [
                            {
                                translateX: loginOpacity.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [outputRangeLogin, outputRangeLogin2], // Cambia estos valores según tus necesidades
                                }),
                            },
                        ],
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        width={100}
                        backgroundColor={theme.transparent}
                        paddingLeft={5}
                        height={5}
                        borderRadius={1}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={adjustFontSize(28)}
                            color={theme.primary}
                            onPress={GoBackAuth}
                        />
                    </ViewStyled>
                </Animated.View>

                {
                    register === 'none'
                        ?
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        translateX: imageOpacity.interpolate({
                                            inputRange: [1, 2],
                                            outputRange: [outputImage, outputImage2], // Cambia estos valores según tus necesidades
                                        }),
                                    },
                                ],
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ViewStyled
                                width={100}
                                height={16}
                                marginBottom={auth === 'flex' ?  8 : 4}
                                backgroundColor={theme.transparent}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <ViewStyled
                                    width={30}
                                    height={15}
                                    backgroundColor={theme.transparent}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ImageStyled
                                        source={require('../../assets/img/EnterezaLogoColors.png')}
                                        borderRadius={2}
                                        style={{
                                            resizeMode: 'contain',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </ViewStyled>
                            </ViewStyled>
                        </Animated.View>
                        : <></>
                }

                <Pressable onPress={Keyboard.dismiss} >
                    <AuthComponent
                        outputRange={outputRangeAuth}
                        outputRange2={outputRangeAuth2}
                        showButton={showButton}
                        authOpacity={authOpacity}
                        display={auth}
                        goLogin={GoLogin}
                        shadow={shadow}
                    />

                    <LoginComponent
                        loginOpacity={loginOpacity}
                        outputRange={outputRangeLogin}
                        outputRange2={outputRangeLogin2}
                        display={login}
                        goBack={GoBackAuth}
                        goRegisterScreen={GoRegister}
                    />

                    <RegisterComponent
                        registerOpacity={registerOpacity}
                        registerRef={registerRef}
                        outputRange={outputRangeRegister}
                        display={register}
                        goBack={GoBackLogin}
                    />
                </Pressable>
            </ViewStyled>
        </SafeAreaView>
    );
}