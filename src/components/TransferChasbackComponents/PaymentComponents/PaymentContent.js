import React, { useEffect, useState } from 'react'
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

export default function PaymentContent() {
  const { user } = useAuthStore();
  const [qrData, setQrData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

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
      const response = await qrService.createQR(params);
      setQrData({
        ...response,
        expirationDate: params.expirationDate,
        total: params.total
      });
      toastService.showSuccessToast("QR generado exitosamente");
    } catch (error) {
      console.error('Error generating QR:', error);
      toastService.showErrorToast("Error al generar el QR");
    } finally {
      setLoading(false);
    }
  };

  const shareQR = async () => {
    try {
      if (!qrData) return;

      // Create a temporary file path for the base64 image
      const base64Data = qrData.qr;
      const fileName = FileSystem.documentDirectory + "temp_qr.png";

      // Write base64 data to temporary file
      await FileSystem.writeAsStringAsync(fileName, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Share the temporary file
      await Sharing.shareAsync(fileName, {
        dialogTitle: 'Compartir Código QR',
        mimeType: 'image/png',
        UTI: 'public.png'
      });

      // Clean up temporary file
      await FileSystem.deleteAsync(fileName);

    } catch (error) {
      console.error('Error sharing QR:', error);
      toastService.showErrorToast("Error al compartir el QR");
    }
  };

  const saveQR = async () => {
    try {
      if (!qrData) return;

      // Solicitar permisos para acceder a la galería
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        toastService.showErrorToast("Se necesitan permisos para guardar en la galería");
        return;
      }

      // Crear un archivo temporal con la imagen base64
      const base64Data = qrData.qr;
      const fileName = FileSystem.documentDirectory + "temp_qr.png";

      // Escribir los datos base64 en el archivo temporal
      await FileSystem.writeAsStringAsync(fileName, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Guardar el archivo en la galería
      const asset = await MediaLibrary.createAssetAsync(fileName);

      const album = await MediaLibrary.getAlbumAsync('Entereza');
      if (album === null) {
        await MediaLibrary.createAlbumAsync('Entereza', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      // Eliminar el archivo temporal
      await FileSystem.deleteAsync(fileName);

      toastService.showSuccessToast("QR guardado exitosamente en la galería");
    } catch (error) {
      console.error('Error saving QR:', error);
      toastService.showErrorToast("Error al guardar el QR en la galería");
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
      <ViewStyled
        backgroundColor={theme_colors.transparent}
        style={{
          width: '95%',
          height: '60%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageStyled
          source={{ uri: `data:image/png;base64,${qrData.qr}` }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
          }}
        />
      </ViewStyled>

      <ViewStyled
        backgroundColor={theme_colors.transparent}
        marginTop={-4}
        style={{
          width: '95%',
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <PaymentInfo
          iconName={'hand-coin'}
          text={qrData.total > 0 ? 'Monto: Bs ' + qrData.total : 'Monto: Abierto'}
        />

        <PaymentInfo
          iconName={'calendar-outline'}
          text={'Válido hasta: ' + new Date(qrData.expirationDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        />
      </ViewStyled>

      <ViewStyled
        backgroundColor={theme_colors.transparent}
        marginTop={2}
        height={8}
        style={{
          width: '95%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          gap: 10
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
          height={5}
          fontFamily={'SFPro-Bold'}
          textButton={'Editar'}
          style={{ flex: 1 }}
        />

        <ButtonWithIcon
          withIcon={false}
          onPress={saveQR}
          borderWidth={0}
          backgroundColor={theme_colors.primary}
          colorText={theme_colors.white}
          borderRadius={1.5}
          fontSize={theme_textStyles.small}
          height={5}
          fontFamily={'SFPro-Bold'}
          textButton={'Guardar'}
          style={{ flex: 1 }}

        />

        <ButtonWithIcon
          withIcon={false}
          onPress={shareQR}
          borderWidth={0}
          backgroundColor={theme_colors.primary}
          colorText={theme_colors.white}
          borderRadius={1.5}
          fontSize={theme_textStyles.small}
          height={5}
          fontFamily={'SFPro-Bold'}
          textButton={'Compartir'}
          style={{ flex: 1 }}

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