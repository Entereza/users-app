import React from 'react'
import { Image } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ImageStyled({
  width = 5,
  height = 5,
  borderRadius,
  source,
  style,
  paddingHorizontal,
  paddingVertical,
  ...rest
}) {
  return (
    <Image
      source={source}
      style={[
        width && { width: wp(width) },
        height && { height: hp(height) },
        paddingHorizontal && { paddingHorizontal: wp(paddingHorizontal) },
        paddingVertical && { paddingVertical: hp(paddingVertical) },
        borderRadius && { borderRadius: hp(borderRadius) },
        style && style,
      ]}
      {
      ...rest
      }
    />
  )
}