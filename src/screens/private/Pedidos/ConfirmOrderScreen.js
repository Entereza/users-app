import React, { useEffect, useState } from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import ResumeCard from '../../../components/Cards/ResumeCard';
import AddressCard from '../../../components/Cards/AddressCard';
import CashbackCard from '../../../components/Cards/CashbackCard';
import SlideButton from '../../../components/Buttons/SlideButton';
import SwipeToConfirm from '../../../components/TransferChasbackComponents/PayComponents/SwipeToConfirm';
import useAddressStore from '../../../utils/tools/interface/addressStore';
import useAuthStore from '../../../utils/tools/interface/authStore';
import useCartStore from '../../../utils/tools/interface/cartStore';
import InfoField from '../../../components/CartComponents/InfoField';
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen';

export default function ConfirmOrderScreen() {
    const { user } = useAuthStore();
    const { billingInfo, paymentMethod } = useCartStore()
    const { selectedAddress } = useAddressStore();

    const navigation = useNavigation();

    const goToConfirmationScreen = () => {
        setTimeout(() => {
            navigation.navigate(private_name_routes.empresas.empresasFinalConfirmation);
        }, 800);
    }

    const goToMethodScreen = () => {
        navigation.navigate(private_name_routes.empresas.methodScreen);
    }

    const goToAddressScreen = () => {
        navigation.navigate(private_name_routes.empresas.addressScreen, {
            internScreen: true
        });
    }

    const goToFacturacionScreen = () => {
        navigation.navigate(private_name_routes.empresas.facturacionScreen);
    }

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            style={{
                height: '100%'
            }}
        >
            <HeaderDefaultScreen title={"Confirmar Pedido"} withBorder={false} />

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: theme_colors.transparent,
                    paddingBottom: 20
                }}
                showsVerticalScrollIndicator={false}
            >
                <ViewStyled
                    width={100}
                    paddingTop={1}
                    paddingBottom={3}
                    backgroundColor={theme_colors.categoryGrey}
                    style={{
                        height: 'auto',
                        alignContent: 'center',
                        justifyContent: 'flex-start',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                    }}
                >
                    <AddressCard
                        address={selectedAddress ? selectedAddress.nameAddress : "Por favor, selecciona una dirección"}
                        client={selectedAddress ? `${user.names} #${user.ci}` : ""}
                        icon={"map-location-dot"}
                        onPress={goToAddressScreen}
                    />
                </ViewStyled>

                <ViewStyled
                    width={100}
                    paddingTop={3}
                    backgroundColor={theme_colors.white}
                    style={{
                        flex: 1,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        marginTop: -20
                    }}
                >
                    <InfoField
                        label='Facturación'
                        icon='receipt'
                        value={billingInfo?.name || ""}
                        secondaryValue={billingInfo?.nit || ""}
                        emptyValues='Agregar datos de facturación'
                        onPress={goToFacturacionScreen}
                    />

                    <InfoField
                        label='Método de Pago'
                        icon={paymentMethod?.icon}
                        value={paymentMethod?.name || ""}
                        typeIcon={"FontAwesome6"}
                        secondaryValue={"BOB"}
                        emptyValues='Seleccionar método'
                        onPress={goToMethodScreen}
                    />

                    <ResumeCard />

                    <CashbackCard />
                </ViewStyled>

            </ScrollView>
            {selectedAddress &&
                <SwipeToConfirm onConfirm={goToConfirmationScreen} />
            }
        </ViewStyled>
    );
};