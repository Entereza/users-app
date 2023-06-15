// REACT 
import React from 'react'

// CUSTOM 
import ViewStyled from '../components/ui/ViewStyled'
import WalletSales from '../components/wallet/WalletSales';
import { theme } from '../utils/theme'
import WalletSavingButton from '../components/wallet/WalletSavingButton';
import WalletHowSale from '../components/wallet/WalletHowSale';
import WalletCard from '../components/wallet/WalletCard';

import { useDispatch } from 'react-redux';
import { __authGetInfo } from '../redux/actions/authActions';
import { ScrollView, RefreshControl } from 'react-native';

export default function WalletScreen() {
    const dispatch = useDispatch()

    const [refreshing, setRefreshing] = React.useState(true);

    const handleOnRefresh = () => {
        setTimeout(() => { setRefreshing(false) }, 900)
    }

    const onRefresh = () => {
        setRefreshing(true)
        console.log('Reloading Page Wallet Screen.js')
        dispatch(__authGetInfo())
        setTimeout(() => { setRefreshing(false) }, 900);
    }

    return (
        <>
            <ScrollView
                scrollEnabled={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: theme.background,
                }}
                showsVerticalScrollIndicator={false}
                scrollToOverflowEnabled={false}
            >
                <ScrollView
                    scrollEnabled={true}
                    contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: theme.transparent,
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollToOverflowEnabled={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <WalletCard reload={refreshing} />
                    <ViewStyled
                        width={100}
                        height={12}
                        marginVertical={2}
                        marginLeftAuto
                        marginRightAuto
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        backgroundColor={theme.transparent}
                    >
                        <WalletHowSale />
                        <WalletSavingButton />
                    </ViewStyled>
                </ScrollView>
                <WalletSales reload={refreshing} handleRefresh={handleOnRefresh} />
            </ScrollView>
        </>
    )
}