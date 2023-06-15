import * as React from 'react';
import { theme } from '../../utils/theme';
import ButtonAuthentication from '../Btn/ButtonAuthentication';
import { useNavigation } from '@react-navigation/native';

export default function ContinueEntereza({ onPress, shadow }) {

    const navigation = useNavigation()

    const RedirectLogin = () => {
        navigation.navigate("LoginEnterezaScreen");
    }
    return (
        <>
            <ButtonAuthentication
                shadow={shadow}
                title={"Continuar con Entereza"}
                onPress={onPress}
                backgroundColor={theme.secondary}
                image={require('./EnterezaLogo.png')}
                colorText={theme.primary}
                margin={false}
            />
        </>
    )
}