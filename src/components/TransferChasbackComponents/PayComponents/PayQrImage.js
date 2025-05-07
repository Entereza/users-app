import { useState, useEffect } from 'react'
import { Platform, Linking, View, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ImageStyled from '../../../utils/ui/ImageStyled'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'
import AlertStyled from '../../../utils/ui/AlertStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import { Camera, CameraView } from 'expo-camera'
import Toast from 'react-native-root-toast'
import { qrService } from '../../../services/api/transfers/qrService'

export default function PayQrImage({
    selectedImage,
    setSelectedImage,
    isLoadingData,
    setIsLoadingData,
    setQrData,
    setShowDataQr
}) {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
        showCancelButton: true
    });
    const [hasPermission, setHasPermission] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setSelectedImage(imageUri);
            setIsLoadingData(true);

            console.log('imageUri: ', imageUri)

            try {
                const qrData = await Camera.scanFromURLAsync(imageUri);
                console.log('qrData: ', qrData)

                if (qrData && qrData.length > 0) {
                    await handleBarcodeScanned({ data: qrData[0].data });
                } else {
                    showToast(
                        'No se detectó ningún código QR en la imagen',
                        Toast.positions.BOTTOM,
                        theme_colors.white,
                        theme_colors.primary
                    );
                    setSelectedImage(null);
                }
            } catch (error) {
                console.error('Error scanning QR from image:', error);
                showToast(
                    'Error al procesar la imagen QR',
                    Toast.positions.BOTTOM,
                    theme_colors.white,
                    theme_colors.primary
                );
                setSelectedImage(null);
            } finally {
                setIsLoadingData(false);
            }
        } else {
            console.log('Image picker was canceled');
        }
    };

    const showToast = (message, position, backgroundColor, textColor) => {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: position,
            backgroundColor: backgroundColor,
            textColor: textColor,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    };

    const extractQrId = (data) => {
        try {
            console.log('raw data extractQrId: ', data)
            const idMatch = data.split('|')[0].trim().replace('ID: ', '');
            return idMatch || null;
        } catch (error) {
            console.error('Error extracting QR ID:', error);
            return null;
        }
    };

    const handleBarcodeScanned = async ({ data }) => {
        console.log('handleBarcodeScanned: ', data);

        if (!data) {
            showToast(
                'QR no contiene datos',
                Toast.positions.BOTTOM,
                theme_colors.white,
                theme_colors.primary
            );
            return;
        }

        const qrId = extractQrId(data);
        console.log('Extracted QR ID:', qrId);

        if (!qrId) {
            showToast(
                'QR inválido o con formato incorrecto',
                Toast.positions.BOTTOM,
                theme_colors.white,
                theme_colors.primary
            );
            return;
        }

        setIsScanning(true);
        try {
            console.log('Fetching QR data for ID:', qrId);
            const qrData = await qrService.fetchQrData(qrId);
            console.log('QR data received:', qrData);
            setQrData(qrData);
            setShowDataQr(true);
        } catch (error) {
            console.error('Error fetching QR data:', error);
            showToast(
                'Error al obtener datos del QR',
                Toast.positions.BOTTOM,
                theme_colors.white,
                theme_colors.primary
            );
        } finally {
            setIsScanning(false);
        }
    };

    const ScannerFrame = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    width: '80%',
                    height: '60%',
                    borderWidth: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 10,
                }}
            >
                {/* Fila superior */}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Esquina superior izquierda */}
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderTopWidth: 4,
                            borderLeftWidth: 4,
                            borderColor: theme_colors.white,
                        }}
                    />
                    {/* Esquina superior derecha */}
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderTopWidth: 4,
                            borderRightWidth: 4,
                            borderColor: theme_colors.white,
                        }}
                    />
                </View>

                {/* Fila inferior */}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Esquina inferior izquierda */}
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderBottomWidth: 4,
                            borderLeftWidth: 4,
                            borderColor: theme_colors.white,
                        }}
                    />
                    {/* Esquina inferior derecha */}
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderBottomWidth: 4,
                            borderRightWidth: 4,
                            borderColor: theme_colors.white,
                        }}
                    />
                </View>
            </View>
        );
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
                {isScanning ? (
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flex: 1,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator size="large" color={theme_colors.primary} />
                    </ViewStyled>
                ) : (
                    <>
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
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
                                <>
                                    <CameraView
                                        barcodeScannerSettings={{
                                            barcodeTypes: ["qr"],
                                        }}
                                        onBarcodeScanned={handleBarcodeScanned}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                        }}
                                    />
                                    <ScannerFrame />
                                </>
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
                    </>
                )}
            </ViewStyled>
        </>
    )
}