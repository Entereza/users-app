import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { Skeleton } from 'moti/skeleton';
import { FlatList } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function PromoSkeleton() {
    const numberOfSkeletons = 3;

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
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                horizontal={true}
                scrollEnabled={true}
                ItemSeparatorComponent={() => <ViewStyled backgroundColor={theme_colors.transparent} width={2} />}
                data={Array.from({ length: numberOfSkeletons }, (_, index) => index)}
                renderItem={() =>
                    <Skeleton
                        show={true}
                        colorMode="light"
                        backgroundColor={theme_colors.semiTransparent}
                        radius={heightPercentageToDP(2.5)}
                        width={widthPercentageToDP(85)}
                        height={heightPercentageToDP(20)}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}