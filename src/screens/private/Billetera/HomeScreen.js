import React from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import HeaderProfile from '../../../components/Header/HeaderProfile';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled';
import WalletCard from '../../../components/WalletComponents/WalletCard';
import WalletRechargeButton from '../../../components/WalletComponents/WalletRechargeButton';
import WalletTransactions from '../../../components/WalletComponents/WalletTransactions';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';

export default function HomeScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, changeNameRouteBack } = useTabBarStore()

    const goToRechargeMoneyScreen = () => {
        toggleTabBar(false)
        navigation.navigate(private_name_routes.billetera.recargarScreen, {
            recarga: ''
        });
    }

    const goToProfileScreen = () => {
        changeNameRouteBack(private_name_routes.billetera.billeteraHome)
        toggleTabBar(false)
        navigation.navigate(private_name_routes.billetera.profileScreen);
    }

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderProfile
                user={"Anelisse"}
                onPress={goToProfileScreen}
            />

            <WalletCard />

            <WalletRechargeButton
                onPress={goToRechargeMoneyScreen}
            />

            <WalletTransactions />
        </SafeAreaStyled>
    );
};

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
});