import React from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../utils/theme'
import ImageStyled from '../ui/ImageStyled'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import { customStyles } from '../../utils/customStyles'
import { Skeleton, Box, HStack, NativeBaseProvider } from "native-base";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'


export default function BusinessBubbles({ city, loadingSkeleton }) {

    const navigation = useNavigation()

    const GoScreenBusinnessCashbacks = () => {
        navigation.navigate('BusinessCashbacks', { ciudad: city })
    }

    const GoScreenBusinnessRelevant = () => {
        navigation.navigate('BusinessRelevant', { ciudad: city })
    }

    const SkeletonBubbles = () => {
        return (
            <NativeBaseProvider>
                <Box w={'90%'} flexDirection={"row"}>
                    <HStack
                        flexDirection={"column"}
                        w={widthPercentageToDP(46)}
                        h={heightPercentageToDP(11)}
                        borderWidth="1"
                        padding={2}
                        space={1}
                        rounded="md"
                        _dark={{
                            borderColor: "coolGray.500"
                        }}
                        _light={{
                            borderColor: "coolGray.200"
                        }}
                        p="4"
                        marginRight={3}

                    >
                        <Skeleton speed={1} marginBottom={2} size="100%" h="100%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
                    </HStack>
                    <HStack
                        flexDirection={"column"}
                        w={widthPercentageToDP(46)}
                        h={heightPercentageToDP(11)}
                        borderWidth="1"
                        padding={2}
                        space={1}
                        rounded="md"
                        _dark={{
                            borderColor: "coolGray.500"
                        }}
                        _light={{
                            borderColor: "coolGray.200"
                        }}
                        p="4"
                        marginRight={3}

                    >
                        <Skeleton speed={1} marginBottom={2} size="100%" h="100%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
                    </HStack>
                </Box>
            </NativeBaseProvider>
        )
    };

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={95}
                height={12}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                {
                    loadingSkeleton
                        ? SkeletonBubbles()
                        : <>
                            <Pressable
                                onPress={GoScreenBusinnessCashbacks}
                            >
                                <ViewStyled
                                    width={46}
                                    height={12}
                                    marginRight={3}
                                    backgroundColor={theme.primary}
                                    borderRadius={2}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        ...customStyles.shadowStyle
                                    }}
                                >
                                    <ViewStyled
                                        width={12}
                                        height={6}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',

                                        }}
                                    >
                                        <ImageStyled
                                            source={require('../../assets/business/Cashbacks.gif')}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </ViewStyled>
                                    <ViewStyled
                                        width={40}
                                        height={4}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',

                                        }}
                                    >
                                        <TextStyled
                                            textAlign='left'
                                            fontSize={15}
                                            color={theme.quaternary}
                                            numberOfLines={2}
                                        >
                                            {'Cashbacks '}
                                            <TextStyled
                                                textAlign='left'
                                                fontFamily='BRFirmaBold'
                                                fontWeight='bold'
                                                fontSize={15}
                                                color={theme.secondary}
                                            >
                                                {'Locos'}
                                            </TextStyled>
                                        </TextStyled>
                                    </ViewStyled>
                                </ViewStyled>
                            </Pressable>

                            <Pressable
                                onPress={GoScreenBusinnessRelevant}
                            >
                                <ViewStyled
                                    width={46}
                                    height={12}
                                    backgroundColor={theme.dark}
                                    borderRadius={2}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        ...customStyles.shadowStyle3
                                    }}
                                >
                                    <ViewStyled
                                        width={12}
                                        height={6}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',

                                        }}
                                    >
                                        <ImageStyled
                                            source={require('../../assets/business/PorqueTeEntereza.gif')}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </ViewStyled>
                                    <ViewStyled
                                        width={40}
                                        height={4}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',

                                        }}
                                    >
                                        <TextStyled
                                            textAlign='left'
                                            fontSize={15}
                                            color={theme.primary}
                                            numberOfLines={2}
                                        >
                                            {'Por que te'}
                                            <TextStyled
                                                textAlign='left'
                                                fontFamily='BRFirmaBold'
                                                fontWeight='bold'
                                                fontSize={15}
                                                color={theme.salmon}
                                            >
                                                {' Entereza'}
                                            </TextStyled>
                                        </TextStyled>
                                    </ViewStyled>
                                </ViewStyled>
                            </Pressable>
                        </>
                }

            </ViewStyled>
        </>
    )
}