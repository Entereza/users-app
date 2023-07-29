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

    const { location } = useSelector(state => state.auth);

    const cityList = useSelector(state => state.auth.location.cities);

    const [changingUbication, setChangingUbication] = React.useState(false)

    const [locationUser, setLocationUser] = React.useState({
        country: '',
        state: '',
        cityCode: ''
    })

    const [coordsUser, setCoordsUser] = React.useState({
        latitude: '',
        longitude: ''
    })

    const setUbication = (city) => {
        setChangingUbication(true)
        console.log('Data City: ', city)
        setCoordsUser({
            latitude: city.latitude,
            longitude: city.longitude
        });

        setLocationUser({
            country: city.citieCountry,
            state: city.citieName,
            cityCode: city.cityCode
        });

        console.log(`Ubicacion Seteada Android / IOs: `, city.citieName, '- ', locationUser, '-', coordsUser)
    };

    React.useEffect(() => {
        if (coordsUser.latitude !== '' && coordsUser.longitude !== '' && locationUser.country !== '' && locationUser.state !== '') {
            dispatch(_authSetLocation({ cities: cityList, permissions: location.permissions, coords: coordsUser, ubication: locationUser, reloadScreen: false }));

            navigation.goBack();
            setChangingUbication(false)
        }
    }, [coordsUser, locationUser])

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
                    height={10 + (cityList.length * 9)}
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

                    {
                        cityList.map((city, index) => (
                            <TouchableOpacity disabled={changingUbication} key={index} onPress={() => setUbication(city)}>
                                <ViewStyled
                                    width={100}
                                    height={8}
                                    backgroundColor={theme.transparent}
                                    paddingLeft={12}
                                    marginBottom={1}
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
                                        {city.citieName}
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        ))
                    }

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