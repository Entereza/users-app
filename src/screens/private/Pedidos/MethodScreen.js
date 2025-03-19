import React, { useState, useEffect } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import { FlatList, Keyboard } from 'react-native'
import PaymentMethodCard from '../../../components/PaymentMethodComponents/PaymentMethodCard'
import useCartStore from '../../../utils/tools/interface/cartStore'
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'

export default function MethodScreen() {
    const { listPaymentMethods, paymentMethod: selectedPaymentMethodStored, setPaymentMethod } = useCartStore()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const [keyboardVisible, setKeyboardVisible] = useState(false)

    const navigation = useNavigation()
    const { toggleTabBar } = useTabBarStore()

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true)
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false)
            }
        )

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    const onPressSelect = (item) => {
        if (selectedPaymentMethodStored?.name === item.name) {
            return
        } else {
            setSelectedPaymentMethod(item)
            setPaymentMethod(item)
        }
    }

    const goBack = () => {
        navigation.goBack()
        toggleTabBar(false)
    }

    return (
        <SafeAreaView edges={["top"]} style={{ backgroundColor: theme_colors.white }}>
            <ViewStyled
                backgroundColor={theme_colors.white}
                width={100}
                style={{
                    height: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                {
                    !keyboardVisible && (
                        <>
                            <HeaderInternalScreen title={"Método de pago"} onPress={goBack} />

                            <ViewStyled
                                height={4}
                                marginTop={2}
                                marginBottom={2}
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    width: '90%',
                                    height: 'auto',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <TextStyled
                                    fontFamily='SFPro-Regular'
                                    textAlign='left'
                                    fontSize={theme_textStyles.small + .5}
                                    color={theme_colors.grey}
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                >
                                    Selecciona el método de pago para el pago de tu pedido
                                </TextStyled>
                            </ViewStyled>
                        </>
                    )
                }

                <FlatList
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    horizontal={false}
                    scrollEnabled={true}
                    data={listPaymentMethods}
                    renderItem={({ item, index }) =>
                        <PaymentMethodCard
                            key={index}
                            item={item}
                            isKeyboardVisible={keyboardVisible}
                            isSelected={
                                selectedPaymentMethod
                                    ? selectedPaymentMethod?.name === item.name
                                    : selectedPaymentMethodStored?.name === item.name
                            }
                            onPressSelect={() => onPressSelect(item)}
                        />
                    }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </ViewStyled>
        </SafeAreaView>
    )
}