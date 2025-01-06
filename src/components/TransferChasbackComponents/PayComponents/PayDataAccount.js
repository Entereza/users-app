import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import PaymentInfo from '../PaymentComponents/PaymentInfo'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function PayDataAccount({ nameUser, numberCard }) {
    return (
        <ViewStyled
            width={95}
            paddingVertical={2}
            paddingHorizontal={4}
            borderRadius={2}
            marginBottom={2}
            backgroundColor={theme_colors.white}
            style={{
                height: 'auto',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                marginBottom={2}
                paddingBottom={1}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderBottomWidth: 1,
                    borderBottomColor: theme_colors.greyLine,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.black}
                    style={{
                        width: "100%",
                    }}
                >
                    {`Datos destino`}
                </TextStyled>
            </ViewStyled>

            <PaymentInfo
                iconName={'account'}
                text={nameUser}
                textColor={theme_colors.grey}
                style={{
                    marginBottom: 10
                }}
            />

            <PaymentInfo
                iconName={'card-account-details'}
                text={numberCard}
                textColor={theme_colors.grey}
            />
        </ViewStyled>
    )
}