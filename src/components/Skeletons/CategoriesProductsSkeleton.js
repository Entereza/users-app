import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { FlatList } from 'react-native'
import { Skeleton } from 'moti/skeleton';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function CategoriesProductsSkeleton() {
    const numberOfSkeletons = 5;

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            paddingVertical={1}
            style={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={Array.from({ length: numberOfSkeletons }, (_, index) => index)}
                ItemSeparatorComponent={() =>
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        marginHorizontal={1}
                    />
                }
                renderItem={() => (
                    <Skeleton
                        show={true}
                        colorMode="light"
                        backgroundColor={theme_colors.semiTransparent}
                        width={widthPercentageToDP(30)}
                        height={heightPercentageToDP(4)}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}