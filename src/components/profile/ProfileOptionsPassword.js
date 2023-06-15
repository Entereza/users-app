import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

import { theme } from '../../utils/theme'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled'
import adjustFontSize from '../../utils/adjustText';

export default function ProfileOptionsPassword({
    children,
    title,
    titleBold,
    nextScreen = false,
    entereza = false,
    ...rest
}) {
    const [mostrar, setMostrar] = React.useState('none')

    React.useEffect(() => {
        console.log('EnterezaCreatedAccount: ', entereza)
        if (entereza !== false) {
            setMostrar('flex')
        }
    }, [entereza])
    return (
        <TouchableWithoutFeedback
            {
            ...rest
            }
        >
            <ViewStyled
                backgroundColor={theme.transparent}
                height={7}
                width={90}
                marginLeftAuto
                marginRightAuto
                marginBottom={1}
                style={{
                    display: mostrar,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}

            >
                {
                    children
                }
                <TextStyled
                    color={theme.quaternary}
                    fontSize={14}
                >
                    {
                        title
                    }
                </TextStyled>
                {
                    nextScreen
                    && (
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={adjustFontSize(24)}
                            color={theme.tertiary}
                            style={{
                                marginLeft: "auto",
                            }}
                        />
                    )
                }
            </ViewStyled>
        </TouchableWithoutFeedback>
    )
}