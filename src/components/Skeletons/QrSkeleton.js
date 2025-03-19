import { Skeleton } from 'moti/skeleton'
import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'

export default function QrSkeleton() {
    return (
        <ViewStyled
            width={95}
            marginTop={3}
            backgroundColor={theme_colors.transparent}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Skeleton
                show={true}
                colorMode="light"
                backgroundColor={theme_colors.semiTransparent}
                width={'95%'}
                height={'60%'}
            />
        </ViewStyled>
    )
}