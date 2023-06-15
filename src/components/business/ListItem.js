import * as React from 'react';
import {
    Pressable,
    Modal,
    Linking,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import TextStyled from '../ui/TextStyled';
import ViewStyled from '../ui/ViewStyled';
import { Ionicons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/adjustText';
import { customStyles } from '../../utils/customStyles';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export default function ListItem({ item }) {

    const navigation = useNavigation()

    const Consola = () => {
        navigation.navigate("BusinessInfo", { data: item })
    }

    return (
        <>
            <ViewStyled
                backgroundColor={theme.primary}
                width={95}
                height={21}
                marginBottom={3}
                marginHorizontal={1}
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderRadius: 10,
                    ...customStyles.shadowStyle3
                }}
            >
                <Pressable onPress={Consola} style={{ width: '100%' }}>
                    <ImageBackground
                        source={item.background}
                        style={{
                            width: '100%',
                            height: heightPercentageToDP(16),
                            marginRight: widthPercentageToDP(3.7),
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            overflow: 'hidden',
                            position: 'relative',
                            resizeMode: 'cover',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <ViewStyled
                            backgroundColor={theme.transparent}
                            width={17}
                            height={8}
                            borderRadius={2}
                            style={{
                                borderWidth: 0.5,
                                borderColor: `${theme.primary}55`,
                                marginLeft: 17,
                            }}
                        >
                            <ImageStyled
                                source={item.img}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'stretch',
                                    //contain, center, cover, repeat, stretch
                                }}
                                borderRadius={2}
                            />
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={`${theme.dark}66`}
                            width={14.6}
                            height={6.7}
                            style={{
                                borderBottomLeftRadius: 60,
                                borderTopRightRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                borderWidth: 0.3,
                                borderColor: `${theme.primary}55`,
                                bottom: 40
                            }}
                        >
                            <TextStyled
                                fontFamily='ArtegraBold'
                                textAlign='center'
                                fontSize={12}
                                color={theme.primary}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    marginRight: 10,
                                    marginTop: -1
                                }}
                            >
                                {
                                    `${item.ahorro}%`
                                }
                            </TextStyled>
                        </ViewStyled>
                    </ImageBackground>
                </Pressable>
                <ViewStyled
                    height={5}
                    backgroundColor={theme.transparent}
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <TextStyled
                        fontFamily='BRFirmaBold'
                        textAlign='left'
                        fontSize={14}
                        color={theme.dark}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '40%',
                            // borderWidth: 1,
                            // borderColor: 'red',
                            marginLeft: 10,
                            marginBottom: 3
                        }}
                    >
                        {
                            item.nombre
                        }
                    </TextStyled>

                    <TextStyled
                        textAlign='center'
                        fontSize={14}
                        color={theme.tertiary}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '35%',
                            // borderWidth: 1,
                            // borderColor: 'blue',
                            marginBottom: 3
                        }}
                    >
                        {
                            `${item.numeroSucursales}` + (item.numeroSucursales > 1 ? ` Sucursales` : ` Sucursal`)
                        }
                    </TextStyled>

                    <TextStyled
                        textAlign='right'
                        fontSize={14}
                        color={
                            item.horario
                                ? item.horario !== 'empty'
                                    ? theme.success
                                    : theme.danger
                                : theme.danger
                        }
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '18%',
                            // borderWidth: 1,
                            // borderColor: 'red',
                            marginLeft: 'auto',
                            marginRight: 10,
                            marginBottom: 3
                        }}
                    >
                        {
                            item.horario !== 'empty'
                                ? item.horario
                                    ? `Abierto`
                                    : `Cerrado`
                                : `Cerrado`
                        }
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>

            {/* <Modal
                visible={OpenM}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    style={{
                        display: 'flex',
                        backgroundColor: '#000000AA',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        width={60}
                        height={52}
                        backgroundColor={theme.primary}
                        borderRadius={3}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <AntDesign
                            onPress={CloseM}
                            name="close"
                            size={adjustFontSize(24)}
                            color={theme.secondary}
                            style={{
                                marginTop: '-13%',
                                marginLeft: 'auto',
                                marginBottom: 5,
                                marginHorizontal: 15,
                            }}
                        />
                        <ImageStyled
                            source={item.img}
                            width={28}
                            height={13}
                            style={{
                                resizeMode: 'contain',
                            }}
                            borderRadius={2}
                        />

                        <ViewStyled
                            width={40}
                            height={6}
                            backgroundColor={theme.transparent}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            marginTop={1}
                        >
                            <TextStyled
                                fontWeight='400'
                                textAlign='center'
                                fontSize={14}
                                color={theme.quaternary}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    width: '90%',
                                }}
                            >
                                {
                                    item.nombreEmpresa
                                }
                            </TextStyled>
                            <TextStyled
                                fontWeight='400'
                                textAlign='center'
                                fontSize={13}
                                color={theme.secondary}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    width: '90%',
                                }}
                            >
                                {
                                    `Cashback ` + item.ahorro + ` %`
                                }
                            </TextStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={33}
                            height={6}
                            marginTop={1}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ViewStyled
                                width={32}
                                height={5}
                                style={{
                                    ...customStyles.shadowStyle
                                }}
                                borderRadius={3}
                            >
                                <TouchableOpacity
                                    disabled={colorFb === '#818181'}
                                    onPress={OpenFb}
                                    style={
                                        [
                                            customStyles.shadowStyle,
                                            {
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: theme.primary,
                                                borderRadius: 20,

                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingBottom: 2,
                                            }
                                        ]
                                    }
                                >
                                    <ViewStyled
                                        height={8.5 / 2}
                                        width={8.5}
                                        borderRadius={4}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            left: '-11%'
                                        }}
                                    >
                                        <Ionicons
                                            name="logo-facebook"
                                            size={adjustFontSize(20)}
                                            color={colorFb}
                                        />
                                    </ViewStyled>
                                    <TextStyled
                                        fontSize={13}
                                        color={colorFb}
                                    >
                                        Facebook
                                    </TextStyled>
                                </TouchableOpacity>
                            </ViewStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={33}
                            height={6}
                            marginTop={1}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ViewStyled
                                width={32}
                                height={5}
                                style={{
                                    ...customStyles.shadowStyle
                                }}
                                borderRadius={3}
                            >
                                <TouchableOpacity
                                    disabled={colorIg === '#818181'}
                                    onPress={OpenIg}
                                    style={
                                        [
                                            customStyles.shadowStyle,
                                            {
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: theme.primary,
                                                borderRadius: 20,

                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingBottom: 2,
                                            }
                                        ]
                                    }
                                >
                                    <ViewStyled
                                        height={8.5 / 2}
                                        width={8.5}
                                        borderRadius={4}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            left: '-11%'
                                        }}
                                    >
                                        <Ionicons
                                            name="logo-instagram"
                                            size={adjustFontSize(20)}
                                            color={colorIg}
                                        />
                                    </ViewStyled>
                                    <TextStyled
                                        fontSize={13}
                                        color={colorIg}
                                    >
                                        Instagram
                                    </TextStyled>
                                </TouchableOpacity>
                            </ViewStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={33}
                            height={6}
                            marginTop={1}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ViewStyled
                                width={32}
                                height={5}
                                style={{
                                    ...customStyles.shadowStyle
                                }}
                                borderRadius={3}
                            >
                                <TouchableOpacity
                                    disabled={colorWp === '#818181'}
                                    onPress={OpenWp}
                                    style={
                                        [
                                            customStyles.shadowStyle,
                                            {
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: theme.primary,
                                                borderRadius: 20,

                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingBottom: 2,
                                            }
                                        ]
                                    }
                                >
                                    <ViewStyled
                                        height={8.5 / 2}
                                        width={8.5}
                                        borderRadius={4}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            left: '-11%'
                                        }}
                                    >
                                        <Ionicons
                                            name="logo-whatsapp"
                                            size={adjustFontSize(20)}
                                            color={colorWp}
                                        />
                                    </ViewStyled>
                                    <TextStyled
                                        fontSize={13}
                                        color={colorWp}
                                    >
                                        ¡Pide ya!
                                    </TextStyled>
                                </TouchableOpacity>
                            </ViewStyled>
                        </ViewStyled>

                    </ViewStyled>
                </ViewStyled>
            </Modal> */}
        </>
    )
}
