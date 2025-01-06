import React from 'react'
import { StyleSheet } from 'react-native'
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen'
import SearchBar from '../../../components/BusinessComponents/SearchBar'
import useAuthStore from '../../../utils/tools/interface/authStore'
import ListBusinesses from '../../../components/BusinessComponents/CategoriesComponents/ListBusinesses'
import { businesses } from '../../../utils/tools/storage/data'

export default function EmpresasCategory({ route }) {
    const { category } = route.params
    const { user } = useAuthStore()

    const businessesCategory = businesses.filter(business => business.category === category.name)

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderInternalScreen title={category?.name || "Categoría"} />

            <SearchBar placeHolderActive={`¿Qué empresa o producto buscas ${user.names.split(' ')[0]}?`} active={true} onPress={null} />

            <ListBusinesses businesses={businessesCategory} nameCategory={category?.name} />
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