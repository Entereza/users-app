import React from 'react'
import { StyleSheet } from 'react-native';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen';
import ListCompletedAddressed from '../../../components/AdressComponents/ListCompletedAddressed';
import useAddressStore from '../../../utils/tools/interface/addressStore';
import { useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';

export default function AddressSelectionScreen({ route }) {
    const { internScreen } = route.params || false
    const { listAddresses } = useAddressStore()

    const navigation = useNavigation();
    const { toggleTabBar } = useTabBarStore();

    const goBack = () => {
        if (!internScreen) {
            toggleTabBar(true)
        }
        navigation.goBack();
    };

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderInternalScreen title={"Ubicación"} onPress={goBack} />

            <ListCompletedAddressed listAddresses={listAddresses} />
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