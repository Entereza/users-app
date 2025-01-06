import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import PayDataAccount from './PayDataAccount'
import PayTransferAmmount from './PayTransferAmmount'

export default function PayQrData() {
    const nameUser = 'Adrián Torrico Ortega'
    const numberCard = '927439'

    return (
        <ViewStyled
            width={100}
            paddingTop={4}
            backgroundColor={theme_colors.transparent}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <PayDataAccount nameUser={nameUser} numberCard={numberCard} />

            <PayTransferAmmount />
        </ViewStyled>
    )
}