import React from 'react'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import ImageStyled from '../../../../utils/ui/ImageStyled'
import TextStyled from '../../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../../utils/theme/theme_textStyles'
import ButtonsAddToCart from '../../ButtonsAddToCart'

export default function PromotionsItem({ item, shadow = true }) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={90}
            height={14}
            // marginRight={3}
            paddingHorizontal={3}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 15,
                ...(shadow && {
                    shadowColor: theme_colors.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 3,
                })
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
                    source={item.image ? { uri: item.image } : require('../../../../../assets/images/products/emptyPromo.png')}
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
                        {item.nameProduct}
                    </TextStyled>
                    <TextStyled
                        fontFamily='SFPro-Regular'
                        textAlign='left'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.grey}
                    >
                        {item.type}
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
                        position: 'relative'
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-SemiBold'
                        textAlign='left'
                        fontSize={theme_textStyles.small + .5}
                        color={theme_colors.black}
                    >
                        Bs. {item.price}
                    </TextStyled>

                    <ButtonsAddToCart item={item} />
                </ViewStyled>
            </ViewStyled>
        </ViewStyled>
    )
}