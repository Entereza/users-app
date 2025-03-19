import React from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import AllOrdersList from '../../../components/OrderComponents/AllOrdersList';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import { private_name_routes } from '../../../utils/route/private_name_routes';

export default function PedidosHomeScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();

    const pedidos = [
        {
            id: '1',
            imageUrl: '',
            companyName: 'Tropical Chicken',
            totalInitial: 40,
            totalFinal: 40,
            cashback: 0,
            date: '2024-03-21T21:30:00',
            data: [
                {
                    products: {
                        id: 1,
                        name: 'Hamburguesa Clásica',
                        description: 'Hamburguesa con queso y vegetales',
                        status: true,
                        pricing: 25,
                        url: '',
                    },
                    productVariable: [
                        {
                            pv: {
                                id: 1,
                                name: 'Tipo de pan',
                                quantity: 1,
                            },
                            pricingpv: [
                                {
                                    id: 1,
                                    name: 'Pan integral',
                                    price: 0,
                                }
                            ]
                        },
                        {
                            pv: {
                                id: 2,
                                name: 'Extras',
                                quantity: 1,
                            },
                            pricingpv: [
                                {
                                    id: 2,
                                    name: 'Queso extra',
                                    price: 5,
                                },
                                {
                                    id: 3,
                                    name: 'Tocino',
                                    price: 8,
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: '2',
            imageUrl: '',
            companyName: 'Bliss',
            totalInitial: 35,
            totalFinal: 30,
            cashback: 5,
            date: '2024-03-22T21:30:00',
            data: [
                {
                    products: {
                        id: 2,
                        name: 'Pizza Margarita',
                        description: 'Pizza clásica italiana',
                        status: true,
                        pricing: 35,
                        url: '',
                    },
                    productVariable: []
                }
            ]
        }
    ];

    const goToOrderDetails = (order) => {
        changeColorStatusBar(theme_colors.transparent);
        toggleTabBar(false);
        navigation.navigate(private_name_routes.pedidos.orderDetails, { order });
    };

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.large}
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
                height={'0.2%'}
                backgroundColor={theme_colors.greyLine}
                style={{
                    alignSelf: 'center',
                    marginBottom: 20,
                    marginTop: 10
                }}
            />

            <AllOrdersList orders={pedidos} onOrderPress={goToOrderDetails} />
        </SafeAreaStyled>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.transparent,
        flex: 1,
    },
    startView: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10
    },
});