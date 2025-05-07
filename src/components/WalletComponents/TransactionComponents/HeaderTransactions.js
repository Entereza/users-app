import React from 'react'
import SelectTransactionType from './SelectTransactionType';
import ShowAllTransactions from './ShowAllTransactions';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { theme_colors } from '../../../utils/theme/theme_colors';
import TextStyled from '../../../utils/ui/TextStyled';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';

export default function HeaderTransactions({
    allOrders,
}) {
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
            <TextStyled
                fontSize={theme_textStyles.smedium}
                color={theme_colors.black}
                style={{
                    fontFamily: 'SFPro-Bold',
                }}
            >
                Tus pedidos
            </TextStyled>

            {allOrders && allOrders.length > 10 && (
                <ShowAllTransactions
                    allOrders={allOrders}
                />
            )}
        </ViewStyled>
    )
}