import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { private_name_routes } from '../../utils/route/private_name_routes';
import AddToCart from '../Buttons/AddToCart';

export default function ProductoVertical({ producto }) {

    const navigation = useNavigation();

    const goToProductScreen = () => {
        navigation.navigate(private_name_routes.empresas.empresaProducto, {
            producto: producto
        });
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
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 2,
                    height: 10,
                },
                shadowOpacity: 0.10,
                shadowRadius: 5,
            }}
        >
            <ViewStyled
                width={'50%'}
                height={'37%'}
                backgroundColor={theme_colors.white}
                style={{ 
                    alignItems: 'center',
                    borderRadius: 10,
                }}
            >
                <Image 
                    source={require("../../../assets/empresaBack.png")}
                    style={{
                        width: '80%',
                        margin: 10,
                        borderRadius: 10
                    }}
                />

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '80%'
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