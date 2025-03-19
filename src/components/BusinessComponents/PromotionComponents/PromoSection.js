import React, { useEffect, useState } from 'react'
import PromoItem from './PromoItem'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { FlatList } from 'react-native'
import PromoSkeleton from '../../Skeletons/PromoSkeleton'
import useOrdersStore from '../../../utils/tools/interface/ordersStore'
import ActiveOrderBanner from './ActiveOrderBanner'
import { useNavigation } from '@react-navigation/native'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import { private_name_routes } from '../../../utils/route/private_name_routes'

export default function PromoSection({ refreshing }) {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const { getActiveOrder } = useOrdersStore();
    const activeOrder = getActiveOrder();
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();

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

    useEffect(() => {
        if (refreshing) {
            setIsLoading(true);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [refreshing]);

    if (isLoading) {
        return <PromoSkeleton />
    }

    const handleOrderPress = (order) => {
        changeColorStatusBar(theme_colors.transparent);
        toggleTabBar(false);
        if (order.status && ["created", "accepted", "pickup", "store", "taken", "delivering", "arrived"].includes(order.status)) {
            navigation.navigate(private_name_routes.pedidos.pedidosStack, {
                screen: private_name_routes.pedidos.orderTracking,
                params: { order }
            });
        }
    };

    if (activeOrder) {
        return (
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                width={100}
                style={{
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActiveOrderBanner
                    order={activeOrder}
                    onPress={() => handleOrderPress(activeOrder)}
                />
            </ViewStyled>
        );
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
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={promos}
                renderItem={({ item }) =>
                    <PromoItem
                        item={item}
                        onPress={null}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}