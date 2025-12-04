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
            style={{
                width: 'auto',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
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