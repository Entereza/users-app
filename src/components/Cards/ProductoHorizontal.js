import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { private_name_routes } from '../../utils/route/private_name_routes';
import AddToCart from '../Buttons/AddToCart';

export default function ProductoHorizontal({ producto, pressable }) {

    const navigation = useNavigation();

    const goToProductScreen = () => {
        if (pressable){
            navigation.navigate(private_name_routes.empresas.empresaProducto, {
                producto: producto
            });
        }
    }

    return (
        <TouchableOpacity
            onPress={goToProductScreen}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: theme_colors.white,
                marginRight: 10,
                marginTop: '1%',
                marginBottom: 10,
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 2,
                    height: 8,
                },
                shadowOpacity: 0.10,
                shadowRadius: 10
            }}
        >
            <ViewStyled
                width={'80%'}
                height={'15.5%'}
                backgroundColor={theme_colors.white}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                }}
            >
                <Image 
                    source={require("../../../assets/empresaBack.png")}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        margin: 10
                    }}
                />

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '65%',
                        justifyContent: 'center'
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TextStyled
                            fontSize={7}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-Bold'
                            }}
                        >
                            {producto.producto}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 5
                        }}
                    >
                        <TextStyled
                            fontSize={4.5}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-Regular'
                            }}
                        >
                            {producto.categoria}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        width={'48%'}
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <TextStyled
                            fontSize={7}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-Bold'
                            }}
                        >
                            Bs. {producto.precio}
                        </TextStyled>

                        <AddToCart />
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>
        </TouchableOpacity>
    );
};