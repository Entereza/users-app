import React from 'react'
import { StyleSheet } from 'react-native';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen';
import ListCompletedAddressed from '../../../components/AdressComponents/ListCompletedAddressed';
import useAddressStore from '../../../utils/tools/interface/addressStore';

export default function AddressSelectionScreen() {
    const { listAddresses } = useAddressStore()

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderInternalScreen title={"Ubicación"} />

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