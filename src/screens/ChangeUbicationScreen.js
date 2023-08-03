import * as React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import TextStyled from '../components/ui/TextStyled'
import { Ionicons } from '@expo/vector-icons'
import { _authSetLocation } from '../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native'


export default function ChangeUbicationScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const [changingUbication, setChangingUbication] = React.useState(false)

    const SetLaPaz = () => {
        setChangingUbication(true)
        try {
            console.log("Setting Ubication La Paz")

            let json = {
                "address": {
                    "ISO3166-2-lvl4": "",
                    "city": "",
                    "country": "Bolivia",
                    "country_code": "",
                    "county": "",
                    "neighbourhood": "n",
                    "road": "",
                    "state": "La Paz",
                }
            }

            let json2 = {
                "coords": {
                    "latitude": -16.49565866175763,
                    "longitude": -68.1335564420775,
                    "permissions": false
                }
            }

            console.log("Ubicacion Seteada Android / IOs La Paz: ", json.address, '-', json2.coords)
            dispatch(_authSetLocation({ address: json.address, coords: json2.coords }))

        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                navigation.goBack()
                setChangingUbication(false)
            }, 1500);
        }
    }

    const SetCbba = () => {
        setChangingUbication(true)
        try {
            console.log("Setting Ubication Cbba")

            let json = {
                "address": {
                    "ISO3166-2-lvl4": "",
                    "city": "",
                    "country": "Bolivia",
                    "country_code": "",
                    "county": "",
                    "neighbourhood": "n",
                    "road": "",
                    "state": "Cochabamba",
                }
            }

            let json2 = {
                "coords": {
                    "latitude": -17.393799834733354,
                    "longitude": -66.1569548714268,
                    "permissions": false
                }
            }

            console.log("Ubicacion Seteada Android / IOs Cochabamba: ", json.address, '-', json2.coords)
            dispatch(_authSetLocation({ address: json.address, coords: json2.coords }))

        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                navigation.goBack()
                setChangingUbication(false)
            }, 1500);
        }
    }

    const SetTarija = () => {
        setChangingUbication(true)
        try {
            console.log("Setting Ubication Tarija")

            let json = {
                "address": {
                    "ISO3166-2-lvl4": "",
                    "city": "",
                    "country": "Bolivia",
                    "country_code": "",
                    "county": "",
                    "neighbourhood": "n",
                    "road": "",
                    "state": "Tarija",
                }
            }

            let json2 = {
                "coords": {
                    "latitude": -21.5339198,
                    "longitude": -64.7343096,
                    "permissions": false
                }
            }

            console.log("Ubicacion Seteada Android / IOs Cochabamba: ", json.address, '-', json2.coords)
            dispatch(_authSetLocation({ address: json.address, coords: json2.coords }))
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setChangingUbication(false)
                navigation.goBack()
            }, 1500);
        }
    }


    return (
        <>
            <ViewStyled
                backgroundColor={theme.background}
                width={100}
                height={100}
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    backgroundColor={theme.transparent}
                    width={100}
                    height={10 + (3 * 9)}
                >
                    <ViewStyled
                        width={100}
                        height={6}
                        backgroundColor={theme.transparent}
                        paddingLeft={4}
                        style={[
                            {
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }
                        ]}
                    >
                        <Ionicons
                            name="compass"
                            size={32}
                            color={theme.secondary}
                            style={{
                                marginRight: 14
                            }}
                        />
                        <TextStyled
                            fontSize={18}
                            color={theme.quaternary}
                            style={{
                                marginBottom: 3,
                            }}
                        >
                            Bolivia
                        </TextStyled>
                    </ViewStyled>

                    <TouchableOpacity onPress={SetLaPaz}>
                        <ViewStyled
                            width={100}
                            height={8}
                            backgroundColor={theme.transparent}
                            paddingLeft={12}
                            style={[
                                {
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }
                            ]}
                        >
                            <Ionicons
                                name="business"
                                size={30}
                                color={theme.secondary}
                                style={{
                                    marginRight: 15
                                }}
                            />
                            <TextStyled
                                fontSize={16}
                                color={theme.quaternary}
                                style={{
                                    marginBottom: 3,
                                }}
                            >
                                La Paz
                            </TextStyled>
                        </ViewStyled>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={SetCbba}>
                        <ViewStyled
                            width={100}
                            height={6}
                            backgroundColor={theme.transparent}
                            paddingLeft={12}
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Ionicons
                                name="business"
                                size={30}
                                color={theme.secondary}
                                style={{
                                    marginRight: 15
                                }}
                            />
                            <TextStyled
                                fontSize={16}
                                color={theme.quaternary}
                                style={{
                                    marginBottom: 3,
                                }}
                            >
                                Cochabamba
                            </TextStyled>
                        </ViewStyled>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={SetTarija}>
                        <ViewStyled
                            width={100}
                            height={6}
                            backgroundColor={theme.transparent}
                            paddingLeft={12}
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Ionicons
                                name="business"
                                size={30}
                                color={theme.secondary}
                                style={{
                                    marginRight: 15
                                }}
                            />
                            <TextStyled
                                fontSize={16}
                                color={theme.quaternary}
                                style={{
                                    marginBottom: 3,
                                }}
                            >
                                Tarija
                            </TextStyled>
                        </ViewStyled>
                    </TouchableOpacity>

                    {
                        changingUbication
                            ? <ActivityIndicator size="large" color={theme.secondary} />
                            : <></>
                    }
                </ViewStyled>
                <ViewStyled
                    width={100}
                    height={5}
                    backgroundColor={theme.transparent}
                    paddingLeft={4}
                    marginTopAuto
                    marginBottom={20}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        textAlign='center'
                        fontSize={13}
                        color={theme.tertiary}
                        style={{
                            marginBottom: 3,
                            width: '90%'
                        }}
                    >
                        Puedes cambiar tu ciudad presionando tu ubicación actual.
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>
        </>
    )
}