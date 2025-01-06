import React, { useEffect, useState } from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import FacturacionCard from '../../../components/Cards/FacturacionCard';
import ResumeCard from '../../../components/Cards/ResumeCard';
import AddressCard from '../../../components/Cards/AddressCard';
import CashbackCard from '../../../components/Cards/CashbackCard';
import SlideButton from '../../../components/Buttons/SlideButton';
import SwipeToConfirm from '../../../components/TransferChasbackComponents/PayComponents/SwipeToConfirm';

export default function ConfirmOrderScreen() {

    const metodosDePago = [
        { id: 1, name: 'Efectivo', icon: 'cash-outline' },
        { id: 2, name: 'QR', icon: 'qr-code-outline' },
        { id: 3, name: 'Tarjeta', icon: 'card-outline' },
    ];

    const direcciones = [
        { id: 1, address: 'Av. Tadeo Haenke esq. Melchor', place: 'Casa' },
        { id: 2, address: 'Av. Santa Cruz, Edificio Villa Provenza, Piso 7', place: 'Oficina' },
    ];

    const facturacion = [
        { id: 1, name: 'Rocha Torrez', nit: '123456789' },
    ];

    const route = useRoute();
    const { selection } = route.params;

    const navigation = useNavigation();

    const goToConfirmationScreen = () => {
        setTimeout(() => {
            navigation.navigate(private_name_routes.empresas.empresasFinalConfirmation);
        }, 800);
    }

    const goToMethodScreen = () => {
        navigation.navigate(private_name_routes.empresas.methodScreen, {
            options: metodosDePago
        });
    }

    const goToAddressScreen = () => {
        navigation.navigate(private_name_routes.empresas.addressScreen, {
            addresses: direcciones
        });
    }

    const goToFacturacionScreen = () => {
        navigation.navigate(private_name_routes.empresas.facturacionScreen, {
            facturacion: facturacion
        });
    }

    const findMethodById = (id) => {
        return metodosDePago.find(metodo => metodo.id === id);
    };

    const findAddressById = (id) => {
        return direcciones.find(direccion => direccion.id === id);
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme_colors.white
            }}
        >
            <View
                backgroundColor={theme_colors.backgroundGrey}
                style={{
                    width: '100%',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20
                }}
            >
                <AddressCard
                    address={findAddressById(selection) ? findAddressById(selection).address : direcciones.find(direccion => direccion.id === 1).address}
                    client={"Gastón Rocha #70761855"}
                    icon={"map-location-dot"}
                    onPress={goToAddressScreen}
                />
            </View>

            <ViewStyled
                width={'100%'}
                backgroundColor={theme_colors.white}
                style={{
                    flex: 1,
                    borderRadius: 20,
                    borderColor: theme_colors.requiredGrey,
                    borderWidth: 0.5,
                    alignItems: 'center',
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: theme_colors.transparent,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingBottom: 15
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollToOverflowEnabled={false}
                >
                    <FacturacionCard
                        title={"Facturación"}
                        icon={"receipt-outline"}
                        info={facturacion.find(facturacion => facturacion.id === 1).name}
                        info2={facturacion.find(facturacion => facturacion.id === 1).nit}
                        onPress={goToFacturacionScreen}
                    />

                    <FacturacionCard
                        title={"Método de Pago"}
                        icon={findMethodById(selection) ? findMethodById(selection).icon : "cash-outline"}
                        info={findMethodById(selection) ? findMethodById(selection).name : "Efectivo"}
                        info2={"BOB"}
                        onPress={goToMethodScreen}
                    />

                    <ResumeCard title={"Resumen"} productos={"490"} envio={"0"} cupon={"0"} cashback={selection} />

                    <CashbackCard cashback={"49"} />
                </ScrollView>

                <SwipeToConfirm onConfirm={goToConfirmationScreen} />
            </ViewStyled>
        </View>
    );
};