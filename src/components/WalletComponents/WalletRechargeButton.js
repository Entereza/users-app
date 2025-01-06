import React from 'react'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import { theme_colors } from '../../utils/theme/theme_colors'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function WalletRechargeButton({ onPress }) {
    return (
        <ButtonWithIcon
            onPress={onPress}
            borderWidth={0}
            borderRadius={1.6}
            marginRightIcon={5}
            EntypoIcon
            iconName='wallet'
            backgroundColor={theme_colors.black}
            colorText={theme_colors.white}
            fontSize={theme_textStyles.smedium}
            sizeIcon={theme_textStyles.medium}
            height={6}
            fontFamily={'SFPro-Bold'}
            textButton={'Recargar dinero'}
            style={{
                width: '95%',
            }}
        />
    )
}