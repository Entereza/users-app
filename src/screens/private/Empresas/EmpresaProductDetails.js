import React, { useEffect, useRef, useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ImageStyled from '../../../utils/ui/ImageStyled'
import { useNavigation } from '@react-navigation/native'
import { Pressable, Animated, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import TextStyled from '../../../utils/ui/TextStyled'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProductButtonsAddToCart from '../../../components/BusinessComponents/ProductsComponents/ProductButtonsAddToCart'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import ButtonWithIcon from '../../../components/Buttons/ButtonWithIcon'
import useCartStore from '../../../utils/tools/interface/cartStore'
import ProductVariableList from '../../../components/BusinessComponents/ProductsComponents/ProductVariableList'
import { productVariables } from '../../../utils/tools/storage/data'

export default function EmpresaProductDetails({ route }) {
  const { product } = route.params
  const { image: productImage, nameProduct, price, preparationTime, hasVariables } = product
  const [currentQuantity, setCurrentQuantity] = useState(0)
  const [selectedVariables, setSelectedVariables] = useState({})
  const addToCart = useCartStore((state) => state.addToCart)

  const { top } = useSafeAreaInsets()
  const navigation = useNavigation()

  const translateY = useRef(new Animated.Value(100)).current
  const opacity = useRef(new Animated.Value(0)).current

  const handleQuantityChange = (quantity) => {
    setCurrentQuantity(quantity)
    if (quantity > 0 && areRequiredVariablesSelected()) {
      showButton()
    } else {
      hideButton()
    }
  }

  const handleVariableSelection = (pvId, selectedItems) => {
    setSelectedVariables(prev => ({
      ...prev,
      [pvId]: selectedItems
    }))
    
    if (currentQuantity > 0 && areRequiredVariablesSelected()) {
      showButton()
    } else {
      hideButton()
    }
  }

  const areRequiredVariablesSelected = () => {
    if (!hasVariables) return true

    return productVariables.every(pv => {
      if (!pv.required) return true
      const selections = selectedVariables[pv.id] || []
      return selections.length > 0
    })
  }

  const showButton = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const hideButton = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleAddToCart = () => {
    if (currentQuantity > 0 && areRequiredVariablesSelected()) {
      const productWithVariables = {
        ...product,
        selectedVariables: selectedVariables
      }
      
      for (let i = 0; i < currentQuantity; i++) {
        addToCart(productWithVariables)
      }
      navigation.goBack()
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <ViewStyled
      backgroundColor={theme_colors.white}
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Header con imagen */}
      <ViewStyled
        backgroundColor={theme_colors.transparent}
        style={{
          width: '100%',
          height: '35%',
          justifyContent: 'center',
          alignItems: 'center',
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
          source={productImage ? { uri: productImage } : require('../../../../assets/images/business/emptyPortrait.png')}
        />

        <Pressable
          onPress={goBack}
          style={{
            top: top,
            left: 10,
            position: 'absolute',
            zIndex: 2
          }}
        >
          <ViewStyled
            width={12}
            height={6}
            borderRadius={1.2}
            backgroundColor={theme_colors.white}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: theme_colors.primary
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={adjustFontSize(theme_textStyles.xlarge)}
              color={theme_colors.primary}
            />
          </ViewStyled>
        </Pressable>
      </ViewStyled>

      <ViewStyled
        backgroundColor={theme_colors.white}
        style={{
          width: '100%',
          height: '75%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 15,
          position: 'absolute'
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 100,
          }}
        >
          <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='center'
            fontSize={theme_textStyles.xlarge}
            color={theme_colors.black}
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              width: '90%',
            }}
          >
            {nameProduct}
          </TextStyled>

          <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='center'
            fontSize={theme_textStyles.large}
            color={theme_colors.primary}
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              width: '90%',
              marginBottom: 20
            }}
          >
            Bs. {price}
          </TextStyled>

          <ProductButtonsAddToCart
            item={product}
            onQuantityChange={handleQuantityChange}
            initialQuantity={1}
          />

          {hasVariables && (
            <ViewStyled
              width={95}
              backgroundColor={theme_colors.transparent}
              style={{
                marginTop: 20,
              }}
            >
              {productVariables.map((pv) => (
                <ProductVariableList
                  key={pv.id}
                  namePv={pv.namePv}
                  variables={pv.variables}
                  isRequired={pv.required}
                  maxSelect={pv.maxSelect}
                  onSelectionChange={(selectedItems) => handleVariableSelection(pv.id, selectedItems)}
                />
              ))}
            </ViewStyled>
          )}
        </ScrollView>
      </ViewStyled>

      <Animated.View
        style={{
          transform: [{ translateY }],
          opacity,
          width: widthPercentageToDP(90),
          height: 'auto',
          backgroundColor: theme_colors.primary,
          paddingVertical: 10,
          paddingHorizontal: 15,
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
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
            flex: 1,
            height: 'auto',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <TextStyled
            fontFamily='SFPro-Regular'
            textAlign='left'
            fontSize={theme_textStyles.small}
            color={theme_colors.textGrey}
          >
            {`${currentQuantity} productos`}
          </TextStyled>
          <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='left'
            fontSize={theme_textStyles.large}
            color={theme_colors.white}
          >
            {`BOB. ${price * currentQuantity}`}
          </TextStyled>
        </ViewStyled>

        <ButtonWithIcon
          withIcon={false}
          onPress={handleAddToCart}
          borderWidth={0}
          borderRadius={1.5}
          backgroundColor={theme_colors.white}
          colorText={theme_colors.primary}
          fontSize={theme_textStyles.smedium}
          sizeIcon={theme_textStyles.medium}
          marginRightIcon={8}
          width={40}
          height={6}
          fontFamily={'SFPro-Bold'}
          textButton={'Agregar'}
          disabled={!areRequiredVariablesSelected()}
        />
      </Animated.View>
    </ViewStyled>
  )
}