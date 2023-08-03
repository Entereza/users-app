import React from 'react'
import { Animated } from 'react-native';
import { Input } from '@rneui/themed';
import { schemaDateUser, schemaNumberUser } from '../../utils/schemas';

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
import { ActivityIndicator } from 'react-native';

const styles = {
    dayContainerInput: {
        width: widthPercentageToDP(17),
        height: heightPercentageToDP(6),
    },
    monthcontainerInput: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(6),
    },
    yearcontainerInput: {
        width: widthPercentageToDP(27),
        height: heightPercentageToDP(6),
    },
    inputContainerStyle: {
        borderColor: theme.transparent,
        borderWidth: 0,
    },
    inputText: {
        color: theme.primary,
        fontSize: adjustFontSize(24),
        fontWeight: 'bold'
    },
    errorText: {
        color: theme.salmon
    },
}

export default function NumberUser({ display = 'flex', DateUserOpacity, outputRange, outputRange2, goNextScreen, setDateUser, isSubmitting }) {

    const focusInputDay = () => {
        console.log('InputDayFocusOn')
        inputDay.current.focus();
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
                focusInputDay();
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [display])

    // Inputs
    const inputDay = React.useRef(null);
    const inputMonth = React.useRef(null);
    const inputYear = React.useRef(null);

    const [day, setDay] = React.useState('')
    const [month, setMonth] = React.useState('')
    const [year, setYear] = React.useState('')

    const [error, setError] = React.useState(false);
    const [errorTotal, setErrorTotal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [userAge, setUserAge] = React.useState(0)

    const [isDisabled, setIsDisabled] = React.useState(true);

    const handleSubmit = async () => {
        try {
            let newDateUser = year + '-' + month + '-' + day
            setDateUser(newDateUser);
            setTimeout(() => {
                goNextScreen();
            }, 300);
        } catch (error) {
            console.log('Error NumberUserComponent: ', error);
        }
    }

    const validateAndSetUserAge = () => {
        const birthdate = new Date(year, month - 1, day);
        const now = new Date();

        console.log(birthdate, now)

        console.log('Fecha menor? .', birthdate.getFullYear())
        if (year < 1900 || month > 12 || month < 1 || day < 1 || day > 31 || isNaN(birthdate) || birthdate.getDate() !== parseInt(day) || birthdate.getMonth() + 1 !== parseInt(month)) {
            setError(true);
            setErrorMessage('Tu fecha de nacimiento es inválida');
            return;
        }

        // Verifica si la fecha es inválida
        if (birthdate > now) {
            console.log('La fecha es mayor.')
            setError(true)
            setErrorMessage('No se aceptan viajeros del tiempo.')
            return;
        }

        // Calcula la edad
        let age = now.getFullYear() - birthdate.getFullYear();
        const m = now.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birthdate.getDate())) {
            age--;
        }

        // Verifica la edad mínima
        if (age < 10) {
            console.log('La edad es menor a 10. ', age)

            setError(true);
            setErrorMessage('Debes tener al menos 10 años para usar Entereza.');
            return;
        }

        console.log('Todo está correcto.')
        setUserAge(age);
        setIsDisabled(false)
        setError(false);
        setErrorMessage('');
    };

    React.useEffect(() => {
        if (year.length === 4 && month.length === 2 && day.length === 2) {
            validateAndSetUserAge();
        } else {
            console.log(`Faltan valores por llenar: ${day} - ${month} - ${year}`)
            setIsDisabled(true)
            setError(false)
        }
    }, [year, month, day]);


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
                            translateX: DateUserOpacity.interpolate({
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
                        {'Fecha de Nacimiento'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={95}
                    height={11}
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
                        {'Tu fecha de nacimiento nos ayuda a personalizar tu experiencia y celebrar contigo momentos especiales.'}
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
                        height={20}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ViewStyled
                            width={100}
                            height={8}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Input
                                ref={inputDay}
                                selectionColor={theme.primary}
                                value={day}
                                onChangeText={text => {
                                    setDay(text)
                                    if (text.length === 2) {
                                        inputMonth.current.focus()
                                    }
                                    setError(false)
                                }}
                                placeholder="DD"
                                keyboardType='decimal-pad'
                                inputContainerStyle={styles.inputContainerStyle}
                                containerStyle={styles.dayContainerInput}
                                style={[styles.inputText]}
                                maxLength={2}
                                returnKeyType='next'
                                onBlur={() => {
                                    const dayAsNumber = Number(day);
                                    if (day.length < 2 && [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(dayAsNumber)) {
                                        setDay('0' + day);
                                    }
                                }}
                                onSubmitEditing={() => {
                                    inputMonth.current.focus();
                                }}
                            />

                            <Input
                                ref={inputMonth}
                                selectionColor={theme.primary}
                                value={month}
                                onChangeText={text => {
                                    setMonth(text)
                                    if (text.length === 2) {
                                        inputYear.current.focus()
                                    }
                                    setError(false)
                                }}
                                onKeyPress={({ nativeEvent: { key } }) => {
                                    if (key === 'Backspace' && month.length === 0) {
                                        inputDay.current.focus()
                                    }
                                }}
                                onBlur={() => {
                                    const monthAsNumber = Number(month);
                                    if (month.length < 2 && [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(monthAsNumber)) {
                                        setMonth('0' + month);
                                    }
                                }}
                                placeholder="MM"
                                inputContainerStyle={styles.inputContainerStyle}
                                keyboardType='decimal-pad'
                                containerStyle={styles.monthcontainerInput}
                                style={styles.inputText}
                                maxLength={2}
                                returnKeyType='next'
                                onSubmitEditing={() => inputYear.current.focus()}
                            />

                            <Input
                                ref={inputYear}
                                selectionColor={theme.primary}
                                value={year}
                                onChangeText={text => {
                                    setYear(text)
                                }}
                                onKeyPress={({ nativeEvent: { key } }) => {
                                    if (key === 'Backspace' && year.length === 0) {
                                        inputMonth.current.focus()
                                    }
                                }}
                                placeholder="AAAA"
                                keyboardType='decimal-pad'
                                inputContainerStyle={styles.inputContainerStyle}
                                containerStyle={styles.yearcontainerInput}
                                style={styles.inputText}
                                maxLength={4}
                                onSubmitEditing={isDisabled ? null : handleSubmit}
                            />
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme.transparent}
                            width={100}
                            height={8}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {
                                error
                                    ? <TextStyled
                                        fontSize={error ? 14 : 12}
                                        color={errorTotal ? theme.danger : theme.salmon}
                                        textAlign={'center'}
                                    >
                                        {errorMessage}
                                    </TextStyled>
                                    : <></>

                            }
                        </ViewStyled>
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
                            <TouchableOpacity onPress={handleSubmit} disabled={error || isDisabled || isSubmitting}>
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
                                                error || isDisabled
                                                    ? theme.tertiaryGradient
                                                    : theme.dark,
                                            borderColor: error || isDisabled ? theme.tertiary : theme.primary,
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
                                                        error || isDisabled
                                                            ? theme.tertiary
                                                            : theme.primary
                                                    }
                                                    textAlign={'center'}
                                                >
                                                    {
                                                        error || isDisabled
                                                            ? 'Confirmar'
                                                            : `Si, tengo ${userAge} años`
                                                    }
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