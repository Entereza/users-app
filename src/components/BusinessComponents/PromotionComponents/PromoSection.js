import React from 'react'
import PromoItem from './PromoItem'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { FlatList } from 'react-native'

export default function PromoSection() {
    const promos = [
        {
            id: 1,
            image: require('../../../../assets/promo.png')
        },
        {
            id: 2, 
            image: require('../../../../assets/promo.png')
        },
        {
            id: 3,
            image: require('../../../../assets/promo.png')
        }
    ]

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
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={promos}
                renderItem={({ item, index }) =>
                    <PromoItem
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