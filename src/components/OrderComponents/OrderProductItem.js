import React, { useState } from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import ImageStyled from '../../utils/ui/ImageStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { TouchableOpacity } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'

export default function OrderProductItem({ item }) {
    const [showVariables, setShowVariables] = useState(false);

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={90}
            style={{
                borderRadius: 15,
                marginBottom: 15,
                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
                overflow: 'hidden'
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.white}
                width={90}
                height={14}
                paddingHorizontal={3}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '25%',
                        height: '80%',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 0.5,
                        borderColor: theme_colors.semiTransparent,
                        overflow: 'hidden',
                    }}
                >
                    <ImageStyled
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        source={item.products.url ? { uri: item.products.url } : require('../../../assets/images/products/emptyPromo.png')}
                    />
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '75%',
                        height: '90%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            paddingTop: 10,
                            width: '90%',
                            height: 'auto',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-SemiBold'
                            textAlign='left'
                            fontSize={theme_textStyles.smedium}
                            color={theme_colors.black}
                        >
                            {item.products.name}
                        </TextStyled>
                        <TextStyled
                            fontFamily='SFPro-Regular'
                            textAlign='left'
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                        >
                            Cantidad: {item.productVariable[0]?.pv.quantity || 1}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        paddingLeft={3.2}
                        paddingVertical={0.5}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '100%',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-SemiBold'
                            textAlign='left'
                            fontSize={theme_textStyles.small + .5}
                            color={theme_colors.black}
                        >
                            Bs. {item.products.pricing}
                        </TextStyled>

                        {item.productVariable.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setShowVariables(!showVariables)}
                                style={{
                                    padding: 5,
                                }}
                            >
                                <FontAwesome6
                                    name={showVariables ? "chevron-up" : "chevron-down"}
                                    size={16}
                                    color={theme_colors.primary}
                                />
                            </TouchableOpacity>
                        )}
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>

            {showVariables && item.productVariable.length > 0 && (
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    width={90}
                    paddingHorizontal={3}
                    paddingVertical={2}
                    style={{
                        borderTopWidth: 1,
                        borderTopColor: theme_colors.greyLine,
                    }}
                >
                    {item.productVariable.map((variable, index) => (
                        <ViewStyled
                            key={index}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                marginBottom: index < item.productVariable.length - 1 ? 10 : 0,
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.black}
                                style={{ marginBottom: 5 }}
                            >
                                {variable.pv.name}
                            </TextStyled>
                            {variable.pricingpv.map((selection, idx) => (
                                <TextStyled
                                    key={idx}
                                    fontFamily='SFPro-Regular'
                                    fontSize={theme_textStyles.smaller + 1}
                                    color={theme_colors.grey}
                                    style={{ marginLeft: 10 }}
                                >
                                    • {selection.name} {selection.price > 0 && `(+Bs. ${selection.price})`}
                                </TextStyled>
                            ))}
                        </ViewStyled>
                    ))}
                </ViewStyled>
            )}
        </ViewStyled>
    )
} 