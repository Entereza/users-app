import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import CircularCodeComponent from './CircularCodeComponent'
import InfoCodeComponent from './InfoCodeComponent'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'

export default function ContentCodeEnterezaScreen({ onPress }) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={100}
            height={90}
            style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <CircularCodeComponent />

            <InfoCodeComponent />

            <ButtonWithIcon
                withIcon={false}

                onPress={onPress}
                borderWidth={1}
                borderColor={theme_colors.white}
                backgroundColor={theme_colors.transparent}
                colorText={theme_colors.white}
                borderRadius={1.5}
                fontSize={8}
                height={6}
                fontFamily={'SFPro-Bold'}
                textButton={'Entendido'}
                style={{
                    width: '90%',
                    marginTop: 'auto',
                    marginBottom: 10
                }}
            />
        </ViewStyled>
    )
}