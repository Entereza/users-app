import * as React from 'react';
import { theme } from '../../utils/theme';
import ButtonAuthentication from '../Btn/ButtonAuthentication';
import { useNavigation } from '@react-navigation/native';

export default function ContinueEntereza({ onPress, shadow }) {
    return (
        <>
            <ButtonAuthentication
                shadow={false}
                title={"Continuar con Entereza"}
                onPress={onPress}
                backgroundColor={theme.dark}
                WithBorder={true}
                borderColor={theme.tertiary}
                colorText={theme.primary}
                image={require('./EnterezaLogo.png')}
                margin={false}
            />
        </>
    )
}