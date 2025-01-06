import React from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled';
import LocationCard from '../../../components/Cards/LocationCard';
import SearchButton from '../../../components/Buttons/SearchButton';
import CategorySection from '../../../components/BusinessComponents/CategoriesComponents/CategorySection';
import PromoSection from '../../../components/BusinessComponents/PromotionComponents/PromoSection';
import BusinessSection from '../../../components/BusinessComponents/BusinessSection';
import useAuthStore from '../../../utils/tools/interface/authStore';
import useAddressStore from '../../../utils/tools/interface/addressStore';
import HeaderProfile from '../../../components/Header/HeaderProfile';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import SearchBar from '../../../components/BusinessComponents/SearchBar';

export default function EmpresasHomeScreen() {
    const navigation = useNavigation();
    const { toggleTabBar } = useTabBarStore();

    const goToProfileScreen = () => {
        toggleTabBar(false)
        navigation.navigate(private_name_routes.profile.profileHome);
    }

    const { user } = useAuthStore();

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderProfile user={user.names.split(' ')[0]} onPress={goToProfileScreen} />

            <LocationCard user={user.names.split(' ')[0]} onPressProfile={null} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <SearchBar nameUser={user.names.split(' ')[0]} onPress={null} />

                <CategorySection />

                <PromoSection />
                
                <BusinessSection />
            </ScrollView>
        </SafeAreaStyled>
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