import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import HeaderTransactions from './TransactionComponents/HeaderTransactions'
import TransactionsList from './TransactionComponents/ListTransactions/TransactionsList'
import useOrdersStore from '../../utils/tools/interface/ordersStore'
import { ordersService } from '../../services/api/orders/ordersService'
import useAuthStore from '../../utils/tools/interface/authStore'
import useTabBarStore from '../../utils/tools/interface/tabBarStore'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { private_name_routes } from '../../utils/route/private_name_routes';

export default function WalletTransactions() {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();
    const {
        orders,
        isLoading,
        setOrders,
        setIsLoading,
        setError,
        setTotalPages,
        setCurrentPage
    } = useOrdersStore();

    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            const response = await ordersService.getClientOrders(user.id);

            console.log('getClientOrders: ', response)

            if (response?.orders) {
                setOrders(response.orders);
                // Since pagination data is not in the new structure, we'll reset these
                setTotalPages(1);
                setCurrentPage(0);
            }
        } catch (error) {
            console.error('Error refreshing orders:', error);
            setError(error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const goToOrderDetails = (order) => {
        changeColorStatusBar(theme_colors.transparent);
        toggleTabBar(false);
        if (order.status && ["created", "accepted", "pickup", "store", "taken", "delivering", "arrived"].includes(order.status)) {
            navigation.navigate(private_name_routes.pedidos.pedidosStack, {
                screen: private_name_routes.pedidos.orderTracking,
                params: { order }
            });
        } else {
            navigation.navigate(private_name_routes.pedidos.pedidosStack, {
                screen: private_name_routes.pedidos.orderDetails,
                params: { order }
            });
        }
    };

    return (
        <>
            <HeaderTransactions
                allOrders={orders}
            />

            <TransactionsList
                setIsRefreshing={setIsRefreshing}
                isRefreshing={isRefreshing}
                onRefresh={handleRefresh}
                orders={orders}
                isLoading={isLoading}
                onOrderPress={goToOrderDetails}
            />
        </>
    )
}