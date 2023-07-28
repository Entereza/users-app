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

    const { location } = useSelector(state => state.auth);

    // function ProfileGo() {
    //     navigation.navigate("Profile")
    // }

    const CheckUbication = () => {
        if (location.address?.state === "Cochabamba" || location.address?.state === "La Paz") {
            console.log('Location Conocida (CheckUbication): ', location.address?.state)
            if (location.address?.neighbourhood === "") {
                console.log('Location CheckUbication neighbourhood: ', location.address?.neighbourhood)
                RedirectUbication()
            }
        } else {
            console.log('Other Location: (CheckUbication): ', location.address?.state)
            RedirectUbication()
        }
    }

    React.useEffect(() => {
        if (location !== null) {
            if (location.address !== null) {
                CheckUbication()
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
                    source={require('../../assets/business/backgroundCity.png')}
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
                                        {location ? location.address?.state : '.....'}
                                    </TextStyled>
                                    <TextStyled
                                        fontSize={adjustFontSize(14)}
                                        color={theme.secondary}
                                    >
                                        {location ? ', ' : ' - '}
                                    </TextStyled>
                                    <TextStyled
                                        fontSize={adjustFontSize(14)}
                                        color={theme.secondary}
                                        style={{
                                            textDecorationLine: 'underline',
                                            marginRight: 2
                                        }}
                                    >
                                        {location ? location.address?.country : '.....'}
                                    </TextStyled>
                                    <Ionicons name="location-outline" size={adjustFontSize(14)} color={theme.secondary} />
                                </ViewStyled>
                            </ViewStyled>
                        </Pressable>
                    </SafeAreaView>
                </ImageBackground>
            </ViewStyled>

            {/* <ViewStyled
                    backgroundColor={theme.transparent}
                    width={30}
                    height={8}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                    paddingRight={1}
                >
                    <Pressable onPress={ProfileGo}>
                        <ImageStyled
                            height={5.9}
                            width={12.1}
                            source={require('../../assets/profile/ProfileIcon.png')}
                            borderRadius={6}
                            style={{
                                resizeMode: 'contain',
                            }}
                        />
                    </Pressable>
                </ViewStyled> */}
        </>
    )
}