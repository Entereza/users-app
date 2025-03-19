import React, { useEffect, useRef, useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ImageStyled from '../../../utils/ui/ImageStyled'
import { useNavigation } from '@react-navigation/native'
import { Pressable, Animated, ScrollView, ActivityIndicator } from 'react-native'
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
import { empresasService } from '../../../services/api/empresas/empresasService'
import { showToast } from '../../../utils/tools/toast/toastService'
import Toast from 'react-native-root-toast'

export default function EmpresaProductDetails({ route }) {
  const { product } = route.params
  const { image: productImage, nameProduct, price, preparationTime } = product
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const [selectedVariables, setSelectedVariables] = useState({})
  const [productVariables, setProductVariables] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const addToCart = useCartStore((state) => state.addToCart)
  const { top } = useSafeAreaInsets()
  const navigation = useNavigation()

  // Inicializar las referencias con los valores correctos para que el botón empiece oculto
  const translateY = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0)).current

  // Cargar variables del producto
  useEffect(() => {
    loadProductVariables()
  }, [])

  const loadProductVariables = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Obtener variables del producto
      const variables = await empresasService.getProductVariables(product.id)

      if (!variables || variables.length === 0) {
        setProductVariables([])
        return
      }

      // Cargar precios para cada variable
      const variablesWithPricing = await Promise.all(
        variables.map(async (pv) => {
          try {
            const pricing = await empresasService.getPricingByProductVariable(pv.id)
            // Solo retornar variables que tengan precios
            if (!pricing || pricing.length === 0) {
              return null
            }
            return {
              id: pv.id,
              namePv: pv.name,
              required: pv.required,
              canMany: pv.canMany,
              maxSelect: pv.canMany ? pv.quantity : 1,
              instructions: pv.instructions,
              variables: pricing.map(price => ({
                id: price.id,
                name: price.name,
                price: price.price,
                position: price.position
              })).sort((a, b) => a.position - b.position)
            }
          } catch (error) {
            console.error(`Error loading pricing for variable ${pv.id}:`, error)
            return null
          }
        })
      )

      // Filtrar variables nulas (en caso de error) y ordenar por posición
      const validVariables = variablesWithPricing
        .filter(v => v !== null && v.variables.length > 0)
        .sort((a, b) => a.position - b.position)

      setProductVariables(validVariables)
    } catch (error) {
      console.error('Error loading product variables:', error)
      setError('Error al cargar las variables del producto')
      showToast('Error al cargar las variables del producto',
        Toast.positions.BOTTOM,
        theme_colors.white,
        theme_colors.error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuantityChange = (quantity) => {
    setCurrentQuantity(quantity)
  }

  const handleVariableSelection = (pvId, selectedItems) => {
    setSelectedVariables(prev => ({
      ...prev,
      [pvId]: selectedItems
    }))
  }

  const areRequiredVariablesSelected = () => {
    if (productVariables.length === 0) return true

    return productVariables
      .filter(pv => pv.variables.length > 0) // Solo considerar variables con elementos
      .every(pv => {
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
    if (areRequiredVariablesSelected()) {
      // Calcular el precio total de las variables seleccionadas
      const variablesPrice = Object.entries(selectedVariables).reduce((total, [pvId, selections]) => {
        const pv = productVariables.find(v => v.id === pvId)
        if (pv) {
          return total + selections.reduce((varTotal, selectionId) => {
            const variable = pv.variables.find(v => v.id === selectionId)
            return varTotal + (variable?.price || 0)
          }, 0)
        }
        return total
      }, 0)

      // Calcular el precio unitario (base + variables)
      const unitPrice = price + variablesPrice;

      const productWithSelectedVariables = {
        ...product,
        price: unitPrice, // Precio unitario
        quantity: currentQuantity, // Cantidad seleccionada
        totalPrice: unitPrice, // Precio unitario (para compatibilidad)
        selectedVariables: Object.entries(selectedVariables).map(([pvId, selections]) => {
          const pv = productVariables.find(v => v.id === pvId)
          return {
            id: pvId,
            name: pv?.namePv,
            namePv: pv?.namePv,
            canMany: pv?.canMany,
            required: pv?.required,
            instructions: pv?.instructions,
            position: pv?.position,
            selections: selections.map(selectionId => {
              const variable = pv?.variables.find(v => v.id === selectionId)
              return {
                id: selectionId,
                name: variable?.name,
                price: variable?.price || 0,
                position: variable?.position
              }
            })
          }
        })
      }

      addToCart(productWithSelectedVariables)
      navigation.goBack()
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (!isLoading) {
      if (currentQuantity >= 1 && areRequiredVariablesSelected()) {
        showButton()
      } else {
        hideButton()
      }
    }
  }, [isLoading, currentQuantity, selectedVariables])

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
            width={11}
            height={5.5}
            borderRadius={50}
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

          {isLoading ? (
            <ViewStyled
              width={95}
              backgroundColor={theme_colors.transparent}
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                height: 200
              }}
            >
              <ActivityIndicator size="large" color={theme_colors.primary} />
            </ViewStyled>
          ) : error ? (
            <ViewStyled
              width={95}
              backgroundColor={theme_colors.transparent}
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TextStyled
                fontFamily='SFPro-Regular'
                textAlign='center'
                fontSize={theme_textStyles.medium}
                color={theme_colors.error}
              >
                {error}
              </TextStyled>
            </ViewStyled>
          ) : productVariables.length > 0 && (
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
            {`${currentQuantity} ${currentQuantity > 1 ? 'productos' : 'producto'}`}
          </TextStyled>
          <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='left'
            fontSize={theme_textStyles.large}
            color={theme_colors.white}
          >
            {`BOB. ${calculateTotalPrice()}`}
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
          disabled={!areRequiredVariablesSelected() || isLoading}
          style={{
            opacity: areRequiredVariablesSelected() && !isLoading ? 1 : 0.5
          }}
        />
      </Animated.View>
    </ViewStyled>
  )

  function calculateTotalPrice() {
    let total = price * currentQuantity

    // Sumar precios de variables seleccionadas
    Object.entries(selectedVariables).forEach(([pvId, selections]) => {
      const pv = productVariables.find(v => v.id === pvId)
      if (pv) {
        selections.forEach(selectionId => {
          const variable = pv.variables.find(v => v.id === selectionId)
          if (variable) {
            total += variable.price * currentQuantity
          }
        })
      }
    })

    return total.toFixed(2)
  }
}