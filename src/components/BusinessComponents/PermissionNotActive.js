import React from 'react';
import { StyleSheet, Linking, Platform } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import ImageStyled from '../../utils/ui/ImageStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import SafeAreaStyled from '../SafeAreaComponents/SafeAreaStyled';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { locationService } from '../../services/location/locationService';
import useLocationStore from '../../utils/tools/interface/locationStore';
import { toastService } from '../../utils/tools/interface/toastService';

export default function PermissionNotActive() {
    const {
        isSearchingLocation,
        setLocation,
        setDepartment,
        setIsSearchingLocation,
        setCountry,
        setIsCountryEnabled,
        setIsDepartmentEnabled,
        setHasLocationPermissions
    } = useLocationStore();

    const handleOpenSettings = async () => {
        try {
            if (Platform.OS === 'ios') {
                await Linking.openURL('app-settings:');
            } else {
                await Linking.openSettings();
            }
        } catch (error) {
            console.error('Error opening settings:', error);
        }
    };

    const handleRefresh = async () => {
        try {
            setIsSearchingLocation(true);
            const hasPermission = await locationService.requestLocationPermission();

            if (!hasPermission) {
                setHasLocationPermissions(false);
                toastService.showWarningToast("Necesitamos acceso a tu ubicación para brindarte un mejor servicio");
                return;
            }
            setHasLocationPermissions(true);

            const location = await locationService.getCurrentLocation();

            setLocation(location.coords.latitude, location.coords.longitude);

            const locationInfo = await locationService.getDepartmentFromCoords(
                location.coords.latitude,
                location.coords.longitude
            );

            if (locationInfo) {
                setHasLocationPermissions(true);
                setCountry(locationInfo.country);

                if (!locationInfo.isBolivia) {
                    setIsCountryEnabled(false);
                    setIsDepartmentEnabled(false);
                    toastService.showWarningToast("La aplicación solo está disponible en Bolivia");
                    return;
                }

                setIsCountryEnabled(true);
                setDepartment(locationInfo.name, locationInfo.id);
                setIsDepartmentEnabled(locationInfo.isEnabled);

                if (!locationInfo.isEnabled) {
                    toastService.showWarningToast("Este departamento no está habilitado para el servicio");
                }
            }

            console.log('Location initialized:', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                locationInfo
            });
        } catch (error) {
            console.error('Error reinitializing location:', error);
            toastService.showErrorToast("No pudimos obtener tu ubicación. Por favor, verifica que el GPS esté activado.");
        } finally {
            setIsSearchingLocation(false);
        }
    }

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.container}
        >
            <ViewStyled
                width={90}
                height={60}
                backgroundColor={theme_colors.transparent}
                style={styles.contentContainer}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={styles.imageContainer}
                >
                    <ImageStyled
                        source={require('../../../assets/gifs/location.gif')}
                        style={styles.image}
                        borderRadius={1.5}
                    />
                </ViewStyled>

                <TextStyled
                    fontFamily='SFPro-Bold'
                    fontSize={theme_textStyles.large}
                    color={theme_colors.primary}
                    marginTop={3}
                >
                    Ubicación no disponible
                </TextStyled>

                <TextStyled
                    fontFamily='SFPro-Regular'
                    fontSize={theme_textStyles.small}
                    color={theme_colors.grey}
                    textAlign="center"
                    marginTop={1}
                    marginHorizontal={5}
                >
                    Necesitamos acceso a tu ubicación para mostrarte las empresas disponibles en tu zona.{'\n\n'}
                    Por favor, verifica que hayas concedido los permisos de ubicación y que tu GPS esté activado.
                </TextStyled>


                <ButtonWithIcon
                    disabled={isSearchingLocation}
                    withIcon={true}
                    iconName="settings"
                    sizeIcon={theme_textStyles.smedium}
                    MatIcons={true}
                    onPress={handleOpenSettings}
                    borderWidth={0}
                    backgroundColor={theme_colors.primary}
                    colorText={theme_colors.white}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.small}
                    width={90}
                    height={6}
                    fontFamily={'SFPro-Bold'}
                    textButton={'Abrir Ajustes'}
                    style={{
                        marginTop: 20
                    }}
                />

                <ButtonWithIcon
                    disabled={isSearchingLocation}
                    withIcon={isSearchingLocation ? false : true}
                    loading={isSearchingLocation}
                    iconName="refresh"
                    sizeIcon={theme_textStyles.smedium}
                    MatIcons={true}
                    onPress={handleRefresh}
                    borderWidth={1}
                    borderColor={theme_colors.primary}
                    backgroundColor={theme_colors.transparent}
                    colorText={theme_colors.primary}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.small}
                    width={90}
                    height={6}
                    fontFamily={'SFPro-Bold'}
                    textButton={isSearchingLocation ? 'Buscando...' : 'Reintentar'}
                    style={{
                        marginTop: 10
                    }}
                />
            </ViewStyled>
        </SafeAreaStyled>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.white,
        flex: 1,
    },
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: heightPercentageToDP(6.5)
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});