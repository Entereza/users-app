// REACT    
import React, { useState } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'

// LIBRARIES 
import { AntDesign } from '@expo/vector-icons'
//import PDFReader from 'rn-pdf-reader-js'

// CUSTOM 
import { customStyles } from '../../utils/customStyles'
import { theme } from '../../utils/theme'
import ImageStyled from '../ui/ImageStyled'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled'
import adjustFontSize from '../../utils/adjustText'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function WalletSalesItem({ item }) {
    const [toggle, setToggle] = useState(false)

    const slideAnim = React.useRef(new Animated.Value(0)).current;

    const showComponent = () => {
        setToggle(true);

        slideAnim.setValue(-50);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };


    const hideComponent = () => {
        setToggle(false);
    };


    return (
        <>
            <Pressable
                onPress={toggle ? hideComponent : showComponent}
                marginTop={heightPercentageToDP(2)}
            >
                <ViewStyled
                    width={90}
                    height={11}
                    borderRadius={2}
                    style={[
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 1,

                        },
                        toggle ?
                            {
                                borderBottomEndRadius: 0,
                                borderBottomStartRadius: 0,
                                borderBottomWidth: 0,
                            }
                            : {
                                // ...customStyles.shadowStyle,
                            }
                    ]}
                    paddingHorizontal={1}
                    marginLeftAuto
                    marginRightAuto
                >
                    <ViewStyled
                        width={15}
                        height={15 / 2}
                        marginLeft={2}
                        backgroundColor={theme.transparent}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ImageStyled
                            borderRadius={2}
                            source={item.img}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'stretch',
                            }}
                        />
                    </ViewStyled>

                    <ViewStyled
                        height={9}
                        width={70}
                        style={{
                            flexDirection: 'row',
                        }}
                        backgroundColor={theme.transparent}
                    >
                        <ViewStyled
                            height={9}
                            width={40}
                            style={{
                                justifyContent: 'center',
                            }}
                            backgroundColor={theme.transparent}
                            paddingLeft={3}
                            marginRightAuto
                        >
                            <TextStyled
                                fontSize={16}
                                fontWeight='700'
                                color={theme.quaternary}
                            >
                                {
                                    item.userVentDetail.nombreEmpresa
                                }
                            </TextStyled>
                            <TextStyled
                                fontSize={10}
                                color={theme.quaternary}
                            >
                                {
                                    new Date(item.userVentDetail.fecha).toLocaleDateString('es-ES')
                                }
                            </TextStyled>
                        </ViewStyled>
                        <ViewStyled
                            height={9}
                            width={25}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            backgroundColor={theme.transparent}
                        >
                            <AntDesign name="arrowup" size={adjustFontSize(14)} color={theme.success} style={{ marginBottom: 2, marginRight: 3 }} />

                            <TextStyled
                                fontSize={13}
                                fontWeight='400'
                                color={theme.success}
                            >
                                Bs. {item.userVentDetail.ahorro > 0 ? Number(item.userVentDetail.ahorro).toFixed(1) : '0'}
                            </TextStyled>
                        </ViewStyled>
                    </ViewStyled>
                </ViewStyled>

                {toggle && (
                    <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
                        <ViewStyled
                            height={13}
                            width={90}
                            marginLeftAuto
                            marginRightAuto
                            borderRadius={2}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopStartRadius: 0,
                                borderTopEndRadius: 0,
                                position: 'relative',
                                borderTopWidth: 0,
                                zIndex: 0,
                                ...customStyles.shadowStyle
                            }}
                        >
                            <ViewStyled
                                height={13 / 2}
                                width={90}
                                style={{
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                backgroundColor={theme.transparent}
                            >
                                <ViewStyled
                                    width={95 / 3}
                                    style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    backgroundColor={theme.transparent}
                                    height={10 / 3}
                                >
                                    <TextStyled
                                        style={{
                                            marginRight: 7
                                        }}
                                        color={theme.tertiary}
                                        fontSize={14}
                                        textAlign='center'

                                    >
                                        Total
                                    </TextStyled>
                                    <TextStyled
                                        color={theme.quaternary}
                                        fontWeight='600'
                                        fontSize={16}
                                        textAlign='center'

                                    >
                                        Bs. {item.userVentDetail.total > 0 ? Number(item.userVentDetail.total).toFixed(1) : '0'}
                                    </TextStyled>
                                </ViewStyled>
                                <ViewStyled
                                    width={95 / 3}
                                    style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    backgroundColor={theme.transparent}
                                    height={10 / 3}
                                >
                                    <TextStyled
                                        color={theme.tertiary}
                                        fontSize={14}
                                        textAlign='center'

                                    >
                                        Ahorro
                                    </TextStyled>
                                    <TextStyled
                                        color={theme.quaternary}
                                        fontWeight='600'
                                        fontSize={16}
                                        textAlign='center'

                                    >
                                        Bs. {item.userVentDetail.ahorro > 0 ? Number(item.userVentDetail.ahorro).toFixed(1) : '0'}
                                    </TextStyled>
                                </ViewStyled>
                                <ViewStyled
                                    width={95 / 3}
                                    style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    backgroundColor={theme.transparent}
                                    height={10 / 3}
                                >
                                    <TextStyled
                                        color={theme.tertiary}
                                        fontSize={14}
                                        textAlign='center'
                                    >
                                        Comisión
                                    </TextStyled>
                                    <TextStyled
                                        color={theme.quaternary}
                                        fontWeight='600'
                                        fontSize={16}
                                        textAlign='center'
                                    >
                                        Bs. {item.userVentDetail.comision > 0 ? Number(item.userVentDetail.comision).toFixed(1) : '0'}
                                    </TextStyled>
                                </ViewStyled>
                            </ViewStyled>
                        </ViewStyled>
                    </Animated.View>
                )}
            </Pressable>
        </>
    )
}