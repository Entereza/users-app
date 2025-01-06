import React from 'react'
import { FlatList } from 'react-native'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import TextStyled from '../../../../utils/ui/TextStyled'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import TransactionsItem from './TransactionsItem'

export default function AllTransactionsList({
    allOrders = [],
}) {
    return (
        <ViewStyled
            width={100}
            height={92}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FlatList
                data={allOrders}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 30
                }}
                ListFooterComponent={() => {
                    return (
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            width={90}
                            height={5}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Regular'
                                textAlign='center'
                                fontSize={4.5}
                                color={theme_colors.grey}
                                style={{
                                    width: "100%",
                                }}
                            >
                                {`¡Sigue comprando con Entereza!`}
                            </TextStyled>
                        </ViewStyled>
                    )
                }}
                renderItem={({ item, index }) => (
                    <TransactionsItem
                        key={index}
                        item={item}
                    />
                )}
            />
        </ViewStyled>
    )
}