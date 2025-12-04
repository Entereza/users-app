import React from 'react'
import { Pressable } from 'react-native'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import { FontAwesome } from '@expo/vector-icons'
import ImageStyled from '../../utils/ui/ImageStyled'
import { LinearGradient } from 'expo-linear-gradient'
import IndicatorItem from './IndicatorItem'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function BusinessItem({ item, onPress }) {
  const price = item?.branch?.tripPrice || 0;


  // La sucursal está abierta si status es true
  const isOpen = item.branch && item.branch.status === true;

  const indicators = [
    {
      title: `Bs. ${price}`,
      icon: 'motorcycle',
      show: price > 0,
    },
    {
      title: isOpen ? 'Abierto' : 'Cerrado',
      icon: isOpen ? 'unlock' : 'lock',
      show: true,
    }
  ]

  const handlePress = (event) => {
    if (isOpen && onPress) {
      onPress(event);
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{ opacity: isOpen ? 1 : 0.6 }}
    >
      <ViewStyled
        backgroundColor={theme_colors.white}
        width={90}
        marginBottom={1}
        paddingTop={1}
        paddingBottom={0.3}
        style={{
          height: 'auto',
          minHeight: heightPercentageToDP(25),
          maxHeight: heightPercentageToDP(28),
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderRadius: 15,
          shadowColor: theme_colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <ViewStyled
          backgroundColor={theme_colors.transparent}
          style={{
            width: '95%',
            height: '70%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: `${theme_colors.lightGrey}50`,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <ImageStyled
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={item.imageP ? { uri: item.imageP } : require('../../../assets/images/business/emptyPortrait.png')}
          />

          {isOpen && (
            <LinearGradient
              colors={[theme_colors.primary, `${theme_colors.primary}70`, theme_colors.primary]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                width: 'auto',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 15,
                bottom: 15,
                right: 15,
              }}
            >
              <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              >
                <TextStyled
                  fontFamily='SFPro-SemiBold'
                  textAlign='left'
                  fontSize={theme_textStyles.small}
                  color={theme_colors.white}
                >
                  Cashback {item.cashback} %
                </TextStyled>
              </ViewStyled>
            </LinearGradient>
          )}

          {!isOpen && (
            <ViewStyled
              backgroundColor={`${theme_colors.black}80`}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextStyled
                fontFamily='SFPro-Bold'
                textAlign='center'
                fontSize={theme_textStyles.medium}
                color={theme_colors.white}
              >
                CERRADO
              </TextStyled>
            </ViewStyled>
          )}
        </ViewStyled>

        <ViewStyled
          backgroundColor={theme_colors.transparent}
          style={{
            width: '95%',
            height: 'auto',
            marginTop: 5,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <TextStyled
            numberOfLines={1}
            fontFamily='SFPro-Bold'
            textAlign='left'
            fontSize={theme_textStyles.small + .5}
            color={isOpen ? theme_colors.black : theme_colors.grey}
            style={{
              width: '100%',
              marginTop: 2,
            }}
          >
            {item.name} - {item.branch?.sectorName || ''}
          </TextStyled>
        </ViewStyled>

        <ViewStyled
          backgroundColor={theme_colors.transparent}
          style={{
            width: '95%',
            height: 'auto',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {indicators.map((indicator, index) => (
            indicator.show && (
              <IndicatorItem
                key={index}
                indicator={indicator}
                disabled={!isOpen}
                iconSize={14}
                fontSize={theme_textStyles.small}
              />
            )
          ))}
        </ViewStyled>
      </ViewStyled>
    </Pressable>
  )
}