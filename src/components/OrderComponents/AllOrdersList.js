import React from 'react'
import { FlatList } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import AllOrdersItem from './AllOrdersItem'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'
import useTabBarStore from '../../utils/tools/interface/tabBarStore'

export default function AllOrdersList({ orders }) {
  const navigation = useNavigation();
  const { toggleTabBar } = useTabBarStore();

  const onRepeat = (order) => {
    toggleTabBar(false);
    navigation.navigate(private_name_routes.pedidos.orderDetails, {
      order: order
    })
  }

  return (
    <FlatList
      contentContainerStyle={{
        width: widthPercentageToDP(100),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: heightPercentageToDP(10),
      }}
      horizontal={false}
      scrollEnabled={true}
      data={orders}
      renderItem={({ item, index }) =>
        <AllOrdersItem
          key={index}
          item={item}
          onRepeat={onRepeat}
        />
      }
      ListFooterComponent={
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
            fontFamily='SFPro-Italic'
            textAlign='center'
            fontSize={theme_textStyles.small + .5}
            color={theme_colors.grey}
            style={{
              width: "100%",
            }}
          >
            {
              orders.length > 0
                ? `Estos son todos tus pedidos`
                : `Aquí aparecerán tus pedidos`
            }
          </TextStyled>
        </ViewStyled>
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )
}