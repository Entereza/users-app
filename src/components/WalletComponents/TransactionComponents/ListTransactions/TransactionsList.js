import React, { useEffect, useRef } from 'react'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import TransactionsItem from './TransactionsItem'
import { FlatList } from 'react-native'
import TextStyled from '../../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../../utils/theme/theme_textStyles'

export default function TransactionsList({
  showOrdersRestaurant,
  orders = [],
  ordersRestaurant = [],
}) {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [showOrdersRestaurant]);

  return (
    <ViewStyled
      width={100}
      paddingBottom={3}
      backgroundColor={theme_colors.transparent}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        ref={flatListRef}
        data={!showOrdersRestaurant ? orders : ordersRestaurant}
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
                fontSize={theme_textStyles.small}
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