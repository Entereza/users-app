import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { useNavigation } from '@react-navigation/native';
import SendAddressCard from './SendAddressCard';
import { private_name_routes } from '../../utils/route/private_name_routes';
import useAddressStore from '../../utils/tools/interface/addressStore';
import useTabBarStore from '../../utils/tools/interface/tabBarStore';

export default function LocationCard() {
    const navigation = useNavigation();
    const { selectedAddress } = useAddressStore();
    const { toggleTabBar } = useTabBarStore();

    const goToChangeAddress = () => {
        toggleTabBar(false)
        navigation.navigate(private_name_routes.empresas.addressScreen)
    }

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <SendAddressCard selectedAddress={selectedAddress?.nameAddress} onPress={goToChangeAddress} />
        </ViewStyled>
    );
};