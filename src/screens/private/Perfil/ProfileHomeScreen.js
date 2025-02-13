import React, { useCallback, useRef } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import InfoProfileUser from '../../../components/ProfileComponents/InfoProfileUser'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'

export default function ProfileHomeScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, nameStackBack, nameRouteBack } = useTabBarStore();

    const goBack = () => {
        toggleTabBar(true);
        if (nameStackBack !== "" && nameRouteBack !== "") {
            navigation.navigate(nameStackBack, { screen: nameRouteBack })
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