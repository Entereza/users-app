import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen'
import SearchBar from '../../../components/BusinessComponents/SearchBar'
import useAuthStore from '../../../utils/tools/interface/authStore'
import ListBusinesses from '../../../components/BusinessComponents/CategoriesComponents/ListBusinesses'
import { empresasService } from '../../../services/api/empresas/empresasService'
import useLocationStore from '../../../utils/tools/interface/locationStore'
import BusinessSkeleton from '../../../components/Skeletons/BusinessSkeleton'
import { toastService } from '../../../utils/tools/interface/toastService'
import Toast from 'react-native-root-toast'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import { useNavigation } from '@react-navigation/native'

export default function EmpresasCategory({ route }) {
    const { category, showTabBar = true } = route.params
    const { user } = useAuthStore()
    const { latitude, longitude, departmentId } = useLocationStore();
    const navigation = useNavigation();
    const { toggleTabBar } = useTabBarStore();

    const [isLoading, setIsLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("")
    const [initialBusinesses, setInitialBusinesses] = useState([]); // Negocios iniciales
    const [searchResults, setSearchResults] = useState([]); // Resultados de búsqueda
    const [searchTimeout, setSearchTimeout] = useState(null);

    const fetchBusinesses = useCallback(async (searchText, isInitialLoad = false) => {
        try {
            setIsLoading(true);
            const response = await empresasService.getBranchesByCityRegex(
                departmentId,
                latitude,
                longitude,
                searchText,
                category.id
            );

            // console.log('response getBranchesByCityRegex: ', JSON.stringify(response, null, 2))

            const processedBusiness = response?.business?.content
                ? empresasService.processBusinessData(response)
                : [];

            if (isInitialLoad) {
                setInitialBusinesses(processedBusiness);
                setSearchResults([]);
            } else {
                setSearchResults(processedBusiness);
            }
        } catch (error) {
            console.error('Error fetching businesses:', error);
            toastService.showErrorToast(
                "Ocurrió un error al buscar empresas.\nPor favor, intenta nuevamente en unos minutos.",
                Toast.positions.CENTER
            );
            if (isInitialLoad) {
                setInitialBusinesses([]);
            } else {
                setSearchResults([]);
            }
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setInitialLoading(false);
            }, 1000);
        }
    }, [departmentId, latitude, longitude, category.id]);

    // Carga inicial de negocios
    useEffect(() => {
        fetchBusinesses("", true);
    }, [fetchBusinesses]);

    // Manejo de búsqueda con debounce
    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchValue.length > 0) {
            setIsLoading(true);
            const timeoutId = setTimeout(() => {
                fetchBusinesses(searchValue, false);
            }, 500);
            setSearchTimeout(timeoutId);
        } else {
            if (!initialLoading) {
                setSearchResults([]);
                setIsLoading(false);
            }
        }

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchValue, fetchBusinesses]);

    // Determinar qué lista de negocios mostrar
    const businessesToShow = searchValue.length > 0 ? searchResults : initialBusinesses;

    const goBack = () => {
        if (showTabBar) {
            toggleTabBar(true)
        }
        navigation.goBack()
    }

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderInternalScreen title={category?.name || "Categoría"} onPress={goBack} />

            <SearchBar
                placeHolderActive={`¿Qué empresa buscas ${user.names.split(' ')[0]}?`}
                active={true}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onPress={null}
            />

            {isLoading ? (
                <BusinessSkeleton showSkeletonText={false} />
            ) : (
                <ListBusinesses
                    businesses={businessesToShow}
                    nameCategory={category?.name}
                    isSearching={searchValue.length > 0}
                />
            )}
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
});