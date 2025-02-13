import React, { useRef, useEffect } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { Animated, Pressable, ScrollView, StyleSheet, BackHandler } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import ImageStyled from '../../../utils/ui/ImageStyled'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextStyled from '../../../utils/ui/TextStyled'
import IndicatorItem from '../../../components/BusinessComponents/IndicatorItem'
import CategoriesProductsList from '../../../components/BusinessComponents/CategoriesComponents/CategoriesProductsList'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import { products } from '../../../utils/tools/storage/data'
import PromotionsList from '../../../components/BusinessComponents/CategoriesComponents/DetailsComponents/PromotionsList'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import ProductsList from '../../../components/BusinessComponents/ProductsComponents/ProductsList'
import useCategoryStore from '../../../utils/tools/interface/categoryStore'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import ButtonGoToCart from '../../../components/Buttons/ButtonGoToCart'
import useCartStore from '../../../utils/tools/interface/cartStore'

export default function EmpresaDetails({ route }) {
    const { business } = route.params
    const { image: businessImage, name: businessName, estimatedPreparationTime, distance, cashback } = business

    const { top } = useSafeAreaInsets()
    const { toggleTabBar } = useTabBarStore()
    const navigation = useNavigation()

    // Referencias y estados para el scroll
    const scrollViewRef = useRef(null)
    const {
        setScrollViewRef,
        selectedCategory,
        setSelectedCategory,
        setHasPromotions,
        setSectionPosition,
        resetState,
        isManualSelection
    } = useCategoryStore()

    // Establecer la referencia del ScrollView
    useEffect(() => {
        setScrollViewRef(scrollViewRef.current)

        // Limpiar estado al desmontar
        return () => {
            resetState()
        }
    }, [])

    // Manejar el botón de retroceso del hardware
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                goBack();
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    // Velocidad promedio de delivery en moto: 30 km/h = 8.33 m/s
    const avgDeliverySpeed = 8.33 // metros por segundo

    // Calculo del tiempo estimado en minutos
    const estimatedDeliveryTime = Math.round((distance / avgDeliverySpeed) / 60)

    const indicators = [
        {
            title: `${estimatedDeliveryTime} min`,
            icon: 'motorcycle',
        },
        {
            title: `${estimatedPreparationTime} min`,
            icon: 'clock-o',
        },
        {
            title: `${cashback} %`,
            icon: 'dollar',
        }
    ]

    const goBack = () => {
        resetState()
        toggleTabBar(true)
        navigation.goBack()
    }

    // Get list categories
    const getCategories = () => {
        const categories = products.map(product => product.category)
        const uniqueCategories = [...new Set(categories)]
        // Filtrar categorías que tienen productos y excluir 'Promociones'
        const categoriesWithProducts = uniqueCategories.filter(category =>
            category !== 'Promociones' && products.some(product => product.category === category)
        )
        return ['Menú', ...categoriesWithProducts]
    }

    const getProductsByCategory = (category) => {
        return products.filter(product => product.category === category)
    }

    const promotions = products.filter(product => product.category === 'Promociones')

    // Actualizar el estado de promociones
    useEffect(() => {
        setHasPromotions(promotions.length > 0)
    }, [])

    const categories = getCategories()

    // Manejar el scroll
    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y
        const layoutHeight = event.nativeEvent.layoutMeasurement.height
        const contentHeight = event.nativeEvent.contentSize.height
        const isCloseToBottom = layoutHeight + scrollY >= contentHeight - 20

        if (isManualSelection) return;

        // Encontrar la sección actual basada en la posición del scroll
        let currentSection = 'Menú'

        if (scrollY <= 10) {
            currentSection = 'Menú'
        } else if (isCloseToBottom) {
            // Si estamos cerca del final, seleccionar la última categoría
            const nonMenuCategories = categories.filter(cat => cat !== 'Menú')
            currentSection = nonMenuCategories[nonMenuCategories.length - 1]
        } else {
            Object.entries(useCategoryStore.getState().sectionPositions).forEach(([category, position]) => {
                if (scrollY >= position - 50) {
                    currentSection = category
                }
            })
        }

        if (currentSection !== selectedCategory) {
            setSelectedCategory(currentSection)
        }
    }

    const cart = useCartStore((state) => state.cart);

    // Componente de footer para dar espacio adicional
    const FooterComponent = () => (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={90}
            height={cart.length > 0 ? 18 : 13}
            paddingTop={2}
            style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <TextStyled
                fontFamily='SFPro-Italic'
                textAlign='center'
                fontSize={theme_textStyles.small}
                color={theme_colors.grey}
                style={{
                    width: "100%",
                }}
            >
                {`Estos son todos los productos de '${businessName}'`}
            </TextStyled>
        </ViewStyled>
    )

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
                    height: '30%',
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
                    source={businessImage ? { uri: businessImage } : require('../../../../assets/images/business/emptyPortrait.png')}
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
                    height: '80%',
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
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.xlarge + 1}
                    color={theme_colors.black}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                        width: '90%',
                    }}
                >
                    {businessName}
                </TextStyled>

                <ViewStyled
                    width={90}
                    backgroundColor={theme_colors.white}
                    marginVertical={1.5}
                    paddingVertical={1.8}
                    paddingHorizontal={5}
                    marginBottom={2}
                    style={{
                        height: 'auto',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        shadowColor: theme_colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 3,
                    }}
                >
                    {indicators.map((indicator, index) => (
                        <IndicatorItem key={index} indicator={indicator} iconSize={18} fontSize={theme_textStyles.smedium} />
                    ))}
                </ViewStyled>

                <CategoriesProductsList categories={categories} />

                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {promotions.length > 0 && (
                        <PromotionsList
                            promotions={promotions}
                            onLayout={(event) => {
                                setSectionPosition('Promociones', event.nativeEvent.layout.y)
                            }}
                        />
                    )}

                    {categories.filter(category => category !== 'Menú').map((category, index) => {
                        const categoryProducts = getProductsByCategory(category)
                        if (categoryProducts.length === 0) return null

                        return (
                            <ProductsList
                                key={index}
                                category={category}
                                products={categoryProducts}
                                onLayout={(event) => {
                                    setSectionPosition(category, event.nativeEvent.layout.y)
                                }}
                            />
                        )
                    })}
                    <FooterComponent />
                </ScrollView>

                <ButtonGoToCart />
            </ViewStyled>
        </ViewStyled>
    )
}

const styles = StyleSheet.create({
    scrollContent: {
        width: '100%',
        alignItems: 'center',
    }
});