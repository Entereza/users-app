import React from 'react'
import CatProductsItem from './CatProductsItem'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { FlatList } from 'react-native'
import { theme_colors } from '../../../utils/theme/theme_colors'

export default function CategoriesProductsList({ categories }) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            paddingVertical={1}
            style={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={categories}
                renderItem={({ item, index }) =>
                    <CatProductsItem
                        item={item}
                        onPress={null}
                        key={index}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}