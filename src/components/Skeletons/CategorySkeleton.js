import React from 'react'
import { Skeleton } from 'moti/skeleton'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { FlatList, View } from 'react-native';

export default function CategorySkeleton() {
    const numberOfSkeletons = 4;

    return (
        <ViewStyled
            width={95}
            backgroundColor={theme_colors.transparent}
            paddingVertical={3}
            style={{
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingLeft: 10,
                }}
                horizontal={true}
                scrollEnabled={true}
                data={Array.from({ length: numberOfSkeletons }, (_, index) => index)}
                ItemSeparatorComponent={() => <ViewStyled backgroundColor={theme_colors.transparent} width={4.5} />}
                renderItem={() =>
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                    >
                        <Skeleton
                            show={true}
                            colorMode="light"
                            backgroundColor={theme_colors.semiTransparent}
                            width={70}
                            height={70}
                        >
                            <ViewStyled
                                marginVertical={1}
                                marginHorizontal={0.5}
                                paddingVertical={1}
                                paddingHorizontal={2}
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    backgroundColor: theme_colors.transparent,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            />
                        </Skeleton>
                        <ViewStyled
                            style={{
                                width: 'auto',
                                height: 'auto',
                                marginTop: 6,
                                backgroundColor: theme_colors.transparent,
                            }}
                        />
                        <Skeleton
                            show={true}
                            colorMode="light"
                            backgroundColor={theme_colors.semiTransparent}
                            radius={5}
                            width={70}
                            height={15}
                        >
                            <ViewStyled
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    backgroundColor: theme_colors.transparent,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                            </ViewStyled>
                        </Skeleton>
                    </ViewStyled>
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}