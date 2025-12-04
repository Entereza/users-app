import React, { useRef, useEffect } from 'react'
import CatProductsItem from './CatProductsItem'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { FlatList } from 'react-native'
import { theme_colors } from '../../../utils/theme/theme_colors'

export default function CategoriesProductsList({
    categories = [],
    selectedCategory,
    onCategoryPress,
    categoriesListRef
}) {
    const flatListRef = useRef(null)

    // Establecer la referencia del FlatList
    useEffect(() => {
        if (categoriesListRef) {
            categoriesListRef.current = flatListRef.current
        }
    }, [categoriesListRef])

    // Efecto para manejar el scroll horizontal cuando cambia la categoría seleccionada
    useEffect(() => {
        if (!flatListRef.current) return;

        const index = categories.indexOf(selectedCategory)
        if (index !== -1) {
            flatListRef.current.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5
            })
        }
    }, [selectedCategory, categories])

    const getItemLayout = (data, index) => ({
        length: 100,
        offset: 100 * index,
        index,
    })

    const handleScrollToIndexFailed = (info) => {
        console.log('HandleScrollToIndexFailed')
        if (!flatListRef.current) return;

        const wait = new Promise(resolve => setTimeout(resolve, 100));
        wait.then(() => {
            flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
                viewPosition: 0.5
            })
        });
    }

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            paddingVertical={1}
            style={{
                width: '100%',
                height: 'auto',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                elevation: 2,
                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.18,
                shadowRadius: 6.0,

                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                zIndex: 1000,
            }}
        >
            <FlatList
                ref={flatListRef}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <CatProductsItem
                        item={item}
                        onPress={() => onCategoryPress(item)}
                        isSelected={selectedCategory === item}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                getItemLayout={getItemLayout}
                onScrollToIndexFailed={handleScrollToIndexFailed}
                initialScrollIndex={0}
                scrollEventThrottle={16}
            />
        </ViewStyled>
    )
}