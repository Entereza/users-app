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

export default function ButtonsAddToCart({
    item,
    width = 20,
    height = 4,
    paddingHorizontal = 1.5,
    right = 0,
    bottom = 2,
    showTotalQuantity = true
}) {
    const addToCart = useCartStore((state) => state.addToCart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const cart = useCartStore((state) => state.cart)

    // Buscar el item específico en el carrito (con las mismas variables)
    const cartItem = useCartStore((state) => state.cart.find(cartItem => cartItem.id === item.id))

    // Calcular la cantidad total de este producto en el carrito (sumando todas las variaciones)
    const totalQuantity = cart.reduce((total, cartItem) => {
        if (cartItem.id === item.id) {
            return total + (cartItem.quantity || 1);
        }
        return total;
    }, 0);

    // Determinar qué cantidad mostrar según la prop showTotalQuantity
    const displayQuantity = showTotalQuantity ? totalQuantity : (cartItem ? cartItem.quantity : 0);

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
                        <TouchableOpacity onPress={() => removeFromCart(cartItem?.uniqueId || item.id)}>
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
                            marginHorizontal={1}
                            backgroundColor={theme_colors.transparent}
                            style={{
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
                                {displayQuantity}
                            </TextStyled>
                        </ViewStyled>
                    </>
                )
            }

            <TouchableOpacity onPress={item.hasVariables ? goToDetailsProduct : () => addToCart({ ...item, quantity: 1 })}>
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    paddingHorizontal={item.hasVariables ? 1 : 0}
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
                        size={adjustFontSize(theme_textStyles.smedium)}
                    />
                </ViewStyled>
            </TouchableOpacity>
        </ViewStyled>
    )
}