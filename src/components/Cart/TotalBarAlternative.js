import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../utils/route/private_name_routes';

export default function TotalBarAlternative({ quantity, total, title, isSelected }) {

    const navigation = useNavigation();

    const handlePress = () => {
        if(title == "Agregar"){
            navigation.navigate(private_name_routes.empresas.empresasDetails, {
                products: quantity,
                total: total
            });
        } else if (title == "Ir al carrito"){
            navigation.navigate(private_name_routes.empresas.carritoHome);
        } else if (title == "Ir a pagar"){
            navigation.navigate(private_name_routes.empresas.confirmOrder, {
                selection: isSelected
            });
        }
    }

    return (
        <ViewStyled
            width={'90%'}
            height={'10%'}
            backgroundColor={theme_colors.white}
            style={{
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 5,
                marginBottom: 10
            }}
        >
            <ViewStyled
                width={'50%'}
                height={'10%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    borderRadius: 10,
                    justifyContent: 'center'
                }}
            >
                <TextStyled
                    fontSize={10}
                    fontFamily='SFPro-Regular'
                    color={theme_colors.grey}
                    style={{
                        marginBottom: 3
                    }}
                >
                    {quantity} productos
                </TextStyled>
                <TextStyled
                    fontSize={10}
                    fontFamily='SFPro-Bold'
                    color={theme_colors.black}
                >
                    <Text style={{fontFamily: 'SFPro-Medium'}}>Total:</Text>
                    <Text> Bs. {total}</Text>
                </TextStyled>
            </ViewStyled>

            <TouchableOpacity
                onPress={handlePress}
                style={{
                    shadowColor: theme_colors.white,
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
            >
                <ViewStyled
                    width={'40%'}
                    height={'6%'}
                    backgroundColor={theme_colors.primary}
                    style={{
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        color={theme_colors.white}
                        fontSize={7}
                    >
                        {title}
                    </TextStyled>
                </ViewStyled>
            </TouchableOpacity>
        </ViewStyled>
    )
};