import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { Skeleton } from 'moti/skeleton'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { FlatList } from 'react-native'

export default function BusinessSkeleton() {
  const numberOfSkeletons = 3;

  return (
    <ViewStyled
      width={100}
      backgroundColor={theme_colors.transparent}
      marginTop={1}
      paddingVertical={1}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Skeleton
        show={true}
        width={widthPercentageToDP(90)}
        height={heightPercentageToDP(4)}
        colorMode='light'
        backgroundColor={theme_colors.semiTransparent}
      />

      <ViewStyled
        backgroundColor={theme_colors.transparent}
        marginBottom={2}
      />

      <FlatList
        data={Array.from({ length: numberOfSkeletons }, (_, index) => index)}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 5,
          paddingTop: 2,
          paddingBottom: heightPercentageToDP(10),
        }}
        ItemSeparatorComponent={() =>
          <ViewStyled
            backgroundColor={theme_colors.transparent}
            marginBottom={1}
            paddingVertical={1}
          />
        }
        renderItem={() =>
          <Skeleton
            show={true}
            width={widthPercentageToDP(90)}
            height={heightPercentageToDP(28)}
            colorMode='light'
            backgroundColor={theme_colors.semiTransparent}
          />
        }
        horizontal={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </ViewStyled>
  )
}