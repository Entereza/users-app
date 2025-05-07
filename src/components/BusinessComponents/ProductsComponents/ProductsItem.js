import React, { useEffect, useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ImageStyled from '../../../utils/ui/ImageStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import ButtonsAddToCart from '../ButtonsAddToCart'
import { Pressable, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../../utils/route/private_name_routes'

export default function ProductsItem({ item }) {
    const navigation = useNavigation()
    
    const [isCheckingVariables, setIsCheckingVariables] = useState(false)
    const hasVariables = item.variables && item.variables.length > 0

    const productWithVariables = {
        ...item,
        hasVariables,
        variables: item.variables
    }

    const goToDetailsProduct = () => {
        navigation.navigate(private_name_routes.empresas.empresaProducto, { product: item, isEditing: false })
    }


    return (
        <Pressable onPress={goToDetailsProduct}>
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                width={44}
                height={35}
                marginRight={3.5}
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    overflow: 'visible'
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    height={22}
                    style={{
                        width: '95%',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderColor: theme_colors.semiTransparent,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <ImageStyled
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        source={item.image ? { uri: item.image } : require('../../../../assets/images/products/emptyPromo.png')}
                    />

                    <ViewStyled
                        borderRadius={1}
                        paddingHorizontal={1}
                        paddingVertical={0.5}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: 'auto',
                            height: 'auto',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: theme_colors.white,
                            position: "absolute",
                            top: 10,
                            right: 10
                        }}
                    >
                        <MaterialCommunityIcons
                            name="heart"
                            size={adjustFontSize(theme_textStyles.medium)}
                            color={theme_colors.white}
                        />
                    </ViewStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginTop={1}
                    style={{
                        width: '90%',
                        height: 'auto',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        textAlign='left'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.black}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {item.nameProduct}
                    </TextStyled>
                    <TextStyled
                        fontFamily='SFPro-Regular'
                        textAlign='left'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.grey}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {item.description}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginTop={1}
                    paddingLeft={1}
                    style={{
                        width: '95%',
                        height: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        textAlign='left'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.black}
                    >
                        Bs. {item.price}
                    </TextStyled>

                    {!isCheckingVariables && (
                        <ButtonsAddToCart item={productWithVariables} paddingHorizontal={2} height={3.8} bottom={-0.5} />
                    )}
                </ViewStyled>
            </ViewStyled>
        </Pressable>
    )
}