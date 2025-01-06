import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ImageStyled from '../../../utils/ui/ImageStyled'
import PaymentInfo from './PaymentInfo'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function PaymentContent() {
  const nameUser = 'Adrián Torrico Ortega'
  const numberCard = '927439'

  const shareQrInfo = async () => {
    try {
      const asset = Asset.fromModule(require('../../../../assets/images/ImageQrCode.png'));
      await asset.downloadAsync();

      const localImageUri = asset.localUri || asset.uri;

      const additionalData = `Nombre: ${nameUser}\nNro. Tarjeta: ${numberCard}`;

      await Sharing.shareAsync(localImageUri, {
        dialogTitle: 'Compartir Código QR',
        mimeType: 'image/png',
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  return (
    <ViewStyled
      width={95}
      marginTop={5}
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
          width: '75%',
          height: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageStyled
          source={require('../../../../assets/images/ImageQrCode.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </ViewStyled>

      <ViewStyled
        backgroundColor={theme_colors.transparent}
        marginTop={2}
        height={8}
        style={{
          width: '95%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PaymentInfo
          iconName={'account'}
          text={nameUser}
        />

        <PaymentInfo
          iconName={'card-account-details'}
          text={numberCard}
        />
      </ViewStyled>

      <ButtonWithIcon
        withIcon={false}

        onPress={shareQrInfo}
        borderWidth={1}
        borderColor={theme_colors.white}
        backgroundColor={theme_colors.primary}
        colorText={theme_colors.white}
        borderRadius={1.5}
        fontSize={theme_textStyles.medium}
        height={6}
        fontFamily={'SFPro-Bold'}
        textButton={'Compartir'}
        style={{
          width: '90%',
          marginTop: 20,
          marginBottom: 10
        }}
      />
    </ViewStyled>
  )
}