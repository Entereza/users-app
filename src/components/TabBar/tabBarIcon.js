import React from 'react'
import { private_name_routes } from '../../utils/route/private_name_routes';
import { Entypo } from '@expo/vector-icons';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';

export default function TabBarIcon({ routeName, focused, color, size }) {
    const [iconName, setIconName] = React.useState('')

    const getIconName = () => {
        if (routeName === private_name_routes.billetera.billeteraStack) {
            setIconName('wallet')
        } else if (routeName === private_name_routes.empresas.empresasStack) {
            setIconName('shop')
        } else if (routeName === private_name_routes.pedidos.pedidosStack) {
            setIconName('list')
        }
    }

    const getTabLabel = (routeName) => {
        switch (routeName) {
            case private_name_routes.billetera.billeteraStack:
                return 'Billetera';
            case private_name_routes.empresas.empresasStack:
                return 'Empresas';
            case private_name_routes.pedidos.pedidosStack:
                return 'Pedidos';
            case private_name_routes.profile.profileStack:
                return 'Perfil';
            default:
                return 'Tab';
        }
    };

    React.useEffect(() => {
        getIconName()
    }, [routeName])

    return (
        <ViewStyled
            height={5}
            backgroundColor={theme_colors.transparent}
            style={{
                width: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                borderRadius={'50%'}
                backgroundColor={focused ? theme_colors.categoryGrey : theme_colors.transparent}
                style={{
                    width: 'auto',
                    height: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    borderRadius={'50%'}
                    style={{
                        backgroundColor: focused ? theme_colors.primary : theme_colors.transparent,
                        width: size * 1.5,
                        height: size * 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Entypo
                        name={iconName}
                        size={size}
                        color={color}
                    />
                </ViewStyled>

                {focused && (
                    <ViewStyled
                        paddingLeft={1}
                        paddingRight={3}
                        style={{
                            backgroundColor: theme_colors.transparent,
                            height: size,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-SemiBold'
                            textAlign={'center'}
                            fontSize={4.5}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            color={theme_colors.black}
                        >
                            {getTabLabel(routeName)}
                        </TextStyled>
                    </ViewStyled>
                )}
            </ViewStyled>
        </ViewStyled>
    )
}