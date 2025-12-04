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
import useAuthStore from '../../../utils/tools/interface/authStore';
import { sendHeatmapEvent } from '../../../utils/analytics';

export default function HomeScreen() {
    const { user } = useAuthStore();
    const navigation = useNavigation();
    const { toggleTabBar, changeNameStackBack, changeNameRouteBack } = useTabBarStore()

    const goToRechargeMoneyScreen = (event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @HomeScreen.js ',
                elementType: 'button',
                elementId: 'btn-recargar-dinero',
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }
        
        toggleTabBar(false)
        navigation.navigate(private_name_routes.billetera.recargarScreen, {
            recarga: ''
        });
    }

    const goToProfileScreen = (event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @HomeScreen.js ',
                elementType: 'button',
                elementId: 'btn-perfil-usuario',
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }
        
        changeNameStackBack(private_name_routes.billetera.billeteraStack)
        changeNameRouteBack(private_name_routes.billetera.billeteraHome)
        toggleTabBar(false)
        navigation.navigate(private_name_routes.profile.profileStack, { screen: private_name_routes.pedidos.pedidosHome });
    }

    const handleWalletCardPress = (event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @HomeScreen.js ',
                elementType: 'card',
                elementId: 'card-billetera',
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }
    }

    const handleTransactionPress = (transactionId, event) => {
        if (event?.nativeEvent) {
            sendHeatmapEvent({
                userId: user.id,
                screen: ' @HomeScreen.js ',
                elementType: 'list-item',
                elementId: `transaction-${transactionId}`,
                x: event.nativeEvent.locationX,
                y: event.nativeEvent.locationY
            });
        }
    }

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderProfile
                user={user}
                onPress={goToProfileScreen}
            />

            <WalletCard 
                onPress={handleWalletCardPress}
            />

            <WalletRechargeButton
                onPress={goToRechargeMoneyScreen}
            />

            <WalletTransactions 
                onTransactionPress={handleTransactionPress}
            />
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