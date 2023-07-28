import React from 'react'
import { ImageBackground, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import ViewStyled from '../ui/ViewStyled'
import adjustFontSize from '../../utils/adjustText';
import { theme } from '../../utils/theme';
import TextStyled from '../ui/TextStyled';
import { useNavigation } from '@react-navigation/native';
import { _uiSetPermission, _uiSetPermissionGps } from '../../redux/actions/uiActions';
import { _authSetLocation } from '../../redux/actions/authActions';
import { customStyles } from '../../utils/customStyles';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NavigationHeader() {
    const navigation = useNavigation()

    const RedirectUbication = () => {
        navigation.navigate("ChangeUbication")
    }

    const [finished, setFinished] = React.useState(false)
    const { location } = useSelector(state => state.auth);
    const [cityImageUrl, setCityImageUrl] = React.useState(require('../../assets/business/backgroundCity.png'));

    const verifyInfo = (location) => {
        console.log('Starts VerifyInto cities+user.')
        const { cities, ubication, permissions, reloadScreen } = location;

        // Verificamos si citieName coincide con state
        const matchingCity = cities.find(city => city.citieName === ubication.state);

        // Si matchingCity es nulo o permissions es falso, llamamos a RedirectUbication
        if (!permissions) {
            if (reloadScreen === true) {
                RedirectUbication();
                if (!matchingCity) {
                    RedirectUbication();
                    console.log("Ubicación Sin Entereza. - Permisos de Ubicación: ", permissions);
                    return require('../../assets/business/backgroundCity.png');
                }
            }
            setFinished(false)
        } else {
            setFinished(true)
        }

        return { uri: matchingCity.urlCity };
    }


    React.useEffect(() => {
        if (location !== null) {
            if (location.ubication !== null) {
                if (!finished) {
                    const newImageUrl = verifyInfo(location);
                    setCityImageUrl(newImageUrl);
                }
            }
        }
    }, [location])

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={100}
                height={21}

                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <ImageBackground
                    source={cityImageUrl}
                    resizeMode={'stretch'}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <SafeAreaView style={{ backgroundColor: theme.transparent }}>
                        <Pressable
                            onPress={RedirectUbication}
                            style={{
                                borderRadius: 10,
                                marginLeft: widthPercentageToDP(3),
                                width: widthPercentageToDP(58),
                                height: heightPercentageToDP(9),
                                backgroundColor: theme.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ViewStyled
                                backgroundColor={theme.transparent}
                                width={58}
                                height={5}
                                paddingLeft={3}
                                style={{
                                    borderRadius: 10,
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                }}
                            >
                                <TextStyled
                                    fontSize={12}
                                    color={theme.tertiary}
                                >
                                    Tu ubicación actual:
                                </TextStyled>
                                <ViewStyled
                                    width={52}
                                    height={3.5}
                                    backgroundColor={theme.transparent}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={adjustFontSize(14)}
                                        color={theme.secondary}
                                        style={{
                                            textDecorationLine: 'underline',
                                        }}
                                    >
                                        {location.ubication ? location.ubication.state : '.....'}
                                    </TextStyled>
                                    <TextStyled
                                        fontSize={adjustFontSize(14)}
                                        color={theme.secondary}
                                    >
                                        {location.ubication ? ', ' : ' - '}
                                    </TextStyled>
                                    <TextStyled
                                        fontSize={adjustFontSize(14)}
                                        color={theme.secondary}
                                        style={{
                                            textDecorationLine: 'underline',
                                            marginRight: 2
                                        }}
                                    >
                                        {location.ubication ? location.ubication.country : '.....'}
                                    </TextStyled>
                                    <Ionicons name="location-outline" size={adjustFontSize(14)} color={theme.secondary} />
                                </ViewStyled>
                            </ViewStyled>
                        </Pressable>
                    </SafeAreaView>
                </ImageBackground>
            </ViewStyled>
        </>
    )
}