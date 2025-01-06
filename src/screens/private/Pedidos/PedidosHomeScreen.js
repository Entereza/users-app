import React from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import GeneralButton from '../../../components/Buttons/GeneralButton';
import PedidoCard from '../../../components/Cards/PedidoCard';

export default function PedidosHomeScreen() {

    const navigation = useNavigation();

    const goToDetailsScreen = () => {
        navigation.navigate(private_name_routes.pedidos.empresasDetails, {
            products: 0,
            total: 0
        });
    }

    const pedidos = [
        { id: 1, restaurante: 'Tropical Chicken', monto: '40', direccion: 'Zona Norte Calle 4', estado: 'En camino', fecha: '21/03/24', hora: '21:30 pm'},
        { id: 2, restaurante: 'Bliss', monto: '40', direccion: 'Zona Norte Calle 4', estado: 'Entregado', fecha: '22/03/24', hora: '21:30 pm'}
    ];

    return (
        <ViewStyled
            width={'100%'}
            height={'100%'}
            backgroundColor={theme_colors.white}
            style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{ 
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                    marginBottom: 10
                }}
            >
                <TextStyled
                    fontSize={9}
                    color={theme_colors.primary}
                    style={{
                        fontFamily: 'SFPro-Bold',
                    }}
                >
                    Todos tus pedidos
                </TextStyled>
            </ViewStyled>

            <ViewStyled
                width={'90%'}
                height={0.1}
                backgroundColor={theme_colors.greyLine}
                style={{
                    marginBottom: 20
                }}
            />
            
            <ScrollView
                width={'90%'}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: theme_colors.transparent,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}
                scrollToOverflowEnabled={false}
            >
                {pedidos.map((pedido) => (
                    <React.Fragment key={pedido.id}>
                        <PedidoCard 
                            restaurante={pedido.restaurante}
                            imagen={require("../../../../assets/empresaLogo.png")}
                            direccion={pedido.direccion}
                            estado={pedido.estado}
                            monto={pedido.monto}
                            fecha={pedido.fecha}
                            hora={pedido.hora}
                            onPress={goToDetailsScreen}
                        />
                    </React.Fragment>
                ))}
            </ScrollView>
        </ViewStyled>
    );
};