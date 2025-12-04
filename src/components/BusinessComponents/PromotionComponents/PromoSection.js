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
import { toastService } from '../../../utils/tools/interface/toastService'

export default function PromoSection({ refreshing, onPromoPress }) {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const { getActiveOrder } = useOrdersStore();
    const activeOrders = getActiveOrder();
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

    const handleOrderPress = (order, event) => {
        console.log('handleOrderPress:', order);
        if (order.order.status && ["created", "accepted", "pickup", "store", "picked", "taken", "delivering", "arrived"].includes(order.order.status)) {
            changeColorStatusBar(theme_colors.transparent);
            toggleTabBar(false);
            navigation.navigate(private_name_routes.pedidos.pedidosStack, {
                screen: private_name_routes.pedidos.orderTracking,
                params: { orderId: order.order.id, isFromBusiness: true }
            });
        } else {
            toastService.showInfoToast("El pedido ya fue entregado.");
        }
    };

    const handlePromoPress = (item, event) => {
        if (onPromoPress && event) {
            onPromoPress(item.id, event);
        }
    };

    if (activeOrders && activeOrders.length > 0) {
        return (
            <ViewStyled
                backgroundColor={theme_colors.transparent}
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
                        paddingVertical: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    ItemSeparatorComponent={() => <ViewStyled backgroundColor={theme_colors.transparent} width={2} />}
                    horizontal={true}
                    scrollEnabled={true}
                    data={activeOrders}
                    renderItem={({ item }) =>
                        <ActiveOrderBanner
                            order={item}
                            onPress={(event) => handleOrderPress(item, event)}
                        />
                    }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
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
                        onPress={(event) => handlePromoPress(item, event)}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}