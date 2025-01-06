import React from 'react'
import SelectTransactionType from './SelectTransactionType';
import ShowAllTransactions from './ShowAllTransactions';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { theme_colors } from '../../../utils/theme/theme_colors';

export default function HeaderTransactions({
    showOrdersRestaurant,
    setShowOrdersRestaurant,
    allOrders,
}) {
    const handlePress = () => {
        setShowOrdersRestaurant(!showOrdersRestaurant);
    }

    return (
        <ViewStyled
            width={95}
            marginTop={1.5}
            backgroundColor={theme_colors.transparent}
            style={{
                height: 'auto',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '40%',
                    height: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <SelectTransactionType
                    onPress={handlePress}
                    type={'Pedidos'}
                    isSelected={!showOrdersRestaurant}
                />

                <SelectTransactionType
                    onPress={handlePress}
                    type={'En el local'}
                    isSelected={showOrdersRestaurant}
                />
            </ViewStyled>

            <ShowAllTransactions
                allOrders={allOrders}
            />
        </ViewStyled>
    )
}