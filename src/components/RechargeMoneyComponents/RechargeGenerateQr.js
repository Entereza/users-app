import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import ImageStyled from '../../utils/ui/ImageStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import RechargeIconText from './RechargeIconText'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import { Asset } from 'expo-asset'
import * as Sharing from 'expo-sharing';
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function RechargeGenerateQr({
  ammountSelected,
}) {
  const nameUser = 'Adrián Torrico Ortega'
  const numberCard = '927439'

  const shareQrInfo = async () => {
    try {
      const asset = Asset.fromModule(require('../../../assets/images/ImageQrCode.png'));
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
          width: '80%',
          height: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageStyled
          source={require('../../../assets/images/ImageQrCode.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </ViewStyled>

      <ViewStyled
        marginTop={2}
        backgroundColor={theme_colors.transparent}
        style={{
          width: '95%',
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RechargeIconText
          iconName={'wallet'}
          primaryText={"Monto solicitado: "}
          secondaryText={`BOB. ${ammountSelected}`}
          style={{
            marginBottom: 5
          }}
        />

        <RechargeIconText
          iconName={'credit-card'}
          primaryText={"Pagar a: "}
          secondaryText={`Entereza S.R.L.`}
        />
      </ViewStyled>

      <ButtonWithIcon
        withIcon={false}

        onPress={null}
        borderWidth={1}
        borderColor={theme_colors.white}
        backgroundColor={theme_colors.primary}
        colorText={theme_colors.white}
        borderRadius={1.5}
        fontSize={theme_textStyles.medium}
        height={6}
        fontFamily={'SFPro-Bold'}
        textButton={'Guardar en galería'}
        style={{
          width: '95%',
          marginTop: 30,
        }}
      />

      <ButtonWithIcon
        withIcon={false}

        onPress={shareQrInfo}
        borderWidth={1}
        borderColor={theme_colors.primary}
        backgroundColor={theme_colors.transparent}
        colorText={theme_colors.primary}
        borderRadius={1.5}
        fontSize={theme_textStyles.medium}
        height={6}
        fontFamily={'SFPro-Bold'}
        textButton={'Compartir'}
        style={{
          width: '95%',
          marginTop: 10,
        }}
      />
    </ViewStyled>
  )
}