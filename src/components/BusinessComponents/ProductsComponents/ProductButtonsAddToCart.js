import React, { useState, useEffect } from 'react'
import useCartStore from '../../../utils/tools/interface/cartStore'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import adjustFontSize from '../../../utils/ui/adjustText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function ProductButtonsAddToCart({ item, paddingHorizontal = 1.5, onQuantityChange }) {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        onQuantityChange?.(quantity);
    }, [quantity]);

    const handleAdd = () => {
        setQuantity(prev => prev + 1);
    };

    const handleRemove = () => {
        setQuantity(prev => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={35}
            height={5.5}
            paddingHorizontal={paddingHorizontal}
            style={{
                borderRadius: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity onPress={handleRemove}>
                <ViewStyled
                    backgroundColor={theme_colors.white}
                    width={10}
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: theme_colors.semiTransparent
                    }}
                >
                    <MaterialCommunityIcons
                        name={"minus"}
                        color={theme_colors.primary}
                        size={adjustFontSize(theme_textStyles.large)}
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
                    fontSize={theme_textStyles.large}
                    color={theme_colors.black}
                >
                    {quantity}
                </TextStyled>
            </ViewStyled>

            <TouchableOpacity onPress={handleAdd}>
                <ViewStyled
                    backgroundColor={theme_colors.primary}
                    width={10}
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                >
                    <MaterialCommunityIcons
                        name={"plus"}
                        color={theme_colors.white}
                        size={adjustFontSize(theme_textStyles.large)}
                    />
                </ViewStyled>
            </TouchableOpacity>
        </ViewStyled>
    )
}