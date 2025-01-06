import React from 'react'
import { View } from 'react-native'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { theme_colors } from '../theme/theme_colors';

export default function ViewStyled({
    children,
    width,
    height,
    backgroundColor=theme_colors.primary,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginHorizontal,
    paddingHorizontal,
    marginVertical,
    paddingVertical,
    borderRadius,
    marginHorizontalAuto,
    marginVerticalAuto,
    paddingHorizontalAuto,
    paddingVerticalAuto,
    marginTopAuto,
    marginBottomAuto,
    marginLeftAuto,
    marginRightAuto,
    paddingTopAuto,
    paddingBottomAuto,
    paddingLeftAuto,
    paddingRightAuto,
    style,
    ...rest
}) {
  return (
    <View
        style={[
            width && {width: wp(width)},
            height && {height: hp(height)},
            backgroundColor && {backgroundColor: backgroundColor},
            marginTop && {marginTop: hp(marginTop)},
            marginBottom && {marginBottom: hp(marginBottom)},
            marginLeft && {marginLeft: wp(marginLeft)},
            marginRight && {marginRight: wp(marginRight)},
            paddingTop && {paddingTop: hp(paddingTop)},
            paddingBottom && {paddingBottom: hp(paddingBottom)},
            paddingLeft && {paddingLeft: wp(paddingLeft)},
            paddingRight && {paddingRight: wp(paddingRight)},
            marginHorizontal && {marginHorizontal: wp(marginHorizontal)},
            paddingHorizontal && {paddingHorizontal: wp(paddingHorizontal)},
            marginVertical && {marginVertical: hp(marginVertical)},
            paddingVertical && {paddingVertical: hp(paddingVertical)},
            borderRadius && {borderRadius: hp(borderRadius)},
            marginBottomAuto && {marginBottom: 'auto'},
            marginTopAuto && {marginTop: 'auto'},
            marginLeftAuto && {marginLeft: 'auto'},
            marginRightAuto && {marginRight: 'auto'},
            paddingBottomAuto && {paddingBottom: 'auto'},
            paddingTopAuto && {paddingTop: 'auto'},
            paddingLeftAuto && {paddingLeft: 'auto'},
            paddingRightAuto && {paddingRight: 'auto'},
            marginHorizontalAuto && {marginHorizontal: 'auto'},
            paddingHorizontalAuto && {paddingHorizontal: 'auto'},
            marginVerticalAuto && {marginVertical: 'auto'},
            paddingVerticalAuto && {paddingVertical: 'auto'},
            style && style,
        ]}
        {
            ...rest
        }
    >
        {
            children
        }
    </View>
  )
}
