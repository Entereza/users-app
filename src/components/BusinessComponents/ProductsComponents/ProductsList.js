import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { FlatList } from 'react-native'
import ProductsItem from './ProductsItem'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function ProductsList({ products = [], category, onLayout }) {
    return (
        <ViewStyled
            marginVertical={1}
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
                    {category}
                </TextStyled>
            </ViewStyled>

            <FlatList
                contentContainerStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={products}
                renderItem={({ item, index }) =>
                    <ProductsItem
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