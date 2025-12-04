import React, { useState, useEffect } from 'react'
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
import useAddressStore from '../../../utils/tools/interface/addressStore';
import PermissionNotActive from '../../../components/BusinessComponents/PermissionNotActive';
import { sendHeatmapEvent } from '../../../utils/analytics';

export default function EmpresasHomeScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, changeNameStackBack, changeNameRouteBack } = useTabBarStore();
    const { isDepartmentEnabled, isCountryEnabled, isSearchingLocation, hasLocationPermissions } = useLocationStore();
    const { selectedAddress } = useAddressStore();
    const {
        setOrders,
        setTotalPages,
        setCurrentPage
    } = useOrdersStore();

    const [refreshing, setRefreshing] = useState(false);

    const goToProfileScreen = (event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @EmpresasHomeScreen.js ',
                elementType: 'button',
                elementId: 'btn-perfil-usuario',
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }

        toggleTabBar(false)
        changeNameStackBack(private_name_routes.empresas.empresasStack)
        changeNameRouteBack(private_name_routes.empresas.empresasHome)
        navigation.navigate(private_name_routes.profile.profileStack, { screen: private_name_routes.pedidos.pedidosHome });
    }

    const { user } = useAuthStore();

    const checkAddressSelection = () => {
        console.log('checkAddressSelection working: ', selectedAddress)
        if (!selectedAddress?.nameAddress && !isSearchingLocation) {
            toggleTabBar(false)
            navigation.navigate(private_name_routes.empresas.addressScreen);
        } else {
            toggleTabBar(true)
        }
    };

    useEffect(() => {
        if (isCountryEnabled && isDepartmentEnabled && hasLocationPermissions) {
            checkAddressSelection();
        }
    }, [isCountryEnabled, isDepartmentEnabled, hasLocationPermissions]);

    useFocusEffect(
        React.useCallback(() => {
            const timer = setTimeout(() => {
                if (isCountryEnabled && isDepartmentEnabled && hasLocationPermissions) {
                    checkAddressSelection();
                }
            }, 200);

            return () => clearTimeout(timer);
        }, [selectedAddress, isSearchingLocation, isCountryEnabled, isDepartmentEnabled, hasLocationPermissions])
    );

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

    const goToSearchScreen = (event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @EmpresasHomeScreen.js ',
                elementType: 'searchbar',
                elementId: 'search-empresas',
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }

        toggleTabBar(false)
        navigation.navigate(private_name_routes.empresas.searchScreen)
    }

    const handleCategoryPress = (categoryId, event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @EmpresasHomeScreen.js ',
                elementType: 'category',
                elementId: `category-${categoryId}`,
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationYF
            });
        }
    }

    const handlePromoPress = (promoId, event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @EmpresasHomeScreen.js ',
                elementType: 'banner',
                elementId: `promo-${promoId}`,
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }
    }

    const handleBusinessPress = (businessId, event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @EmpresasHomeScreen.js ',
                elementType: 'business-card',
                elementId: `business-${businessId}`,
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }
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
        hasLocationPermissions
            ? isCountryEnabled
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
                                <SearchBar nameUser={user.names.split(' ')[0]} onPress={goToSearchScreen} />

                                <CategorySection
                                    refreshing={refreshing}
                                    onCategoryPress={handleCategoryPress}
                                />

                                <PromoSection
                                    refreshing={refreshing}
                                    onPromoPress={handlePromoPress}
                                />

                                <BusinessSection
                                    refreshing={refreshing}
                                    onBusinessPress={handleBusinessPress}
                                />
                            </ScrollView>
                        </SafeAreaStyled>
                    </>
                    : <DepartmentNotActive />
                : <CountryNotActive />
            : <PermissionNotActive />

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