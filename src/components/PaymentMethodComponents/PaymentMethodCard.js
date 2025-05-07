import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import TextStyled from '../../utils/ui/TextStyled'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import AddCreditCard from './AddCreditCard'

export default function PaymentMethodCard({ item, isSelected, isKeyboardVisible, onPressSelect }) {
    const colorIcon = isSelected ? theme_colors.primary : theme_colors.grey
    const iconName = isSelected ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"
    const colorText = theme_colors.black
    const backgroundColor = theme_colors.white

    const isQrSelected = isSelected && item.name === "QR"
    const isTarjetaSelected = isSelected && item.name === "Tarjeta"

    const renderBottomItem = () => {
        if (isQrSelected) {
            return (
                <ViewStyled
                    width={85}
                    marginTop={1}
                    marginBottom={2}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontSize={theme_textStyles.small}
                        fontFamily='SFPro-SemiBold'
                        color={theme_colors.lightGrey2}
                    >
                        Se indicará a la moto que pagarás con QR y lo tendrá listo al momento de entregarte el pedido.
                    </TextStyled>
                </ViewStyled>
            )
        } else if (isTarjetaSelected) {
            return (
                <AddCreditCard />
            )
        } else {
            return;
        }
    }

    return (
        <>
            <ViewStyled
                width={100}
                marginTop={isKeyboardVisible && item.name === "Tarjeta" ? 3 : 0}
                paddingHorizontal={1}
                marginBottom={1}
                backgroundColor={theme_colors.transparent}
                style={{
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: isKeyboardVisible && item.name !== "Tarjeta" ? 'none' : 'flex',
                }}
            >
                <Pressable onPress={onPressSelect} style={{ width: '95%', height: heightPercentageToDP(9) }}>
                    <ViewStyled
                        borderRadius={1.5}
                        paddingHorizontal={3.5}
                        backgroundColor={backgroundColor}
                        style={{
                            width: '100%',
                            height: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            shadowColor: theme_colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 3,
                        }}
                    >
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                width: '17%',
                                height: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesome6 name={item.icon} size={adjustFontSize(theme_textStyles.medium)} color={colorIcon} />
                        </ViewStyled>

                        <ViewStyled
                            paddingHorizontal={1}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flex: 1,
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <TextStyled
                                fontSize={theme_textStyles.smedium}
                                color={colorText}
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={{
                                    fontFamily: 'SFPro-SemiBold',
                                }}
                            >
                                {item.name}
                            </TextStyled>
                        </ViewStyled>

                        <MaterialCommunityIcons name={iconName} size={adjustFontSize(theme_textStyles.small + .5)} color={colorIcon} />
                    </ViewStyled>
                </Pressable>

                {renderBottomItem()}
            </ViewStyled>
        </>
    )
}