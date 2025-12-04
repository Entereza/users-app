import React from 'react'
import InfoRechargeMoney from './InfoRechargeMoney'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import AmmountRecharge from './AmmountRecharge'
import { theme_colors } from '../../utils/theme/theme_colors'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function SelectAmountRecharge({
    ammountSelected,
    setAmmountSelected,
    onPress
}) {
    return (
        <>
            <InfoRechargeMoney />

            <AmmountRecharge
                ammountSelected={ammountSelected}
                setAmmountSelected={setAmmountSelected}
            />

            <ButtonWithIcon
                withIcon={false}

                onPress={onPress}
                borderWidth={0}
                disabled={!ammountSelected}
                backgroundColor={ammountSelected ? theme_colors.primary : theme_colors.lightGrey}
                colorText={theme_colors.white}
                borderRadius={1.5}
                fontSize={theme_textStyles.medium}
                height={6}
                fontFamily={'SFPro-SemiBold'}
                textButton={'Generar QR'}
                style={{
                    width: '95%',
                    marginTop: 'auto',
                    marginBottom: 15
                }}
            />
        </>
    )
}