import React, { useCallback, useRef, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen';
import SwipeToConfirm from '../../../components/TransferChasbackComponents/PayComponents/SwipeToConfirm';
import OrderCompleted from '../../../components/TransferChasbackComponents/PayComponents/OrderCompleted';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';

export default function OrderConfirmScreen() {
    const navigation = useNavigation();
    const [showCompleted, setShowCompleted] = useState(false);
    const { toggleTabBar } = useTabBarStore();
    const isGoingBack = useRef(false);

    const goBack = () => {
        navigation.goBack();
        toggleTabBar(true);
    };

    const goToOrderScreen = () => {
        navigation.navigate(private_name_routes.empresas.followOrder);
    };

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

    const handleConfirm = () => {
        setShowCompleted(true);
    };

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
            <HeaderDefaultScreen title={"Confirmar Orden"} />

            {showCompleted ? (
                <OrderCompleted 
                    goToOrderScreen={goToOrderScreen}
                    cashbackAmount="8.35"
                />
            ) : (
                <SwipeToConfirm onConfirm={handleConfirm} />
            )}
        </ViewStyled>
    );
} 