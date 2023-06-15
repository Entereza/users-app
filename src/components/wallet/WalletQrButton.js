import React from 'react'
import { Pressable } from 'react-native'

// LIBRARIES 
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { theme } from '../../utils/theme'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled'
import { __uiOpenQrMode } from '../../redux/actions/uiActions';
import { customStyles } from '../../utils/customStyles';
import adjustFontSize from '../../utils/adjustText';

export default function WalletQrButton() {

    const dispatch = useDispatch()

    const handleQrMode = () => {
        dispatch(__uiOpenQrMode())
    }

  return (
    <Pressable
        onPress={handleQrMode}
    >
        <ViewStyled
            width={25}
            height={25/2}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                ...customStyles.shadowStyle
            }}
            marginHorizontal={4}
            borderRadius={2}
        >
            <AntDesign name="qrcode" size={adjustFontSize(32)} color={ theme.secondary } />
            <TextStyled
                textAlign='center'
                fontSize={12}
                                        fontFamily='BRFirmaBold'
                        fontWeight='bold'
                numberOfLines={2}
                color={ theme.quaternary }
                style={{
                    marginTop: adjustFontSize(5),
                    width: "70%",
                }}
            >
                Escanear QR
            </TextStyled>
        </ViewStyled>
    </Pressable>
  )
}