import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import ImageStyled from '../../../utils/ui/ImageStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'

export default function AuthComponent() {
    return (
        <ViewStyled
            width={100}
            height={40}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                width={100}
                height={16}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageStyled
                    source={require('../../../../assets/icons/IconColorsEntereza.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </ViewStyled>

            <TextStyled
                textAlign='center'
                fontSize={4.5}
                color={theme_colors.black}
                style={{
                    marginTop: 10,
                    width: "100%",
                }}
            >
                {'¡Bienvenido a '}
                <TextStyled
                    fontFamily='SFPro-SemiBold'
                    textAlign='center'
                    fontSize={7}
                    color={theme_colors.primary}
                    style={{
                        width: "100%",
                    }}
                >
                    {'Entereza'}
                </TextStyled>
                {'!'}
            </TextStyled>
        </ViewStyled>

    )
}