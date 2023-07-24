import React from 'react'
import { Animated } from 'react-native';
import { Input } from '@rneui/themed';
import { useFormik } from "formik";
import { schemaCiUser } from '../../utils/schemas';

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import adjustFontSize from '../../utils/adjustText';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { _authLogin } from '../../redux/actions/authActions';
import { TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';
import { ActivityIndicator } from 'react-native';

const styles = {
    inputIcon: {
        color: theme.secondary,
        fontSize: adjustFontSize(22)
    },
    containerInput: {
        width: widthPercentageToDP(95),
        height: heightPercentageToDP(14),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

        marginBottom: 5
    },
    inputText: {
        color: theme.primary,
        fontSize: adjustFontSize(24),
        fontWeight: 'bold'
    },
    errorText: {
        color: theme.salmon
    },
    labelInput: {
        color: '#b3b3b3',
        fontSize: adjustFontSize(12)
    }
}

export default function CiUser({ display = 'flex', CiUserOpacity, outputRange, outputRange2, goNextScreen, setCiUser, errorCarnet, msgErrorCarnet, isSubmitting }) {
    const inputCI = React.useRef(null);

    const [placeholder, setPlaceholder] = React.useState(true);

    const formik = useFormik({
        initialValues: {
            ciUser: ''
        },
        validationSchema: schemaCiUser,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                console.log('Values CiUser: ', values)
                setCiUser(values.ciUser);

                goNextScreen()
            } catch (error) {
                console.log('Error CiUserComponent: ', error);
            }
        }
    });

    const focusInputCI = () => {
        inputCI.current.focus();
    };

    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    function onKeyboardDidShow(e) {
        setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
        setKeyboardHeight(0);
    }

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

        // cleanup function
        return () => {
            console.log('KeyboardHeigth: ', keyboardHeight)
            Keyboard.removeAllListeners('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeAllListeners('keyboardDidHide', onKeyboardDidHide);
        };
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            focusInputCI();
        }, 300);

        return () => clearTimeout(timer);
    }, [])

    React.useEffect(() => {
        if (errorCarnet) {
            formik.setFieldValue("ciUser", '');

            const timer = setTimeout(() => {
                focusInputCI();
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [errorCarnet])


    return (
        <ViewStyled
            width={100}
            height={100}
            backgroundColor={theme.transparent}
            paddingTop={2}
            style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: display,
            }}
        >
            <Animated.View
                style={{
                    backgroundColor: theme.transparent,
                    transform: [
                        {
                            translateX: CiUserOpacity.interpolate({
                                inputRange: [0, 1],
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
                    height={5}
                    marginBottom={1}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 1,
                        // borderColor: theme.danger,
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
                        {'Carnet de Identidad'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={95}
                    height={10}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 1,
                        // borderColor: theme.danger,
                    }}
                >
                    <TextStyled
                        textAlign='center'
                        fontSize={20}
                        color={theme.primary}
                    >
                        {'Tu número de carnet (CI) es el código que te permitirá realizar compras con Entereza.'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    marginTop={5}
                    width={100}
                    height={71}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: keyboardHeight
                        // borderWidth: 1,
                        // borderColor: theme.info,
                    }}
                >
                    <ViewStyled
                        width={100}
                        height={14}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            // borderWidth: 1,
                            // borderColor: theme.orange,
                        }}
                    >
                        <Input
                            ref={inputCI}
                            selectionColor={theme.primary}
                            value={formik.values.ciUser}
                            onChangeText={text => {
                                formik.setFieldValue("ciUser", text.trim());
                                setPlaceholder(false);
                            }}
                            placeholder={placeholder ? "7820697" : ''}
                            errorMessage={errorCarnet ? msgErrorCarnet : formik.errors.ciUser}
                            textAlign='center'
                            inputContainerStyle={{
                                borderColor: theme.transparent,
                                borderWidth: 0,
                                width: widthPercentageToDP(80),
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                paddingLeft: 5
                            }}

                            maxLength={9}
                            keyboardType='decimal-pad'
                            labelStyle={styles.labelInput}
                            containerStyle={styles.containerInput}
                            style={styles.inputText}
                            errorStyle={{ fontSize: errorCarnet ? 14 : 12, color: errorCarnet ? theme.danger : theme.salmon }}
                            onSubmitEditing={formik.handleSubmit}
                        />
                    </ViewStyled>

                    <ViewStyled
                        height={10}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            // borderWidth: 1,
                            // borderColor: theme.orange,
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
                                    <ViewStyled
                                        style={{
                                            backgroundColor:
                                                !(formik.dirty && formik.isValid)
                                                    ? theme.tertiaryGradient
                                                    : theme.dark,
                                            borderColor: !(formik.dirty && formik.isValid) ? theme.tertiary : theme.primary,
                                            borderWidth: 1,
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        {
                                            isSubmitting
                                                ? < ActivityIndicator size="large" color={theme.secondary} />
                                                : <TextStyled
                                                    fontSize={16}
                                                    color={
                                                        !(formik.dirty && formik.isValid)
                                                            ? theme.tertiary
                                                            : theme.primary
                                                    }
                                                    textAlign={'center'}
                                                >
                                                    Continuar
                                                </TextStyled>
                                        }
                                    </ViewStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        </ViewStyled>
                    </ViewStyled>
                </ViewStyled>
            </Animated.View >
        </ViewStyled>
    );
}