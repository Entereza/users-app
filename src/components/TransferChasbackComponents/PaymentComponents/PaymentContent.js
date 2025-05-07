import React, { useEffect, useState, useRef } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ImageStyled from '../../../utils/ui/ImageStyled'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'
import * as Sharing from 'expo-sharing';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import { qrService } from '../../../services/api/transfers/qrService'
import useAuthStore from '../../../utils/tools/interface/authStore'
import { toastService } from '../../../utils/tools/interface/toastService'
import QREditModal from './QREditModal'
import PaymentInfo from './PaymentInfo'
import QrSkeleton from '../../Skeletons/QrSkeleton'
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { private_name_routes } from '../../../utils/route/private_name_routes'
import { useNavigation } from '@react-navigation/native';
import TextStyled from '../../../utils/ui/TextStyled'
import { captureRef } from 'react-native-view-shot';
import { View } from 'react-native';

export default function PaymentContent() {
  const { user } = useAuthStore();
  const [qrData, setQrData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const qrRef = useRef();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const defaultParams = {
    number: 0,
    unique: false,
    total: 0,
    idClient: user.id,
    expirationDate: formatDate(new Date(Date.now() + 86400000))
  };

  useEffect(() => {
    generateQR(defaultParams);
  }, []);

  const generateQR = async (params) => {
    try {
      setLoading(true);
      console.log('generateQR params: ', params)
      const response = await qrService.createQR(params);
      console.log('generateQR: ', response)
      setQrData({
        ...response,
        ...params
      });
    } catch (error) {
      console.error('Error generating QR:', error);
      toastService.showErrorToast("Error al generar el QR");
    } finally {
      setLoading(false);
    }
  };

  const saveQR = async () => {
    try {
      if (!qrData) return;

      // Request gallery permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        toastService.showErrorToast("Se necesitan permisos para guardar en la galería");
        return;
      }

      // Capture the QR view as an image
      const uri = await captureRef(qrRef, {
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

      toastService.showSuccessToast("QR guardado exitosamente en la galería");
    } catch (error) {
      console.error('Error saving QR:', error);
      toastService.showErrorToast("Error al guardar el QR en la galería");
    }
  };

  const shareQR = async () => {
    try {
      if (!qrData) return;

      // Capture the QR view as an image
      const uri = await captureRef(qrRef, {
        format: 'png',
        quality: 0.8,
      });

      // Share the image
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Compartir Código QR'
      });

    } catch (error) {
      console.error('Error sharing QR:', error);
      toastService.showErrorToast("Error al compartir el QR");
    }
  };

  if (loading) {
    return <QrSkeleton />
  }

  return (
    <ViewStyled
      width={95}
      backgroundColor={theme_colors.transparent}
      style={{
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* QR Container that will be captured */}
      <View
        ref={qrRef}
        style={{
          marginTop: 20,
          paddingBottom: 20,
          width: '95%',
          backgroundColor: theme_colors.white,
          borderRadius: 15,
          alignItems: 'center',
          borderWidth: 0.4,
          borderColor: theme_colors.greyLine,
        }}
      >
        {/* Header with Logo */}
        <ViewStyled
          backgroundColor={theme_colors.primary}
          style={{
            width: '100%',
            padding: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <TextStyled
            color={theme_colors.white}
            fontSize={theme_textStyles.medium}
            fontFamily="SFPro-Bold"
            textAlign="center"
          >
            ENTEREZA S.R.L.
          </TextStyled>
        </ViewStyled>

        {/* QR Image */}
        <ViewStyled
          backgroundColor={theme_colors.transparent}
          style={{
            width: '80%',
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {qrData && (
            <ImageStyled
              source={{ uri: `data:image/png;base64,${qrData.qr}` }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover'
              }}
            />
          )}
        </ViewStyled>

        {/* Amount and Expiration */}
        <ViewStyled
          backgroundColor={theme_colors.transparent}
          marginTop={-3}
          style={{
            width: '100%',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <PaymentInfo
            iconName={'hand-coin'}
            text={qrData.total > 0 ? 'Monto: Bs ' + qrData.total : 'Monto: Abierto'}
            textAlign={'center'}
          />

          <PaymentInfo
            iconName={'account-outline'}
            text={user?.names + ' ' + user?.lastNames || 'Usuario'}
            textAlign={'center'}
          />

          <PaymentInfo
            iconName={'comment-quote-outline'}
            text={qrData.reference || 'Sin referencia'}
            textAlign={'center'}
          />

          <PaymentInfo
            iconName={'calendar-outline'}
            text={'Válido hasta: ' + new Date(qrData.expirationDate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            textAlign={'center'}
          />
        </ViewStyled>
      </View>

      {/* Buttons */}
      <ViewStyled
        backgroundColor={theme_colors.transparent}
        marginTop={2}
        style={{
          width: '95%',
          gap: 10,
        }}
      >
        <ButtonWithIcon
          withIcon={false}
          onPress={() => setShowEditModal(true)}
          borderWidth={1}
          borderColor={theme_colors.primary}
          backgroundColor={theme_colors.white}
          colorText={theme_colors.primary}
          borderRadius={1.5}
          fontSize={theme_textStyles.small}
          width={90}
          height={5}
          fontFamily={'SFPro-Bold'}
          textButton={'Editar'}
        />

        <ButtonWithIcon
          withIcon={true}
          MatIcons={true}
          iconName={'save-alt'}
          sizeIcon={theme_textStyles.smedium}
          onPress={saveQR}
          borderWidth={0}
          backgroundColor={theme_colors.primary}
          colorText={theme_colors.white}
          borderRadius={1.5}
          fontSize={theme_textStyles.small}
          height={5}
          width={90}
          fontFamily={'SFPro-Bold'}
          textButton={'Guardar en galería'}
        />

        <ButtonWithIcon
          withIcon={true}
          iconName={'share-variant'}
          MaterialIcons={true}
          sizeIcon={theme_textStyles.smedium}
          onPress={shareQR}
          borderWidth={0}
          backgroundColor={theme_colors.primary}
          colorText={theme_colors.white}
          borderRadius={1.5}
          fontSize={theme_textStyles.small}
          height={5}
          width={90}
          fontFamily={'SFPro-Bold'}
          textButton={'Compartir'}
        />
      </ViewStyled>

      {showEditModal && (
        <QREditModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={generateQR}
          currentQRData={qrData}
        />
      )}
    </ViewStyled>
  )
}