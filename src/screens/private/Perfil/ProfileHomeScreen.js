import React, { useCallback, useRef } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import InfoProfileUser from '../../../components/ProfileComponents/InfoProfileUser'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import { private_name_routes } from '../../../utils/route/private_name_routes'
import useAuthStore from '../../../utils/tools/interface/authStore'

export default function ProfileHomeScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, nameRouteBack } = useTabBarStore();

    const goBack = () => {
        toggleTabBar(true);
        if (nameRouteBack === private_name_routes.billetera.billeteraHome) {
            navigation.navigate(nameRouteBack);
        } else if (nameRouteBack === private_name_routes.empresas.empresasHome) {
            navigation.navigate(nameRouteBack);
        } else {
            navigation.goBack()
        }
    };

    const isGoingBack = useRef(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = (e) => {
                if (!isGoingBack.current) {
                    isGoingBack.current = true;
                    e.preventDefault();
                    goBack();
                }
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
            };
        }, [navigation])
    );

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={100}
            style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <HeaderDefaultScreen title={"Mi Perfil"} onPress={goBack} />

            <InfoProfileUser />
        </ViewStyled>
    )
}