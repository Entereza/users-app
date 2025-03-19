import React, { useEffect, useRef } from 'react'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import TransactionsItem from './TransactionsItem'
import { FlatList } from 'react-native'
import TextStyled from '../../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../../utils/theme/theme_textStyles'
import useOrdersStore from '../../../../utils/tools/interface/ordersStore'
import ActiveOrderItem from './ActiveOrderItem'

export default function TransactionsList({
  orders = [],
  isLoading,
  onRefresh,
  isRefreshing,
  onOrderPress
}) {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, []);

  // const renderHeader = () => {
  //   if (activeOrder) {
  //     return (
  //       <ActiveOrderItem
  //         order={activeOrder}
  //         onPress={() => onOrderPress(activeOrder)}
  //       />
  //     );
  //   }
  //   return null;
  // };

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
        data={orders}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.order.id}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
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
              height={orders.length === 0 ? 35 : 5}
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
                {
                  orders.length === 0
                    ? `Aún no tienes pedidos realizados`
                    : `¡Sigue comprando con Entereza!`
                }
              </TextStyled>
            </ViewStyled>
          )
        }}
        renderItem={({ item }) => (
          <TransactionsItem
            item={item}
            onPress={() => onOrderPress(item)}
          />
        )}
      />
    </ViewStyled>
  )
}