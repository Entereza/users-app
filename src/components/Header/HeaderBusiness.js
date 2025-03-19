import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { TouchableOpacity } from 'react-native'
import ImageStyled from '../../utils/ui/ImageStyled'
import LocationCard from '../Cards/LocationCard'

export default function HeaderBusiness({ imageUri, onPress }) {
  return (
    <ViewStyled
      width={90}
      marginTop={0.5}
      backgroundColor={theme_colors.transparent}
      style={{
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <LocationCard />

      <ViewStyled
        backgroundColor={theme_colors.transparent}
        style={{
          width: 'auto',
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignSelf: 'center',
            backgroundColor: theme_colors.transparent
          }}
        >
          <ImageStyled
            width={100}
            height={100}
            borderRadius={'50%'}
            source={imageUri ? { uri: imageUri } : require('../../../assets/images/DefaultProfileUser.png')}
            style={{
              maxHeight: 42,
              maxWidth: 42,
              borderWidth: 0.1,
              borderColor: theme_colors.greyLine
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </ViewStyled>
    </ViewStyled>
  )
}