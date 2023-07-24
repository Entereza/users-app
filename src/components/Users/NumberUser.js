import React from 'react'
import { Animated } from 'react-native';
import { Input } from '@rneui/themed';
import { useFormik } from "formik";
import { schemaNumberUser } from '../../utils/schemas';

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import adjustFontSize from '../../utils/adjustText';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { _authLogin } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';
import ImageStyled from '../ui/ImageStyled';
import { ActivityIndicator } from 'react-native';

const styles = {
    containerInput: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(13),
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 5
    },
    inputText: {
        color: theme.primary,
        fontSize: adjustFontSize(24),
        marginLeft: 20,
        fontWeight: 'bold'
    },
    errorText: {
        color: theme.salmon
    },
}

export default function NumberUser({ display = 'flex', NumberUserOpacity, outputRange, outputRange2, goNextScreen, setNumberUser, isSubmitting }) {

    const inputNumber = React.useRef(null);

    const [error, setError] = React.useState(false);
    const [errorTotal, setErrorTotal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [buttonText, setbuttonText] = React.useState('Confirmar')
    const [iconLoading, setIconLoading] = React.useState(false)

    const formik = useFormik({
        initialValues: {
            numberUser: ''
        },
        validationSchema: schemaNumberUser,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                console.log('Values NumberUser: ', values)
                setNumberUser(values.numberUser);

                goNextScreen()
            } catch (error) {
                console.log('Error NumberUserComponent: ', error);
            }
        }
    });

    const focusinputNumber = () => {
        console.log('NumberFocusOn')
        inputNumber.current.focus();
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
        if (display !== 'none') {
            const timer = setTimeout(() => {
                focusinputNumber();
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [display])

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
                            translateX: NumberUserOpacity.interpolate({
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
                        {'Número de teléfono'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={95}
                    height={12}
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
                        {'Tu número de celular nos permite brindarte una experiencia personalizada y mantenerte al tanto de nuestras últimas ofertas.'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    marginTop={4}
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
                            flexDirection: 'row'
                            // borderWidth: 1,
                            // borderColor: theme.orange,
                        }}
                    >
                        <Input
                            ref={inputNumber}
                            selectionColor={theme.primary}
                            value={formik.values.numberUser}
                            onChangeText={text => formik.setFieldValue("numberUser", text)}
                            placeholder="75469425"
                            errorMessage={formik.errors.numberUser}
                            inputContainerStyle={{ borderColor: theme.transparent }}
                            keyboardType='decimal-pad'
                            containerStyle={styles.containerInput}
                            style={styles.inputText}
                            maxLength={8}
                            leftIcon={
                                <ViewStyled
                                    backgroundColor={theme.transparent}
                                    width={30}
                                    height={7}
                                    borderRadius={5}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        borderColor: theme.tertiary,
                                        borderWidth: 1
                                    }}
                                >
                                    <ImageStyled
                                        width={6}
                                        height={6}
                                        style={{
                                            // backgroundColor: '#f3f5f7cc',
                                            resizeMode: 'contain',
                                            marginRight: 10,
                                        }}
                                        source={require('../../assets/profile/banderaBolivia.png')}
                                    />
                                    <TextStyled
                                        color={theme.primary}
                                        fontSize={adjustFontSize(12)}
                                    >
                                        +591
                                    </TextStyled>
                                </ViewStyled>
                            }
                            errorStyle={{
                                fontSize: 12,
                                color: theme.salmon,
                                marginTop: 15,
                                textAlign: 'center'
                            }}
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
                                                ? < ActivityIndicator size="large" color={theme.primary} />
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
        </ViewStyled >
    );
}