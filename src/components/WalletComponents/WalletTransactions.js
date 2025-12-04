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
import { sendHeatmapEvent } from '../../utils/analytics';

export default function WalletTransactions({ onTransactionPress }) {
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
            } else {
                setOrders([]);
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

    const goToOrderDetails = (order, event) => {
        // Registrar evento de heatmap si existe onTransactionPress y event
        if (event?.nativeEvent && onTransactionPress) {
            onTransactionPress(order.order.id, event);
        }
        
        // console.log('goToOrderDetails', order.order.products);
        changeColorStatusBar(theme_colors.transparent);
        toggleTabBar(false);
        const activeStates = ["created", "accepted", "pickup", "store", "taken", "picked", "delivering", "arrived"];
        if (order.order.status && activeStates.includes(order.order.status)) {
            navigation.navigate(private_name_routes.pedidos.pedidosStack, {
                screen: private_name_routes.pedidos.orderTracking,
                params: { orderId: order.order.id }
            });
        } else {
            navigation.navigate(private_name_routes.pedidos.pedidosStack, {
                screen: private_name_routes.pedidos.orderDetails,
                params: { order }
            });
        }
    };

    const handleOrderPress = (order, event) => {
        goToOrderDetails(order, event);
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
                onOrderPress={handleOrderPress}
            />
        </>
    )
}