import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import adjustFontSize from '../../utils/adjustText'
import { theme } from '../../utils/theme'
import { customStyles } from '../../utils/customStyles'

export default function BusinessItemWhastapp({
    wpp,
    width
}) {
    const [colorWp, setColorWp] = React.useState('#818181')
    const OpenWp = () => {
        Linking.openURL(wpp)
    }
    const SetColors = () => {
        if (wpp !== '') {
            setColorWp('#25D366')
        }
    }

    React.useEffect(() => {
        SetColors()
    })

    return (
        <ViewStyled
            width={29}
            height={5}
            style={{
                position: 'absolute',
                right: '0%',
                zIndex: 2,
                alignSelf: 'center',
                ...customStyles.shadowStyle
            }}
            borderRadius={3}
        >
            <TouchableOpacity
                disabled={colorWp === '#818181'}
                onPress={OpenWp}
                style={
                    [
                        customStyles.shadowStyle,
                        {
                            width: '100%',
                            height: '100%',
                            backgroundColor: theme.primary,
                            borderRadius: 20,

                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 2,
                        }
                    ]
                }
            >
                <ViewStyled
                    height={8.5 / 2}
                    width={8.5}
                    borderRadius={4}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        left: '-11%'
                    }}
                >
                    <Ionicons
                        name="logo-whatsapp"
                        size={adjustFontSize(20)}
                        color={colorWp}
                    />
                </ViewStyled>
                <TextStyled
                    fontSize={13}
                    color={colorWp}
                >
                    ¡Pide ya!
                </TextStyled>
            </TouchableOpacity>
        </ViewStyled>
    )
}