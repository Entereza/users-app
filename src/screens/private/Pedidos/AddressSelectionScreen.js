import React, { useEffect, useRef } from 'react'
import { BackHandler, StyleSheet } from 'react-native';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen';
import ListCompletedAddressed from '../../../components/AdressComponents/ListCompletedAddressed';
import useAddressStore from '../../../utils/tools/interface/addressStore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import { locationsService } from '../../../services/api/empresas/locationsService';
import useAuthStore from '../../../utils/tools/interface/authStore';
import Toast from 'react-native-root-toast';
import { showToast } from '../../../utils/tools/toast/toastService';
import adjustFontSize from '../../../utils/ui/adjustText';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import useLocationStore from '../../../utils/tools/interface/locationStore';
import { private_name_routes } from '../../../utils/route/private_name_routes';

export default function AddressSelectionScreen({ route }) {
    const { internScreen, canDoActions } = route.params || false;

    const { listAddresses, setListAddresses, setIsLoadingAddresses, isLoadingAddresses, selectedAddress } = useAddressStore();
    const { user } = useAuthStore();
    const navigation = useNavigation();
    const { toggleTabBar } = useTabBarStore();
    const { setLocation } = useLocationStore();

    useEffect(() => {
        fetchLocations();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchLocations();
        }, [])
    );

    const handleMessage = (message, position = Toast.positions.CENTER, textColor = theme_colors.white, backgroundColor = theme_colors.primary, duration = Toast.durations.SHORT) => {
        Toast.show(message, {
            duration: duration,
            position: position,
            backgroundColor: backgroundColor,
            textColor: textColor,
            shadow: true,
            shadowColor: theme_colors.black,
            opacity: 1,
            containerStyle: {
                width: "auto",
                height: "auto",
                paddingVertical: 15,
                paddingHorizontal: 18,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
            },
            textStyle: {
                fontFamily: "SFPro-SemiBold",
                fontSize: adjustFontSize(theme_textStyles.smaller + .5),
            },
        });
    };

    const fetchLocations = async () => {
        try {
            setIsLoadingAddresses(true);
            const response = await locationsService.getClientLocations(user.id);
            const locations = response.map(location => ({
                id: location.id,
                nameAddress: location.placeName,
                referencesAddress: location.references,
                lat: location.lat,
                lng: location.lng
            }));
            setListAddresses(locations);
        } catch (error) {
            console.error('Error fetching locations:', error);
            handleMessage('No se pudo obtener las ubicaciones', Toast.positions.TOP + 30, theme_colors.white, theme_colors.danger);
        } finally {
            setIsLoadingAddresses(false);
        }
    };

    const handleAddressSelection = (address) => {
        setLocation(address.lat, address.lng);
    };

    const goBack = () => {
        if (!internScreen) {
            toggleTabBar(true);
        }
        navigation.goBack();
    };

    const goToHomeScreen = () => {
        toggleTabBar(true);
        navigation.navigate(private_name_routes.billetera.billeteraHome);
    };
    
    useFocusEffect(
        React.useCallback(() => {
            toggleTabBar(false);
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (selectedAddress) {
                    goBack();
                } else {
                    goToHomeScreen();
                }
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [selectedAddress])
    );

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderInternalScreen title={"Ubicación"} onPress={selectedAddress ? goBack : goToHomeScreen} />

            <ListCompletedAddressed
                goBack={goBack}
                listAddresses={listAddresses}
                isLoading={isLoadingAddresses}
                onRefresh={fetchLocations}
                onAddressSelected={handleAddressSelection}
                canDoActions={canDoActions}
            />
        </SafeAreaStyled>
    );
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