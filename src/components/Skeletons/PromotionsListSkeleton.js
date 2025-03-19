import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { Skeleton } from 'moti/skeleton'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { FlatList } from 'react-native'

export default function PromotionsListSkeleton() {
    const numberOfSkeletons = 5;

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={{
                width: '100%',
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
                    width={widthPercentageToDP(45)}
                    height={heightPercentageToDP(4)}
                />
            </ViewStyled>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                marginBottom={1}
            />

            <FlatList
                contentContainerStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                ItemSeparatorComponent={() =>
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        marginHorizontal={2}
                    />
                }
                data={Array.from({ length: numberOfSkeletons }, (_, index) => index)}
                renderItem={() =>
                    <Skeleton
                        show={true}
                        colorMode="light"
                        backgroundColor={theme_colors.semiTransparent}
                        width={widthPercentageToDP(90)}
                        height={heightPercentageToDP(14)}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}