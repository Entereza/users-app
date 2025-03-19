import React, { useState } from 'react'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled';
import LocationCard from '../../../components/Cards/LocationCard';
import CategorySection from '../../../components/BusinessComponents/CategoriesComponents/CategorySection';
import PromoSection from '../../../components/BusinessComponents/PromotionComponents/PromoSection';
import BusinessSection from '../../../components/BusinessComponents/BusinessSection';
import useAuthStore from '../../../utils/tools/interface/authStore';
import HeaderProfile from '../../../components/Header/HeaderProfile';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import SearchBar from '../../../components/BusinessComponents/SearchBar';
import HeaderBusiness from '../../../components/Header/HeaderBusiness';
import useLocationStore from '../../../utils/tools/interface/locationStore';
import CountryNotActive from '../../../components/BusinessComponents/CountryNotActive';
import DepartmentNotActive from '../../../components/BusinessComponents/DepartmentNotActive';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import PromoSkeleton from '../../../components/Skeletons/PromoSkeleton';
import BusinessSkeleton from '../../../components/Skeletons/BusinessSkeleton';
import { ordersService } from '../../../services/api/orders/ordersService';
import useOrdersStore from '../../../utils/tools/interface/ordersStore';

export default function EmpresasHomeScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, changeNameStackBack, changeNameRouteBack } = useTabBarStore();
    const { isDepartmentEnabled, isCountryEnabled, isSearchingLocation } = useLocationStore();
    const {
        setOrders,
        setIsLoading,
        setError,
        setTotalPages,
        setCurrentPage
    } = useOrdersStore();

    const [refreshing, setRefreshing] = useState(false);

    const goToProfileScreen = () => {
        toggleTabBar(false)
        changeNameStackBack(private_name_routes.empresas.empresasStack)
        changeNameRouteBack(private_name_routes.empresas.empresasHome)
        navigation.navigate(private_name_routes.profile.profileStack, { screen: private_name_routes.pedidos.pedidosHome });
    }

    const { user } = useAuthStore();

    const onRefresh = async () => {
        setRefreshing(true);
        const response = await ordersService.getClientOrders(user.id);
        if (!response?.orders || response.orders.length === 0) {
            console.log('No hay pedidos')
        } else {
            setOrders(response.orders);
            setTotalPages(1);
            setCurrentPage(0);
        }
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    if (isSearchingLocation) {
        return (
            <SafeAreaStyled
                backgroundColor={theme_colors.white}
                styleArea={styles.safeArea}
                styleView={styles.startView}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <CategorySkeleton showSkeleton={true} />

                    <PromoSkeleton />

                    <BusinessSkeleton />
                </ScrollView>
            </SafeAreaStyled>
        )
    }

    return (
        isCountryEnabled
            ? isDepartmentEnabled
                ? <>
                    <SafeAreaStyled
                        backgroundColor={theme_colors.white}
                        styleArea={styles.safeArea}
                        styleView={styles.startView}
                    >
                        <HeaderBusiness imageUri={user?.image} onPress={goToProfileScreen} />

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <SearchBar nameUser={user.names.split(' ')[0]} onPress={null} />

                            <CategorySection refreshing={refreshing} />

                            <PromoSection refreshing={refreshing} />

                            <BusinessSection refreshing={refreshing} />
                        </ScrollView>
                    </SafeAreaStyled>
                </>
                : <DepartmentNotActive />
            : <CountryNotActive />
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.transparent,
        flex: 1,
    },
    startView: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollContent: {
        width: '100%',
        alignItems: 'center'
    }
});