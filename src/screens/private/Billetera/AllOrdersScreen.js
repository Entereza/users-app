import React, { useCallback, useRef } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import AllTransactionsList from '../../../components/WalletComponents/TransactionComponents/ListTransactions/AllTransactionsList';
import TransactionsList from '../../../components/WalletComponents/TransactionComponents/ListTransactions/TransactionsList';
import useOrdersStore from '../../../utils/tools/interface/ordersStore';

export default function AllOrdersScreen({ route }) {
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
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();

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

    const goToOrderDetails = (order) => {
        changeColorStatusBar(theme_colors.transparent);
        toggleTabBar(false);
        if (order.order.status && ["created", "accepted", "pickup", "store", "taken", "delivering", "arrived"].includes(order.order.status)) {
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

    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
        toggleTabBar(true);
    };

    const isGoingBack = useRef(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = (e) => {
                if (!isGoingBack.current) {
                    isGoingBack.current = true;
                    e.preventDefault();
                    goBack();
                }
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
            };
        }, [navigation])
    );


    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={100}
            style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <HeaderDefaultScreen title={"Mis transacciones"} />

            <TransactionsList
                setIsRefreshing={setIsRefreshing}
                isRefreshing={isRefreshing}
                onRefresh={handleRefresh}
                orders={orders}
                isLoading={isLoading}
                onOrderPress={goToOrderDetails}
            />
        </ViewStyled>
    )
}