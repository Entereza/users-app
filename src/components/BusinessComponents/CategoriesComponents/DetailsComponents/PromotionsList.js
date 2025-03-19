import React from 'react'
import PromotionsItem from './PromotionsItem'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import { FlatList } from 'react-native'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import TextStyled from '../../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../../utils/theme/theme_textStyles'

export default function PromotionsList({ promotions = [], onLayout }) {
    if (!promotions || promotions.length === 0) return null;

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onLayout={onLayout}
        >
            <ViewStyled
                width={93}
                height={4}
                marginBottom={1}
                backgroundColor={theme_colors.transparent}
                paddingLeft={1}
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.large}
                    color={theme_colors.black}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                        width: '100%',
                    }}
                >
                    Promociones
                </TextStyled>
            </ViewStyled>

            <FlatList
                contentContainerStyle={{
                    flex: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={promotions}
                renderItem={({ item, index }) =>
                    <PromotionsItem
                        key={index}
                        item={item}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}