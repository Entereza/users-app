import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { FlatList } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import TransferItem from './TransferItem'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import ImageStyled from '../../utils/ui/ImageStyled'

export default function TransferList({ transactions = [] }) {
    return (
        <ViewStyled
            marginTop={1}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
                renderItem={({ item, index }) =>
                    <TransferItem
                        key={index}
                        item={item}
                    />
                }
                horizontal={false}
                scrollEnabled={true}
                data={transactions}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
} 