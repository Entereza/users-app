import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import { Pressable } from 'react-native'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';

export default function TermsConditions() {
    return (
        <ViewStyled
            width={100}
            backgroundColor={theme_colors.transparent}
            paddingVertical={0.5}
            style={{
                position: 'absolute',
                bottom: 0,
                height: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                width={15}
                backgroundColor={theme_colors.lightGrey2}
                style={{
                    height: 1,
                }}
            />
            <ViewStyled
                width={75}
                paddingVertical={0.5}
                backgroundColor={theme_colors.transparent}
                style={{
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Italic'
                    fontSize={theme_textStyles.smaller + .5}
                    color={theme_colors.textGrey}
                    textAlign="center"
                >
                    Al continuar, estás de acuerdo con los
                    <Pressable onPress={() => { }}>
                        <TextStyled
                            fontFamily='SFPro-Italic'
                            color={theme_colors.textGrey}
                            fontSize={theme_textStyles.smaller + .5}
                            textAlign='center'
                            style={{
                                textDecorationLine: 'underline',
                            }}
                        >
                            {`Términos y Condiciones de Entereza`}
                        </TextStyled>
                    </Pressable>
                </TextStyled>
            </ViewStyled>
            <ViewStyled
                width={15}
                backgroundColor={theme_colors.lightGrey2}
                style={{
                    height: 1,
                }}
            />
        </ViewStyled>
    )
}