import { useState, useEffect } from 'react'
import { Platform, Linking } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ImageStyled from '../../../utils/ui/ImageStyled'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'
import AlertStyled from '../../../utils/ui/AlertStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import { Camera, CameraView } from 'expo-camera'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

export default function PayQrImage({
    selectedImage,
    setSelectedImage,
    isLoadingData,
    setIsLoadingData
}) {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
        showCancelButton: true
    });
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status !== 'granted') {
                handleDeniedCameraPermission();
            }
        })();
    }, []);

    useEffect(() => {
        openCamera();
    }, []);

    const handleCloseAlert = () => {
        setShowAlert(false)
    }

    const openSettings = async () => {
        try {
            if (Platform.OS === 'ios') {
                await Linking.openURL('app-settings:');
            } else {
                await Linking.openSettings();
            }
        } catch (e) {
            console.error('Failed to open app settings.', e);
        }
    };

    const handleDeniedPermission = () => {
        setShowAlert(true)
        setAlertText({
            title: 'Permiso Denegado',
            message: 'Entereza necesita acceso a tu galería para usar esta función.',
            type: 'error',
            showCancelButton: true
        });
    };

    const handleDeniedCameraPermission = () => {
        setShowAlert(true)
        setAlertText({
            title: 'Permiso Denegado',
            message: 'Entereza necesita acceso a tu cámara para usar esta función.',
            type: 'error',
            showCancelButton: true
        });
    };

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            if (!permissionResult.canAskAgain) {
                handleDeniedCameraPermission();
            }
            console.log('Permissions for camera not granted.');
            return;
        }

        // let result = await ImagePicker.launchCameraAsync({
        //     aspect: [5, 5],
        //     allowsEditing: true,
        //     quality: 1,
        // });

        // if (!result.canceled) {
        //     const imageUri = result.assets[0].uri;
        //     setSelectedImage(imageUri);
        //     setIsLoadingData(true);
        // } else {
        //     console.log('Camera was canceled');
        // }
    };

    const openGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            if (!permissionResult.canAskAgain) {
                handleDeniedPermission();
            }
            console.log('Permissions for media library not granted.');
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [5, 5],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setSelectedImage(imageUri)
            setIsLoadingData(true)
        } else {
            console.log('Image picker was canceled');
        }
    };


    // Funcion para leer el QR
    const handleBarcodeScanned = (data) => {
        console.log('Barcode scanned:', data);
    };

    return (
        <>
            {
                showAlert &&
                <AlertStyled
                    widthModal={90}
                    heightModal={30}
                    title={alertText.title}
                    message={alertText.message}
                    type={alertText.type}
                    onConfirmPressed={openSettings}
                    onCancelPressed={handleCloseAlert}
                    textCancelButton={'Cancelar'}
                    showCloseButton={false}
                    showCancelButton={alertText.showCancelButton}
                    widthConfirm={'55%'}
                />
            }

            <ViewStyled
                width={100}
                paddingTop={2}
                backgroundColor={theme_colors.transparent}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.danger}
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {selectedImage ? (
                        <ImageStyled
                            source={{ uri: selectedImage }}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    ) : hasPermission ? (
                        <CameraView
                            barcodeScannerSettings={{
                                barcodeTypes: ["qr"],
                            }}
                            onBarcodeScanned={handleBarcodeScanned}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    ) : (
                        <ImageStyled
                            source={require('../../../../assets/images/ImageCamera.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    )}
                </ViewStyled>

                <ViewStyled
                    width={100}
                    height={8}
                    borderRadius={3}
                    backgroundColor={theme_colors.white}
                    style={{
                        marginTop: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',

                        shadowColor: theme_colors.black,
                        elevation: 15,
                    }}
                >
                    <ButtonWithIcon
                        withIcon={false}

                        onPress={openGallery}
                        borderWidth={1}
                        borderColor={theme_colors.white}
                        backgroundColor={theme_colors.primary}
                        colorText={theme_colors.white}
                        borderRadius={1.5}
                        fontSize={theme_textStyles.smedium}
                        fontFamily={'SFPro-Bold'}
                        disabled={isLoadingData}
                        loading={isLoadingData}
                        textButton={!isLoadingData ? 'Abrir QR desde galería' : 'Cargando datos...'}
                        style={{
                            width: '90%',
                            height: '70%',
                        }}
                    />
                </ViewStyled>
            </ViewStyled>
        </>
    )
}