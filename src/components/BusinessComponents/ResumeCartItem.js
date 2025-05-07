import { View, Text } from 'react-native'
import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import ImageStyled from '../../utils/ui/ImageStyled';
import TextStyled from '../../utils/ui/TextStyled';
import ButtonsResumeCart from './ButtonsResumeCart';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function ResumeCartItem({ item }) {
    // console.log('item: ', item)
    const productWithVariables = {
        ...item,
        hasVariables: item.selectedVariables && item.selectedVariables.length > 0,
    };

    const getExtrasText = () => {
        if (!item.selectedVariables || item.selectedVariables.length === 0) {
            return '';
        }

        return item.selectedVariables.map(variable => {
            const selections = variable.selections || [];
            return selections.map(selection => selection.name).join(', ');
        }).join(' - ');
    };

    const extrasText = getExtrasText();

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={90}
            height={14}
            paddingHorizontal={3}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 15
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
                    source={item.image ? { uri: item.image } : require('../../../assets/images/products/emptyPromo.png')}
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
                    {extrasText ? (
                        <TextStyled
                            fontFamily='SFPro-Regular'
                            textAlign='left'
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {extrasText}
                        </TextStyled>
                    ) : null}
                </ViewStyled>

                <ViewStyled
                    paddingLeft={3.2}
                    paddingVertical={0.5}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '100%',
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        position: 'relative'
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-SemiBold'
                        textAlign='left'
                        fontSize={theme_textStyles.small + .5}
                        color={theme_colors.black}
                    >
                        Bs. {item.totalPrice || item.price}
                    </TextStyled>

                    <ButtonsResumeCart item={productWithVariables} />
                </ViewStyled>
            </ViewStyled>
        </ViewStyled>
    )
}