import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import CategoryItem from './CategoryItem'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { empresasService } from '../../../services/api/empresas/empresasService'
import useLocationStore from '../../../utils/tools/interface/locationStore'
import { showToast } from '../../../utils/tools/toast/toastService'
import Toast from 'react-native-root-toast'
import CategorySkeleton from '../../Skeletons/CategorySkeleton'

export default function CategorySection({ refreshing }) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { departmentId } = useLocationStore();

    useEffect(() => {
        if (departmentId) {
            fetchCategories();
        }
    }, [departmentId]);

    useEffect(() => {
        if (refreshing) {
            fetchCategories();
        }
    }, [refreshing]);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await empresasService.getCategoriesByCity(departmentId);
            setCategories(response);
        } catch (error) {
            console.error('Error fetching categories:', error);
            showToast(
                'No se pudieron cargar las categorías',
                Toast.positions.TOP,
                theme_colors.white,
                theme_colors.error
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <CategorySkeleton showSkeleton={true} />
        )
    }

    return (
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
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
                horizontal={true}
                scrollEnabled={true}
                data={categories}
                renderItem={({ item, index }) =>
                    <CategoryItem
                        item={{
                            id: item.id,
                            name: item.name,
                            icon: item.url,
                            categoryCode: item.id
                        }}
                        key={index}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}