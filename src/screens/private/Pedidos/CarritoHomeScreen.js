import React, { useState } from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { View } from 'react-native';
import NotasComponent from '../../../components/Cart/NotasComponent';
import TotalBarAlternative from '../../../components/Cart/TotalBarAlternative';
import DeliverySelection from '../../../components/Cart/DeliverySelection';
import BranchSelection from '../../../components/Cart/BranchSelection';
import TimeSelection from '../../../components/Cart/TimeSelection';
import SelectionOption from '../../../components/TransferChasbackComponents/SelectionOption';
import useCartStore from '../../../utils/tools/interface/cartStore';
import CartProductsList from '../../../components/CartComponents/CartProductsList';
import { useRoute } from '@react-navigation/native';

export default function CarritoHomeScreen() {
    const [isSelected, setIsSelected] = useState(true);
    const { cart, tripPrice } = useCartStore();
    const { branchId } = useRoute().params || {};
    const handlePress = () => {
        setIsSelected(!isSelected);
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <SelectionOption
                nameOption1={"Delivery"}
                // nameOption2={"Recoger"}
                optionSelected={isSelected}
                onPress={handlePress}
            />

            {isSelected ? (
                <DeliverySelection cost={tripPrice} time={"30 - 40"} />
            ) : (
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 10,
                        marginTop: 5
                    }}
                >
                    <TimeSelection />
                    <BranchSelection />
                </View>
            )}

            <ViewStyled
                width={'100%'}
                height={0.2}
                backgroundColor={theme_colors.requiredGrey}
                style={{
                    marginBottom: 10
                }}
            />

            <CartProductsList products={cart} />

            <NotasComponent isSelected={isSelected} />

            <TotalBarAlternative
                quantity={totalItems.toString()}
                total={totalPrice.toString()}
                title={"Ir a pagar"}
                branchId={branchId}
            />
        </ViewStyled>
    );
};