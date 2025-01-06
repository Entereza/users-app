import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'

export default function InfoCodeComponent() {
    return (
        <ViewStyled
            backgroundColor={`${theme_colors.backgroundLightGrey}22`}
            width={90}
            paddingHorizontal={4}
            paddingVertical={2}
            borderRadius={3}
            marginTop={1}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TextStyled
                fontFamily='SFPro-Medium'
                textAlign='left'
                fontSize={7.5}
                color={theme_colors.white}
                numberOfLines={2}
                style={{
                    width: "100%",
                    marginBottom: 10
                }}
            >
                {'¿Qué es el '}
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={8.5}
                    color={theme_colors.primary}
                    numberOfLines={2}
                    style={{
                        width: "100%",
                    }}
                >
                    Código de Compra
                </TextStyled>
                ?
            </TextStyled>

            <TextStyled
                fontFamily='SFPro-Regular'
                textAlign='left'
                fontSize={7}
                color={theme_colors.textGrey}
                style={{
                    width: "100%",
                }}
            >
                Es tu código secreto con el cuál podrás realizar pagos utilizando el
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={7}
                    color={theme_colors.white}
                    numberOfLines={2}
                    style={{
                        width: "100%",
                    }}
                >
                    {' Cashback '}
                </TextStyled>
                que tienes en tu cuenta, solo debes dictárselo al cajero de la empresa afiliada para confirmar la transferencia.
            </TextStyled>

            <TextStyled
                fontFamily='SFPro-Bold'
                textAlign='left'
                fontSize={7}
                color={theme_colors.green}
                style={{
                    width: "100%",
                    marginTop: 20
                }}
            >
                • OJO
            </TextStyled>

            <TextStyled
                fontFamily='SFPro-Regular'
                textAlign='left'
                fontSize={5}
                color={theme_colors.textGrey}
                style={{
                    width: "100%",
                    marginTop: 5
                }}
            >
                Solo podrás realizar pagos con los ahorros de tu cuenta si tu saldo es igual o mayor al total de la compra.
            </TextStyled>
        </ViewStyled>
    )
}