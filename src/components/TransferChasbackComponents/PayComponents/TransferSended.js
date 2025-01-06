import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { ActivityIndicator } from 'react-native'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function TransferSended() {
    return (
        <ViewStyled
            width={100}
            height={20}
            backgroundColor={theme_colors.transparent}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: 1
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                marginBottom={1}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    height: 'auto',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='center'
                    fontSize={theme_textStyles.large}
                    color={theme_colors.white}
                    style={{
                        width: "100%",
                    }}
                >
                    {'Enviando\nTransferencia...'}
                </TextStyled>
            </ViewStyled>

            <ActivityIndicator
                size={'large'}
                color={theme_colors.white}
            />
        </ViewStyled>
    )
}