import React, { useState, useEffect } from 'react'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import adjustFontSize from '../../../utils/ui/adjustText'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import { ActivityIndicator, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import ButtonWithIcon from '../../../components/Buttons/ButtonWithIcon'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import AddInfoAddressModal from '../../../components/Modals/AddInfoAddressModal'
import Toast from 'react-native-root-toast'
import { showToast } from '../../../utils/tools/toast/toastService'

export default function EditAddressScreen({ route }) {
    const { location } = route.params;
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();
    const { changeColorStatusBar } = useTabBarStore();

    const goBack = () => {
        changeColorStatusBar(theme_colors.white);
        navigation.goBack();
    };

    const mapRef = React.useRef();
    const [isSearchingDataLocation, setIsSearchingDataLocation] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [userLocation, setUserLocation] = useState({
        latitude: location.lat,
        longitude: location.lng,
        currentPosition: true
    });
    const [initialRegion, setInitialRegion] = useState({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
    });

    const goToInitialLocation = () => {
        setIsDragging(true);
        mapRef.current.animateToRegion({
            ...initialRegion,
            animated: true,
        });
    };

    const onRegionChangeComplete = async (region) => {
        setIsDragging(false);
        setUserLocation({
            latitude: region.latitude,
            longitude: region.longitude,
            currentPosition: true
        });
    };

    const onPanDrag = () => {
        setIsDragging(true);
    };

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
        changeColorStatusBar(theme_colors.transparent);
    };

    return (
        <>
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    height: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    mapType='standard'
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                    }}
                    loadingEnabled={true}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    initialRegion={initialRegion}
                    onPanDrag={onPanDrag}
                    onRegionChangeComplete={onRegionChangeComplete}
                />

                <ViewStyled
                    width={50}
                    height={13.5}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        top: '37.8%',
                        left: '25.1%',
                        position: 'absolute',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    pointerEvents="none"
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons
                            name={'location-pin'}
                            size={adjustFontSize(16)}
                            color={theme_colors.primary}
                        />
                    </ViewStyled>
                </ViewStyled>

                {!isDragging && (
                    <>
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
                                width={11}
                                height={5.5}
                                borderRadius={50}
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

                        <ViewStyled
                            backgroundColor={theme_colors.primary}
                            borderRadius={'50%'}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                right: 20,
                                bottom: 90,
                                maxWidth: 40,
                                maxHeight: 40,
                                elevation: 3,
                                shadowColor: theme_colors.black
                            }}
                        >
                            <Pressable
                                onPress={goToInitialLocation}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    padding: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialCommunityIcons
                                    name={'crosshairs-gps'}
                                    size={adjustFontSize(theme_textStyles.medium)}
                                    color={theme_colors.white}
                                />
                            </Pressable>
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            width={100}
                            height={8}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: 10,
                            }}
                        >
                            <ButtonWithIcon
                                disabled={isSearchingDataLocation}
                                textButton={'Actualizar Ubicación'}
                                borderRadius={1.5}
                                backgroundColor={isSearchingDataLocation ? `${theme_colors.grey}22` : theme_colors.primary}
                                fontSize={theme_textStyles.medium}
                                width={80}
                                height={6}
                                borderWidth={0}
                                colorText={theme_colors.white}
                                onPress={() => {
                                    changeColorStatusBar(theme_colors.backgroundModal);
                                    setOpenModal(true);
                                }}
                                withIcon={false}
                                fontFamily='SFPro-Bold'
                                styleText={{
                                    marginBottom: 2
                                }}
                            />
                        </ViewStyled>
                    </>
                )}
            </ViewStyled>

            <AddInfoAddressModal
                open={openModal}
                handleCloseModal={handleCloseModal}
                goBackNavigation={goBack}
                dataLocation={userLocation}
                initialData={location}
                isEditing={true}
            />
        </>
    );
}
