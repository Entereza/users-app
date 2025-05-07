import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { FlatList, ActivityIndicator } from 'react-native'
import ProductsItem from './ProductsItem'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function ProductsList({ products = [], category, onLayout }) {
    if (!products || products.length === 0) {
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
                        fontFamily='SFPro-SemiBold'
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
                <TextStyled
                    fontFamily='SFPro-Regular'
                    textAlign='center'
                    fontSize={theme_textStyles.smedium}
                    color={theme_colors.grey}
                >
                    No hay productos disponibles en esta categoría
                </TextStyled>
            </ViewStyled>
        )
    }

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
                    fontFamily='SFPro-SemiBold'
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
                    paddingHorizontal: 5,
                }}
                style={{
                    alignSelf: 'flex-start'
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