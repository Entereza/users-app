import React, { useState, useEffect, useCallback } from 'react'
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled'
import SearchBar from '../../../components/BusinessComponents/SearchBar'
import { FlatList, StyleSheet } from 'react-native';
import BusinessItem from '../../../components/BusinessComponents/BusinessItem';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import useLocationStore from '../../../utils/tools/interface/locationStore';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import BusinessSkeleton from '../../../components/Skeletons/BusinessSkeleton';
import TextStyled from '../../../utils/ui/TextStyled';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import { theme_colors } from '../../../utils/theme/theme_colors';
import useAuthStore from '../../../utils/tools/interface/authStore';
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen';
import { empresasService } from '../../../services/api/empresas/empresasService';
import { toastService } from '../../../utils/tools/interface/toastService';
import Toast from 'react-native-root-toast';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import CategoryItem from '../../../components/BusinessComponents/CategoriesComponents/CategoryItem';

export default function SearchBusiness() {
    const navigation = useNavigation()
    const { user } = useAuthStore();
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();
    const { latitude, longitude, departmentId } = useLocationStore();

    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const [foundedCategories, setFoundedCategories] = useState([])
    const [foundedBusiness, setFoundedBusiness] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null);

    const searchBusinesses = useCallback(async (searchText) => {
        try {
            setIsLoading(true);
            const response = await empresasService.getBranchesByCityRegex(
                departmentId,
                latitude,
                longitude,
                searchText
            );

            console.log('getBranchesByCityRegex: ', response)

            // Procesar negocios
            if (response?.business?.content) {
                const processedBusiness = empresasService.processBusinessData(response);
                setFoundedBusiness(processedBusiness);
            } else {
                setFoundedBusiness([]);
            }

            // Procesar categorías
            if (response?.category?.content) {
                const categories = response.category.content.map(item => (
                    {
                        id: item.category.id,
                        name: item.category.name,
                        url: item.category.url,
                        categoryCode: item.category.id,
                    }));
                setFoundedCategories(categories);
            } else {
                setFoundedCategories([]);
            }
        } catch (error) {
            console.error('Error searching businesses:', error);
            toastService.showErrorToast("Ocurrió un error al buscar empresas.\nPor favor, intenta nuevamente en unos minutos.", Toast.positions.CENTER);
            setFoundedBusiness([]);
            setFoundedCategories([]);
        } finally {
            setIsLoading(false);
        }
    }, [departmentId, latitude, longitude]);

    useEffect(() => {
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set new timeout for search
        if (searchValue.length > 0) {
            setIsLoading(true);
            const timeoutId = setTimeout(() => {
                searchBusinesses(searchValue);
            }, 500); // Wait 500ms after last keystroke before searching
            setSearchTimeout(timeoutId);
        } else {
            setIsLoading(false);
            setFoundedBusiness([]);
            setFoundedCategories([]);
        }

        // Cleanup timeout on component unmount
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchValue, searchBusinesses]);

    const goToBusinessScreen = (item) => {
        changeColorStatusBar(theme_colors.transparent);
        toggleTabBar(false);
        navigation.navigate(private_name_routes.empresas.empresasDetails, {
            business: item,
            showTabBar: false
        });
    }

    const goToCategoryScreen = (item) => {
        toggleTabBar(false);
        navigation.navigate(private_name_routes.empresas.empresaCategory, {
            category: item,
            showTabBar: false
        })
    }

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderInternalScreen title={"Buscar Empresas"} />

            <SearchBar
                active
                autoFocus
                placeHolderActive={`¿Qué estás buscando ${user.names.split(' ')[0]}?`}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onPress={null}
            />

            {
                isLoading
                    ? <>
                        <CategorySkeleton showSkeleton={true} />

                        <BusinessSkeleton showSkeletonText={false} />
                    </>
                    : <>
                        {foundedCategories.length > 0 && (
                            <ViewStyled
                                width={95}
                                backgroundColor={theme_colors.transparent}
                                paddingVertical={1}
                                style={{
                                    height: 'auto',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <FlatList
                                    contentContainerStyle={{
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                    }}
                                    horizontal={true}
                                    scrollEnabled={true}
                                    data={foundedCategories}
                                    renderItem={({ item, index }) =>
                                        <CategoryItem
                                            item={{
                                                id: item.id,
                                                name: item.name,
                                                icon: item.url,
                                                categoryCode: item.id
                                            }}
                                            key={index}
                                            onPress={() => goToCategoryScreen(item)}
                                        />
                                    }
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                />
                            </ViewStyled>
                        )}

                        <FlatList
                            data={foundedBusiness}
                            contentContainerStyle={{
                                marginTop: foundedCategories.length <= 0 ? 20 : 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                paddingHorizontal: 5,
                                paddingTop: 2,
                                paddingBottom: heightPercentageToDP(10),
                            }}
                            renderItem={({ item, index }) =>
                                <BusinessItem
                                    item={item}
                                    onPress={() => goToBusinessScreen(item)}
                                    key={index}
                                />
                            }
                            ListFooterComponent={() => {
                                return (
                                    <ViewStyled
                                        backgroundColor={theme_colors.transparent}
                                        width={90}
                                        marginTop={2}
                                        height={5}
                                        style={{
                                            justifyContent: 'center',
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
                                            {
                                                foundedBusiness.length > 0
                                                    ? `Estos son los resultados encontrados para '${searchValue}'`
                                                    : searchValue.length > 0
                                                        ? `No hay resultados para '${searchValue}'`
                                                        : `Aquí aparecerán las empresas que te interesan`
                                            }
                                        </TextStyled>
                                    </ViewStyled>
                                )
                            }}
                            horizontal={false}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
            }
        </SafeAreaStyled>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.transparent,
        flex: 1,
    },
    startView: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollContent: {
        width: '100%',
        alignItems: 'center'
    }
});