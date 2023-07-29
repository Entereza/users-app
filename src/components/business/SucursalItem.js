import * as React from 'react';
import {
    Linking,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import TextStyled from '../ui/TextStyled';
import ViewStyled from '../ui/ViewStyled';
import { Ionicons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/adjustText';
import { customStyles } from '../../utils/customStyles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function SucursalItem({ item }) {
    const { location } = useSelector(state => state.auth);

    // console.log('Horario Sucursal: ', item.horarios)
    // console.log('Wpp: ', item.wpp)

    const [colorWp, setColorWp] = React.useState('#818181')

    const OpenWp = () => {
        Linking.openURL(item.wpp)
    }


    const SetColors = () => {
        if (item.wpp !== '' || item.wpp === null) {
            setColorWp('#4CD236')
        } else {
            setColorWp('#Empty')
        }
    }

    const SucursalIsOpen = () => {
        if (item.horarios !== 'empty') {
            if (item.horarios === false) {
                setColorWp(theme.dangerDark)
            } else {
                SetColors()
            }
        }
    }

    React.useEffect(() => {
        SucursalIsOpen()
    }, [])

    const [envio, setEnvio] = React.useState('0')

    let ranges;

    const PricesEnvios = () => {
        const codKm = item.codKm;
        let selectedEnvio = '0';

        console.log('Km For Prices: ', codKm)

        for (const range in ranges) {
            if (codKm >= range) {
                selectedEnvio = ranges[range];
            } else {
                break; // Salir del bucle cuando se encuentra el rango adecuado
            }
        }

        setEnvio(selectedEnvio);
    }

    const VerifyState = () => {
        try {
            if (location.address.state === 'La Paz') {
                setEnvio(false);
                return;
            } else if (location.address.state === 'Cochabamba') {
                ranges = {
                    0: '7',
                    1: '8',
                    2: '10',
                    3: '12',
                    4: '14',
                    5: '16',
                    6: '18',
                    7: '20',
                    8: '22',
                    9: '25',
                    10: '30',
                };
            } else if (location.address.state === 'Tarija') {
                ranges = {
                    0: '5',
                    1.5: '6',
                    2: '7',
                    3: '8',
                    4: '9',
                    5: '10',
                    6: '11',
                    7: '12',
                    8: '14',
                    10: '15',
                };
            }
        } catch (error) {
            console.log('Err: ', error)
        } finally {
            PricesEnvios()
        }
    }

    React.useEffect(() => {
        if (location.coords !== null) {
            if (location.coords.permissions !== false) {
                VerifyState()
                console.log('Permissions: ', location.coords.permissions)
            } else {
                console.log('Permissions: ', location.coords.permissions)
                setEnvio(false)
            }
        }
    }, [location])

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={95}
                height={11}
                marginBottom={1.5}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ViewStyled
                    backgroundColor={theme.primary}
                    borderRadius={2}
                    paddingHorizontal={2}
                    style={
                        {
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: '100%',
                            width: '100%',
                            ...customStyles.shadowStyle
                        }
                    }
                >
                    <ViewStyled
                        height={10.5}
                        paddingLeft={2}
                        backgroundColor={theme.transparent}
                        style={{
                            width: colorWp !== '#Empty' ? '70%' : '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderWidth: 1,
                            // borderColor: theme.black
                        }}
                    >
                        <ViewStyled
                            backgroundColor={theme.transparent}
                            height={item.direccion ? 11 : 7}
                            style={{
                                width: '100%',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                // borderWidth: 1,
                                // borderColor: theme.orange
                            }}
                        >
                            <TextStyled
                                fontFamily='BRFirmaBold'
                                fontWeight='bold'
                                textAlign='left'
                                fontSize={14}
                                color={theme.quaternary}
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={{
                                    marginBottom: 2
                                }}
                            >
                                {
                                    item.nombreEmpresa
                                }
                            </TextStyled>
                            {
                                item.direccion
                                    ?
                                    <TextStyled
                                        textAlign={'left'}
                                        fontSize={11}
                                        color={theme.secondary}
                                        numberOfLines={4}
                                        ellipsizeMode='tail'
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        {
                                            item.direccion
                                        }
                                    </TextStyled>
                                    : <></>
                            }
                        </ViewStyled>
                    </ViewStyled>

                    <ViewStyled
                        width={25}
                        height={11}
                        marginLeft={4}
                        backgroundColor={theme.transparent}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderWidth: 1,
                            // borderColor: theme.purple
                        }}
                    >
                        <ViewStyled
                            width={19}
                            height={4}
                            marginBottom={envio !== false ? 1 : 0}
                            backgroundColor={theme.transparent}
                            style={{
                                display: colorWp !== '#Empty' ? 'flex' : 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                disabled={colorWp === theme.dangerDark}
                                onPress={OpenWp}
                                style={
                                    [
                                        {
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: colorWp,
                                            borderRadius: 10,

                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }
                                    ]
                                }
                            >
                                {
                                    colorWp !== theme.dangerDark
                                        ? <Ionicons
                                            name="logo-whatsapp"
                                            size={adjustFontSize(15)}
                                            color={theme.primary}
                                        />
                                        : <Ionicons
                                            name="lock-closed"
                                            size={adjustFontSize(11)}
                                            color={theme.primary}
                                        />

                                }

                                <TextStyled
                                    fontSize={colorWp !== theme.dangerDark ? 13 : 12}
                                    color={theme.primary}
                                    style={{
                                        marginLeft: colorWp !== theme.dangerDark ? 5 : 2
                                    }}
                                >
                                    {
                                        colorWp !== theme.dangerDark
                                            ? 'Pedir'
                                            : 'Cerrado'
                                    }

                                </TextStyled>
                            </TouchableOpacity>
                        </ViewStyled>

                        <ViewStyled
                            width={25}
                            height={3}
                            backgroundColor={theme.transparent}
                            style={{
                                display: envio !== false && colorWp !== theme.dangerDark && colorWp !== '#Empty' ? 'flex' : 'none',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                textAlign='center'
                                fontSize={12}
                                color={theme.quaternary}
                            >
                                Envío Bs. {envio}
                            </TextStyled>
                        </ViewStyled>
                    </ViewStyled>

                    {/* <ViewStyled
                        width={21}
                        height={12}
                        backgroundColor={theme.transparent}
                        borderRadius={1}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderWidth: 1,
                            // borderColor: theme.green
                        }}
                    >
                        <ImageStyled
                            borderRadius={1}
                            source={item.img}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                        />
                    </ViewStyled> */}
                </ViewStyled>
            </ViewStyled >
        </>
    )
}
