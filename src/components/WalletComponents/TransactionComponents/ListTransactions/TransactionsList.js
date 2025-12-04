import React, { useEffect, useRef } from 'react'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import TransactionsItem from './TransactionsItem'
import { ActivityIndicator, FlatList } from 'react-native'
import TextStyled from '../../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../../utils/theme/theme_textStyles'
import useOrdersStore from '../../../../utils/tools/interface/ordersStore'
import ActiveOrderItem from './ActiveOrderItem'
import ImageStyled from '../../../../utils/ui/ImageStyled'

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

  const handleOrderPress = (item, event) => {
    if (onOrderPress) {
      onOrderPress(item, event);
    }
  };

  return (
    <ViewStyled
      width={100}
      paddingBottom={orders.length > 0 ? 3 : 12}
      backgroundColor={theme_colors.transparent}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {
        isLoading ? (
          <ViewStyled
            width={90}
            backgroundColor={theme_colors.transparent}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator
              size="large"
              color={theme_colors.primary}

            />
            <TextStyled
              fontFamily='SFPro-Italic'
              textAlign='center'
              fontSize={theme_textStyles.smedium}
              color={theme_colors.grey}
            >
              Cargando transacciones...
            </TextStyled>
          </ViewStyled>
        ) : orders.length > 0 ? (
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
                <>
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
                      `¡Sigue comprando con Entereza!`
                    </TextStyled>
                  </ViewStyled>
                </>
              )
            }}
            renderItem={({ item }) => (
              <TransactionsItem
                item={item}
                onPress={(event) => handleOrderPress(item, event)}
              />
            )}
          />
        ) : (
          <ViewStyled
            width={90}
            backgroundColor={theme_colors.transparent}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageStyled
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={require('../../../../../assets/gifs/noOrders.gif')}
            />

            <TextStyled
              fontFamily='SFPro-Italic'
              textAlign='center'
              fontSize={theme_textStyles.smedium}
              color={theme_colors.grey}
            >
              Aún no tienes pedidos realizados
            </TextStyled>
          </ViewStyled>
        )
      }
    </ViewStyled>
  )
}