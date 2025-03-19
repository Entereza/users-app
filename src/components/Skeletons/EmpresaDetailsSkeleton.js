import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { Skeleton } from 'moti/skeleton'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import CategoriesProductsSkeleton from './CategoriesProductsSkeleton'
import PromotionsListSkeleton from './PromotionsListSkeleton'
import ProductsListSkeleton from './ProductsListSkeleton'

export default function EmpresaDetailsSkeleton() {


    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            paddingTop={3}
            style={{
                width: 'auto',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                width={90}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <Skeleton
                    show={true}
                    colorMode="light"
                    backgroundColor={theme_colors.semiTransparent}
                    width={widthPercentageToDP(60)}
                    height={heightPercentageToDP(4)}
                />
            </ViewStyled>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                marginVertical={1}
            />


            <Skeleton
                show={true}
                colorMode="light"
                backgroundColor={theme_colors.semiTransparent}
                width={widthPercentageToDP(90)}
                height={heightPercentageToDP(6)}
            />

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                marginVertical={1}
            />

            <CategoriesProductsSkeleton />

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                marginVertical={1}
            />

            <PromotionsListSkeleton />

            <ProductsListSkeleton />
        </ViewStyled>
    )
}