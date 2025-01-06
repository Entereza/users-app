import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import SelectAmmountItem from './SelectAmmountItem'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function SelectAmmountTransfer({ cashbackUser, ammountTransfer, onPress, handleClose }) {
    const buttons = [1, 10, 100];

    return (
        <>
            <ViewStyled
                width={90}
                height={8}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {
                    (ammountTransfer <= 0)
                        ? buttons.map((number) => (
                            <SelectAmmountItem
                                key={number}
                                onPress={onPress}
                                value={number}
                                disabled={number > cashbackUser}
                            />
                        ))
                        : <ButtonWithIcon
                            withIcon={false}
                            onPress={handleClose}
                            borderWidth={1}
                            borderColor={theme_colors.white}
                            backgroundColor={theme_colors.primary}
                            colorText={theme_colors.white}
                            borderRadius={1.5}
                            fontSize={theme_textStyles.medium}
                            fontFamily={'SFPro-Bold'}
                            textButton={'Agregar monto'}
                            height={6}
                            style={{
                                width: '100%',
                            }}
                        />
                }
            </ViewStyled>
        </>
    )
}