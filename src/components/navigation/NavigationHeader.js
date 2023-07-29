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
import backgroundCity from '../../assets/business/backgroundCity.png';
import GradientBackground from '../../assets/business/GradientBackground.png';
import backgroundCB from '../../assets/business/backgroundCB.jpg';
import backgroundLP from '../../assets/business/backgroundLP.jpg';
import backgroundTJ from '../../assets/business/backgroundTJ.jpg';

const images = {
    "Cochabamba": backgroundCB,
    "La Paz": backgroundLP,
    "Tarija": backgroundTJ,
    "default": backgroundCity,
    "gradient": GradientBackground
};


export default function NavigationHeader() {

    const [imageBackground, setImageBackground] = React.useState(images.gradient)

    const navigation = useNavigation()

    const RedirectUbication = () => {
        navigation.navigate("ChangeUbication")
    }

    const { location } = useSelector(state => state.auth);

    const CheckUbication = () => {
        if (location.address?.state === "Cochabamba" || location.address?.state === "La Paz" || location.address?.state === "Tarija") {
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

    const chooseBackgroundImage = () => {
        try {
            let newState = location.address?.state;

            switch (newState) {
                case "Cochabamba":
                case "La Paz":
                case "Tarija":
                    setImageBackground(images[newState]);
                    break;
                default:
                    setImageBackground(images.default);
            }
        } catch (error) {
            console.log('Error chooseBackgroundImage: ', error)
        }
    }

    React.useEffect(() => {
        if (location !== null) {
            if (location.address !== null) {
                chooseBackgroundImage()
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
                {imageBackground &&
                    <ImageBackground
                        source={imageBackground}
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
                                    width: widthPercentageToDP(57),
                                    height: heightPercentageToDP(9),
                                    backgroundColor: theme.primary,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <ViewStyled
                                    backgroundColor={theme.transparent}
                                    width={57}
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
                                            fontWeight='600'
                                            fontSize={16}
                                            color={theme.secondary}
                                            style={{
                                                textDecorationLine: 'underline',
                                            }}
                                        >
                                            {location ? location.address?.state : '.....'}
                                        </TextStyled>
                                        <TextStyled
                                            fontWeight='600'
                                            fontSize={16}
                                            color={theme.secondary}
                                        >
                                            {location ? ', ' : ' - '}
                                        </TextStyled>
                                        <TextStyled
                                            fontSize={16}
                                            color={theme.secondary}
                                            style={{
                                                textDecorationLine: 'underline',
                                                marginRight: 2
                                            }}
                                        >
                                            {location ? location.address?.country : '.....'}
                                        </TextStyled>
                                        <Ionicons name="location-outline" size={adjustFontSize(16)} color={theme.secondary} />
                                    </ViewStyled>
                                </ViewStyled>
                            </Pressable>
                        </SafeAreaView>
                    </ImageBackground>
                }
            </ViewStyled>
        </>
    )
}