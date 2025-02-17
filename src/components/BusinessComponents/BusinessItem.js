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

export default function BusinessItem({ item, onPress }) {
  // {
  //   "id": "7c4ead2e-b806-4bea-925c-ac5a7fab887a",
  //   "status": null,
  //   "name": "Entereza",
  //   "categoryCode": "f2d43b0c-4c13-4a9a-8b6b-1013d0d82381",
  //   "categoryName": "prueba5",
  //   "email": "entereza",
  //   "cashback": "10",
  //   "image": "https://insightful-integrity-production.up.railway.app/images/get/7c4ead2e-b806-4bea-925c-ac5a7fab887a_image",
  //   "imageP": "https://insightful-integrity-production.up.railway.app/images/get/7c4ead2e-b806-4bea-925c-ac5a7fab887a_imageP",
  //   "favorite": null,
  //   "creationDate": "2024-12-10 00:46:16"
  // },

  // Ubicación falsa de la empresa
  const businessLocation = {
    latitude: -17.373889,
    longitude: -66.155833
  }

  // Ubicación falsa del usuario
  const userLocation = {
    latitude: -17.393889,
    longitude: -66.165833
  }

  // Distancia en metros que viene como prop
  const distance = item.distance // en metros

  // Velocidad promedio de delivery en moto: 30 km/h = 8.33 m/s
  const avgDeliverySpeed = 8.33 // metros por segundo

  // Calculo del tiempo estimado en minutos
  const estimatedDeliveryTime = Math.round((distance / avgDeliverySpeed) / 60)

  const indicators = [
    {
      title: `15 min`,
      icon: 'clock-o',
    },
    {
      title: `15 min`,
      icon: 'motorcycle',
    },
    {
      title: item.status === 'open' ? 'Abierto' : 'Cerrado',
      icon: item.status === 'open' ? 'unlock-alt' : 'lock',
    }
  ]

  return (
    <Pressable
      onPress={onPress}
    >
      <ViewStyled
        backgroundColor={theme_colors.white}
        width={90}
        height={28}
        marginBottom={1}
        paddingVertical={1}
        style={{
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
        </ViewStyled>

        <ViewStyled
          backgroundColor={theme_colors.transparent}
          style={{
            width: '95%',
            flex: 1,
            marginTop: 5,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='left'
            fontSize={theme_textStyles.smedium}
            color={theme_colors.black}
            style={{
              width: '95%',
            }}
          >
            {item.name}
          </TextStyled>

          <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={{
              width: '95%',
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 5,
              gap: 20,
            }}
          >
            {indicators.map((indicator, index) => (
              <IndicatorItem key={index} indicator={indicator} />
            ))}
          </ViewStyled>
        </ViewStyled>
      </ViewStyled>
    </Pressable>
  )
}