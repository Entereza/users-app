import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import adjustFontSize from '../../utils/ui/adjustText'
import TextStyled from '../../utils/ui/TextStyled'
import useCartStore from '../../utils/tools/interface/cartStore'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'
import { widthPercentageToDP } from 'react-native-responsive-screen'

export default function ButtonsAddToCart({ item, width = 20, height = 4, paddingHorizontal = 1.5, right = 0, bottom = 2 }) {
    const addToCart = useCartStore((state) => state.addToCart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const cartItem = useCartStore((state) => state.cart.find(cartItem => cartItem.id === item.id))

    const navigation = useNavigation()

    const goToDetailsProduct = () => {
        navigation.navigate(private_name_routes.empresas.empresaProducto, { product: item })
    }

    return (
        <ViewStyled
            backgroundColor={theme_colors.lightGrey3}
            height={height}
            paddingHorizontal={paddingHorizontal}
            style={{
                width: item.hasVariables ? 'auto' : widthPercentageToDP(width),
                borderRadius: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                right: right,
                bottom: bottom,
            }}
        >
            {
                !item.hasVariables &&
                (
                    <>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                            <ViewStyled
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    width: 'auto',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialCommunityIcons
                                    name={"minus"}
                                    color={theme_colors.dark}
                                    size={adjustFontSize(theme_textStyles.small + .5)}
                                />
                            </ViewStyled>
                        </TouchableOpacity>

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flex: 1,
                                maxWidth: '50%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-SemiBold'
                                textAlign='center'
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.black}
                            >
                                {cartItem ? cartItem.quantity : 0}
                            </TextStyled>
                        </ViewStyled>
                    </>
                )
            }

            <TouchableOpacity onPress={item.hasVariables ? goToDetailsProduct : () => addToCart(item)}>
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: 'auto',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MaterialCommunityIcons
                        name={"plus"}
                        color={theme_colors.dark}
                        size={adjustFontSize(theme_textStyles.small + .5)}
                    />
                </ViewStyled>
            </TouchableOpacity>
        </ViewStyled>
    )
}