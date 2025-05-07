import React, { useEffect, useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import PayDataAccount from './PayDataAccount'
import PayTransferAmmount from './PayTransferAmmount'
import SwipeToTransfer from './SwipeToTransfer'
import useTransferAmountStore from '../../../utils/tools/interface/transferAmountStore'

export default function PayQrData({ qrData, onAmountValid }) {
    // console.log(qrData)
    if (!qrData) return null;

    const { qr, client } = qrData;

    const [amount, setAmount] = useState(qr.amount || "");

    const handleAmountChange = (value) => {
        setAmount(value);
        const isValid = value > 0 && /^\d+(\.\d{0,2})?$/.test(value.toString());
        onAmountValid?.(isValid, { amount: value, qrData });
    };

    return (
        <ViewStyled
            width={100}
            paddingTop={2}
            backgroundColor={theme_colors.transparent}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <PayDataAccount
                expirationDate={qr.expirationDate}
                singleUse={qr.singleUse}
                client={client}
            />

            <PayTransferAmmount
                initialAmount={amount}
                isEditable={qr.amount === 0}
                onAmountChange={handleAmountChange}
            />
        </ViewStyled>
    )
}