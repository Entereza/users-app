import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';
import { theme_colors } from '../../../utils/theme/theme_colors';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import ButtonWithIcon from '../../../components/Buttons/ButtonWithIcon';
import HeaderTransferSuccess from '../../../components/Header/HeaderTransferSuccess';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { toastService } from '../../../utils/tools/interface/toastService';
import { LinearGradient } from 'expo-linear-gradient';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import adjustFontSize from '../../../utils/ui/adjustText';

export default function TransferSuccessScreen({ route }) {
    const navigation = useNavigation();
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();
    const isGoingBack = useRef(false);
    const receiptRef = useRef();

    // Get transfer details from route params
    const {
        refNumber = '000085752257',
        paymentTime = '25-02-2023, 13:22:16',
        paymentMethod = 'Bank Transfer',
        senderName = 'Antonio Roberto',
        amount = '120',
        paymentStatus = 'Success'
    } = route.params || {};

    useFocusEffect(
        useCallback(() => {
            const onBackPress = (e) => {
                if (!isGoingBack.current) {
                    isGoingBack.current = true;
                    e.preventDefault();
                    handleContinue();
                }
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
            };
        }, [navigation])
    );

    const saveReceipt = async () => {
        try {
            // Request gallery permissions
            const { status } = await MediaLibrary.requestPermissionsAsync();

            if (status !== 'granted') {
                toastService.showErrorToast("Se necesitan permisos para guardar en la galería");
                return;
            }

            // Capture the receipt view as an image
            const uri = await captureRef(receiptRef, {
                format: 'png',
                quality: 0.8,
            });

            // Save to gallery
            const asset = await MediaLibrary.createAssetAsync(uri);

            // Check if album exists, if not create it
            const album = await MediaLibrary.getAlbumAsync('Entereza');
            if (album === null) {
                await MediaLibrary.createAlbumAsync('Entereza', asset, false);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }

            toastService.showSuccessToast("Comprobante guardado en la galería");
        } catch (error) {
            console.error('Error saving receipt:', error);
            toastService.showErrorToast("Error al guardar el comprobante");
        }
    };

    const shareReceipt = async () => {
        try {
            if (!(await Sharing.isAvailableAsync())) {
                toastService.showErrorToast("El compartir no está disponible en este dispositivo");
                return;
            }

            // Capture the receipt view as an image
            const uri = await captureRef(receiptRef, {
                format: 'png',
                quality: 0.8,
            });

            // Share the image
            await Sharing.shareAsync(uri, {
                mimeType: 'image/png',
                dialogTitle: 'Compartir Comprobante'
            });
        } catch (error) {
            console.error('Error sharing receipt:', error);
            toastService.showErrorToast("Error al compartir el comprobante");
        }
    };


    const handleContinue = () => {
        navigation.navigate(private_name_routes.billetera.billeteraHome);
        changeColorStatusBar(theme_colors.white);
        toggleTabBar(true)
    };

    const DetailRow = ({ label, value, labelColor = '#878787', valueColor = theme_colors.dark }) => (
        <ViewStyled
            paddingVertical={0.8}
            backgroundColor={theme_colors.transparent}
            style={{
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <TextStyled
                color={labelColor}
                fontSize={theme_textStyles.small}
                fontFamily="SFPro-Regular"
            >
                {label}
            </TextStyled>
            <TextStyled
                color={valueColor}
                fontSize={theme_textStyles.small}
                fontFamily="SFPro-SemiBold"
            >
                {value}
            </TextStyled>
        </ViewStyled>
    );

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={100}
            style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <HeaderTransferSuccess
                onGoBack={handleContinue}
                title="Transferencia Exitosa"
                onSavePress={saveReceipt}
            />

            {/* Receipt View that will be captured */}
            <View
                ref={receiptRef}
                style={{
                    backgroundColor: theme_colors.white,
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                }}
            >
                <MaterialCommunityIcons
                    name={"check-circle"}
                    color={theme_colors.green}
                    size={adjustFontSize(15)}
                    style={{
                        alignSelf: 'center',
                    }}
                />

                <ViewStyled
                    width={90}
                    paddingVertical={2}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextStyled
                        color={theme_colors.green}
                        fontSize={theme_textStyles.large}
                        fontFamily="SFPro-Bold"
                        marginBottom={2}
                    >
                        ¡Pago Exitoso!
                    </TextStyled>
                    <TextStyled
                        color={theme_colors.dark}
                        fontSize={theme_textStyles.xlarge}
                        fontFamily="SFPro-Bold"
                    >
                        Bs. {amount}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={90}
                    borderRadius={2}
                    paddingVertical={2}
                    paddingHorizontal={2}
                    backgroundColor={'#f6f7fb'}
                    style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}
                >
                    <TextStyled
                        textAlign='center'
                        color={theme_colors.black}
                        fontSize={theme_textStyles.medium}
                        fontFamily="SFPro-Bold"
                        marginBottom={3}
                        style={{
                            width: '90%',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: theme_colors.white,
                            borderRadius: 15,
                            marginBottom: 15,
                        }}
                    >
                        Detalles del Pago
                    </TextStyled>

                    <DetailRow label="Referencia" value={refNumber} />
                    <DetailRow label="Fecha de Pago" value={paymentTime} />
                    <DetailRow label="Método de Pago" value={paymentMethod} valueColor={theme_colors.primary} />
                    <DetailRow label="Nombre del Remitente" value={senderName} />
                    <DetailRow label="Monto" value={`Bs. ${amount}`} />
                    <DetailRow label="Estado del Pago" value={paymentStatus} valueColor={theme_colors.success} />
                </ViewStyled>
            </View>

            <ViewStyled
                width={90}
                backgroundColor={theme_colors.transparent}
                paddingBottom={2}
                style={{
                    marginTop: 'auto',
                    gap: 10,
                }}
            >
                <ButtonWithIcon
                    withIcon={true}
                    iconName="share-variant"
                    MaterialIcons
                    onPress={shareReceipt}
                    sizeIcon={theme_textStyles.xlarge}
                    borderWidth={1}
                    borderColor={theme_colors.borderText}
                    backgroundColor={theme_colors.transparent}
                    colorText={theme_colors.black}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.smedium}
                    fontFamily="SFPro-Bold"
                    textButton="Compartir Comprobante"
                    width={90}
                />

                <ButtonWithIcon
                    withIcon={false}
                    onPress={handleContinue}
                    borderWidth={0}
                    backgroundColor={theme_colors.primary}
                    colorText={theme_colors.white}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.smedium}
                    fontFamily="SFPro-Bold"
                    textButton="Volver al Inicio"
                    width={90}
                />
            </ViewStyled>
        </ViewStyled>
    );
} 