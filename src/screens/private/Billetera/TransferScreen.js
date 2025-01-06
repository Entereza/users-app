import { View, Text } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled';
import ViewStyled from '../../../utils/ui/ViewStyled';
import SelectionOption from '../../../components/TransferChasbackComponents/SelectionOption';
import PaymentContent from '../../../components/TransferChasbackComponents/PaymentComponents/PaymentContent';
import PayContent from '../../../components/TransferChasbackComponents/PayComponents/PayContent';
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen';
import useTransferAmountStore from '../../../utils/tools/interface/transferAmountStore';
import SwipeToConfirm from '../../../components/TransferChasbackComponents/PayComponents/SwipeToConfirm';

export default function TransferScreen() {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
        toggleTabBar(true);
    };

    const { toggleTabBar } = useTabBarStore()
    const { showTabSlider, toggleTabSlider } = useTransferAmountStore()

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

    const [paymentOption, setPaymentOption] = React.useState(true)

    const handlePress = () => {
        setPaymentOption(!paymentOption)
        if (paymentOption) {
            toggleTabSlider(false)
        }
    }

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
            <HeaderDefaultScreen title={"Transferir Cashback"} />

            <SelectionOption nameOption1={"Cobro"} nameOption2={"Pago"} optionSelected={paymentOption} onPress={handlePress} />

            {
                paymentOption
                    ? <PaymentContent />
                    : <PayContent />
            }

            {
                (!paymentOption && showTabSlider) &&
                <SwipeToConfirm />
            }
        </ViewStyled>
    )
}