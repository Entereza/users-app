import React, { useRef, useEffect, useState, useCallback } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { Pressable, ScrollView, StyleSheet, BackHandler, RefreshControl } from 'react-native'
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
import ButtonGoToCart from '../../../components/Buttons/ButtonGoToCart'
import useCartStore from '../../../utils/tools/interface/cartStore'
import { empresasService } from '../../../services/api/empresas/empresasService'
import { locationService } from '../../../services/location/locationService'
import { showToast } from '../../../utils/tools/toast/toastService'
import Toast from 'react-native-root-toast'
import EmpresaDetailsSkeleton from '../../../components/Skeletons/EmpresaDetailsSkeleton'
import AlertStyled from '../../../utils/ui/AlertStyled'
import useAddressStore from '../../../utils/tools/interface/addressStore'

export default function EmpresaDetails({ route }) {
    const { business, showTabBar = true } = route.params
    const { image: businessImage, name: businessName, branch, distance, cashback } = business
    const { id, companyID: businessId, lat, long, sectorName, tripPrice } = branch

    const { top } = useSafeAreaInsets()
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore()
    const navigation = useNavigation()
    const { cart, clearCart } = useCartStore()
    const { selectedAddress } = useAddressStore()

    // Estados para manejo de datos y loading
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(null)
    const [nearestBranch, setNearestBranch] = useState(null)
    const [categoryList, setCategories] = useState([])
    const [productsData, setProductsData] = useState({})
    const [promotionsData, setPromotionsData] = useState([])

    // Estados que antes estaban en categoryStore
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sectionPositions, setSectionPositions] = useState({})
    const [hasPromotions, setHasPromotions] = useState(false)
    const [isManualSelection, setIsManualSelection] = useState(false)

    // Referencias para el scroll
    const scrollViewRef = useRef(null)
    const categoriesListRef = useRef(null)

    // Flag to bypass navigation listener when intentionally navigating
    const isNavigatingRef = useRef(false)

    // Alert states
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
        textConfirmButton: '',
        showCancelButton: true,
        textCancelButton: ''
    });

    // Función para cargar los datos iniciales
    const loadInitialData = async () => {
        try {
            setError(null);
            setIsLoading(true);

            // 1. Obtener coordenadas del usuario: priorizar selectedAddress, fallback a ubicación actual
            let userLatitude = null
            let userLongitude = null

            if (selectedAddress?.lat && selectedAddress?.lng) {
                userLatitude = selectedAddress.lat
                userLongitude = selectedAddress.lng
                console.log('Using selectedAddress coords: ', { userLatitude, userLongitude })
            } else {
                const location = await locationService.getCurrentLocation();
                console.log('Using device location: ', location);
                userLatitude = location.coords.latitude
                userLongitude = location.coords.longitude
            }

            // 2. Obtener menú base
            const menuResponse = await empresasService.getBusinessMenuBase(
                businessId,
                userLatitude,
                userLongitude
            );
            if (!menuResponse || !menuResponse.menu) {
                throw new Error('No se encontró el menú del restaurante');
            }

            // Procesar datos del menú
            const validCategories = [];
            const tempProductsData = {};
            const promotions = [];

            menuResponse.menu.forEach(menuItem => {
                if (menuItem.category && menuItem.productsData) {
                    const categoryName = menuItem.category.categoryName;

                    // Procesar productos desde productsData
                    const products = menuItem.productsData
                        .filter(item => item.products.status === 1)
                        .map(item => ({
                            id: item.products.id,
                            nameProduct: item.products.name,
                            description: item.products.description,
                            price: item.products.pricing,
                            image: item.products.url,
                            status: item.products.status,
                            categoryId: item.products.categoryProductId,
                            position: item.products.position
                        }))
                        .sort((a, b) => a.position - b.position);

                    if (products.length > 0) {
                        if (categoryName.toLowerCase() === 'promociones') {
                            promotions.push(...products);
                        } else {
                            tempProductsData[categoryName] = products;
                            validCategories.push(categoryName);
                        }
                    }
                }
            });

            // Actualizar estados
            setCategories(validCategories);
            setProductsData(tempProductsData);
            setPromotionsData(promotions);
            setHasPromotions(promotions.length > 0);
            setSelectedCategory(validCategories[0] || '');
            setNearestBranch(menuResponse.branch);

        } catch (error) {
            console.error('Error loading initial data:', error);
            setError(error.message);
            showToast(error.message,
                Toast.positions.CENTER,
                theme_colors.white,
                theme_colors.error);
        } finally {
            setIsLoading(false);
        }
    };

    // Actualizar el efecto para manejar promociones
    useEffect(() => {
        const loadPromotions = async () => {
            if (!nearestBranch) return

            try {
                const promos = await empresasService.getProductsByCategory('Promociones')
                const mappedPromos = promos
                    .filter(promo => promo.status === 1)
                    .map(promo => ({
                        id: promo.id,
                        nameProduct: promo.name,
                        description: promo.description,
                        price: promo.pricing,
                        image: promo.url,
                        status: promo.status,
                        position: promo.position
                    }))
                    .sort((a, b) => a.position - b.position)

                setPromotionsData(mappedPromos)
                setHasPromotions(mappedPromos.length > 0)
            } catch (error) {
                console.error('Error loading promotions:', error)
                showToast('Error al cargar promociones',
                    Toast.positions.BOTTOM,
                    theme_colors.white,
                    theme_colors.error)
                setPromotionsData([])
                setHasPromotions(false)
            }
        }

        loadPromotions()
    }, [nearestBranch])

    // Función para refrescar los datos
    const onRefresh = useCallback(async () => {
        setIsRefreshing(true)
        await loadInitialData()
        setIsRefreshing(false)
    }, [])

    // Navigation handlers
    const handleNavigationBack = useCallback(() => {
        if (cart.length === 0) {
            // No items in cart, go back directly
            if (showTabBar) {
                toggleTabBar(true)
            }
            changeColorStatusBar(theme_colors.white)
            navigation.goBack()
            return
        }

        // Show alert if there are items in cart
        setShowAlert(true)
        setAlertText({
            title: '¿Quieres eliminar el carrito?',
            message: `Se eliminarán todos los productos del carrito`,
            type: 'dark',
            textConfirmButton: 'Eliminar',
            showCancelButton: true,
            textCancelButton: 'Cancelar'
        });
    }, [cart.length, showTabBar, toggleTabBar, navigation, changeColorStatusBar])

    const handleConfirmExit = useCallback(() => {
        isNavigatingRef.current = true // Set flag to bypass listener
        toggleTabBar(true)
        clearCart()
        // Limpiar estados
        setSelectedCategory('')
        setSectionPositions({})
        setHasPromotions(false)
        setIsManualSelection(false)
        setShowAlert(false)
        navigation.goBack()
        changeColorStatusBar(theme_colors.white)
    }, [toggleTabBar, clearCart, navigation])

    const handleCloseAlert = useCallback(() => {
        setShowAlert(false)
    }, [])

    // Setup navigation interceptor and back handler
    useEffect(() => {
        // Intercept navigation events
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // If we're intentionally navigating, allow it
            if (isNavigatingRef.current) {
                isNavigatingRef.current = false // Reset flag
                return;
            }

            if (cart.length === 0) {
                // No items in cart, allow navigation
                return;
            }

            // Prevent default behavior
            e.preventDefault();

            // Show confirmation dialog
            handleNavigationBack();
        });

        return unsubscribe;
    }, [navigation, cart.length, handleNavigationBack]);

    // Android back button handler (as fallback)
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                handleNavigationBack();
                return true; // Prevent default behavior
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [handleNavigationBack])
    );

    // Cargar datos iniciales
    useEffect(() => {
        loadInitialData()

        return () => {
            // Limpiar estados al desmontar
            setSelectedCategory('')
            setSectionPositions({})
            setHasPromotions(false)
            setIsManualSelection(false)
        }
    }, [])

    const price = tripPrice || 0;

    const indicators = [
        {
            title: `Bs. ${price}`,
            icon: 'motorcycle',
            show: price > 0,
        },
        {
            title: `${cashback} %`,
            icon: 'money-bill-transfer',
            show: cashback > 0,
        }
    ]

    const promotions = products.filter(product => product.category === 'Promociones')

    // Actualizar el estado de promociones
    useEffect(() => {
        setHasPromotions(promotions.length > 0)
    }, [])

    // Función para establecer la posición de una sección
    const handleSetSectionPosition = (category, position) => {
        setSectionPositions(prev => ({
            ...prev,
            [category]: position
        }))
    }

    // Función para hacer scroll a una categoría
    const scrollToCategory = (category) => {
        const position = sectionPositions[category] || 0
        scrollViewRef.current?.scrollTo({ y: position, animated: true })
    }

    // Manejar el scroll
    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y
        const layoutHeight = event.nativeEvent.layoutMeasurement.height
        const contentHeight = event.nativeEvent.contentSize.height

        // Aumentamos el margen para detectar el final para evitar el "bounce"
        const isCloseToBottom = layoutHeight + scrollY >= contentHeight - 100

        if (isManualSelection) return;

        // Encontrar la sección actual basada en la posición del scroll
        let currentSection = ''

        if (scrollY <= 10) {
            currentSection = categoryList[0] || ''
        } else if (isCloseToBottom) {
            // Si estamos cerca del final, seleccionar la última categoría
            const nonMenuCategories = categoryList
            currentSection = nonMenuCategories[nonMenuCategories.length - 1]
        } else {
            // Usamos un enfoque más preciso para determinar la categoría actual
            let lastMatchedCategory = categoryList[0] || ''
            let lastPosition = 0

            Object.entries(sectionPositions).forEach(([category, position]) => {
                // Solo consideramos posiciones que están por debajo del scroll actual
                if (scrollY >= position - 50 && position >= lastPosition) {
                    lastMatchedCategory = category
                    lastPosition = position
                }
            })

            currentSection = lastMatchedCategory
        }

        if (currentSection !== selectedCategory) {
            setSelectedCategory(currentSection)
        }
    }

    // Calcular el total del carrito incluyendo variables
    const calculateCartTotal = () => {
        return cart.reduce((total, item) => {
            // Si el producto tiene un totalPrice (que incluye variables), usarlo
            if (item.totalPrice) {
                return total + (item.totalPrice * item.quantity)
            }
            // Si no, usar el precio base
            return total + (item.price * item.quantity)
        }, 0).toFixed(2)
    }

    // Función para manejar el clic en una categoría
    const handleCategoryPress = (category) => {
        setIsManualSelection(true)
        setSelectedCategory(category)

        if (category) {
            scrollToCategory(category)
        }

        setTimeout(() => {
            setIsManualSelection(false)
        }, 1000)
    }

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
            onLayout={(event) => {
                // Capturamos la posición del footer para mejorar los cálculos de scroll
                const footerY = event.nativeEvent.layout.y
                handleSetSectionPosition('Footer', footerY)
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
        <>
            {showAlert && (
                <AlertStyled
                    widthModal={90}
                    heightModal={30}
                    heightText={19}
                    title={alertText.title}
                    message={alertText.message}
                    type={alertText.type}
                    onConfirmPressed={handleConfirmExit}
                    onCancelPressed={handleCloseAlert}
                    textConfirmButton={alertText.textConfirmButton}
                    textCancelButton={alertText.textCancelButton}
                    showCloseButton={false}
                    showCancelButton={alertText.showCancelButton}
                    widthConfirm={alertText.showCancelButton ? '55%' : '95%'}
                    widthCancel={'40%'}
                />
            )}

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
                        onPress={handleNavigationBack}
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
                            borderRadius={1.5}
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
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='left'
                        fontSize={theme_textStyles.large}
                        color={theme_colors.black}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '90%',
                        }}
                    >
                        {businessName} - {sectorName}
                    </TextStyled>

                    <ViewStyled
                        width={40}
                        backgroundColor={theme_colors.transparent}
                        marginBottom={2}
                        marginLeft={5}
                        style={{
                            height: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                        }}
                    >
                        {indicators.map((indicator, index) => (
                            <IndicatorItem key={index} indicator={indicator} iconSize={18} fontSize={theme_textStyles.smedium} iconColor={theme_colors.primary} />
                        ))}
                    </ViewStyled>

                    {isLoading ? (
                        <EmpresaDetailsSkeleton />
                    ) : error ? (
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                height: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 20
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
                    ) : (
                        <>
                            <CategoriesProductsList
                                categories={categoryList}
                                selectedCategory={selectedCategory}
                                onCategoryPress={handleCategoryPress}
                                categoriesListRef={categoriesListRef}
                            />

                            <ScrollView
                                ref={scrollViewRef}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContent}
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isRefreshing}
                                        onRefresh={onRefresh}
                                        colors={[theme_colors.primary]}
                                        tintColor={theme_colors.primary}
                                    />
                                }
                            >
                                {promotionsData.length > 0 && (
                                    <PromotionsList
                                        promotions={promotionsData}
                                        onLayout={(event) => {
                                            handleSetSectionPosition('Promociones', event.nativeEvent.layout.y)
                                        }}
                                    />
                                )}

                                {categoryList.map((category, index) => (
                                    <ProductsList
                                        key={index}
                                        category={category}
                                        products={productsData[category] || []}
                                        onLayout={(event) => {
                                            handleSetSectionPosition(category, event.nativeEvent.layout.y)
                                        }}
                                    />
                                ))}
                                <FooterComponent />
                            </ScrollView>

                            <ButtonGoToCart total={calculateCartTotal()} branchId={nearestBranch.id} tripPrice={tripPrice || 0} cashbackBusiness={cashback || 0} />
                        </>
                    )}
                </ViewStyled>
            </ViewStyled>
        </>
    )
}

const styles = StyleSheet.create({
    scrollContent: {
        width: '100%',
        alignItems: 'center',
    }
});