import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../../utils/route/private_name_routes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import ViewStyled from '../../../utils/ui/ViewStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function ShowAllTransactions({ allOrders = [] }) {
    const navigation = useNavigation()
    const { toggleTabBar } = useTabBarStore()

    const goToAllTransactionsScreen = () => {
        toggleTabBar(false)
        navigation.navigate(private_name_routes.billetera.allOrdersScreen, {
            allOrders: allOrders
        });
    }

    return (
        <TouchableOpacity
            onPress={goToAllTransactionsScreen}
        >
            <ViewStyled
                height={3}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.small + .5}
                    color={theme_colors.grey}
                    fontFamily={'SFPro-Medium'}
                    style={{
                        marginBottom: 2
                    }}
                >
                    Ver todo
                </TextStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: 'auto',
                        height: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MaterialCommunityIcons
                        name={'chevron-right'}
                        size={adjustFontSize(theme_textStyles.medium)}
                        color={theme_colors.grey}
                    />
                </ViewStyled>
            </ViewStyled>
        </TouchableOpacity>
    )
}