import React from 'react'
import ImageStyled from '../../../utils/ui/ImageStyled'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'

export default function PromoItem({ item, onPress }) {
    return (
        <ViewStyled
            width={85}
            height={20}
            marginRight={2}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ImageStyled
                    borderRadius={2.5}
                    source={item.image}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'stretch',
                    }}
                />
            </ViewStyled>
        </ViewStyled>
    )
}