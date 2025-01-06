import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

export default function EmpresaDetails({ route }) {
    const { business } = route.params
    const { image: businessImage, name: businessName, estimatedPreparationTime, distance, cashback } = business

    const { top } = useSafeAreaInsets()
    const { toggleTabBar } = useTabBarStore()
    const navigation = useNavigation()

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


    //
    const goBack = () => {
        toggleTabBar(true)
        navigation.goBack()
    }

    // Get list categories
    // Get list products by category
    // Tomando en cuenta todos los productos se debe obtener el nombre de las categorias
    const getCategories = () => {
        const categories = products.map(product => product.category)
        return ['Menú', ...new Set(categories)]
    }

    const getProductsByCategory = (category) => {
        return products.filter(product => product.category === category)
    }

    const categories = getCategories()

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
                            size={adjustFontSize(25)}
                            color={theme_colors.primary}
                        />
                    </ViewStyled>
                </Pressable>
            </ViewStyled>

            <ViewStyled
                backgroundColor={theme_colors.white}
                style={{
                    width: '100%',
                    height: '78%',
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
                    fontSize={11}
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
                        <IndicatorItem key={index} indicator={indicator} iconSize={18} fontSize={7} />
                    ))}
                </ViewStyled>

                <CategoriesProductsList categories={categories} />

                <PromotionsList promotions={getProductsByCategory('Promociones')} />
            </ViewStyled>
        </ViewStyled>
    )
}