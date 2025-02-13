import React, { useRef, useEffect } from 'react'
import CatProductsItem from './CatProductsItem'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { FlatList } from 'react-native'
import { theme_colors } from '../../../utils/theme/theme_colors'
import useCategoryStore from '../../../utils/tools/interface/categoryStore'

export default function CategoriesProductsList({ categories = [] }) {
    const flatListRef = useRef(null)
    const {
        selectedCategory,
        setSelectedCategory,
        setCategoriesListRef,
        scrollToCategory,
        setIsManualSelection
    } = useCategoryStore()

    // Establecer la referencia del FlatList
    useEffect(() => {
        setCategoriesListRef(flatListRef)
    }, [])

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
    }, [selectedCategory])

    const handleCategoryPress = (category) => {
        setIsManualSelection(true);
        setSelectedCategory(category)
        if (category === 'Menú') {
            scrollToCategory('Promociones')
        } else {
            scrollToCategory(category)
        }
        setTimeout(() => {
            setIsManualSelection(false);
        }, 1000);
    }

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
                        onPress={() => handleCategoryPress(item)}
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