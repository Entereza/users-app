import React, { useCallback, useRef } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import AllTransactionsList from '../../../components/WalletComponents/TransactionComponents/ListTransactions/AllTransactionsList';

export default function AllOrdersScreen({ route }) {
    const { allOrders } = route?.params;

    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
        toggleTabBar(true);
    };

    const { toggleTabBar } = useTabBarStore()

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

            <AllTransactionsList
                allOrders={allOrders}
            />
        </ViewStyled>
    )
}