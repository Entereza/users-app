import React from 'react'
import { Pressable } from 'react-native'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../../utils/route/private_name_routes'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'

export default function CategoryItem({ item }) {
    const navigation = useNavigation()
    const { toggleTabBar } = useTabBarStore();

    const goToCategoryScreen = () => {
        toggleTabBar(false)
        navigation.navigate(private_name_routes.empresas.empresaCategory, { category: item })
    }

    return (
        <ViewStyled
            marginVertical={1}
            marginHorizontal={0.5}
            paddingVertical={1}
            paddingHorizontal={2}
            style={{
                width: 'auto',
                height: 'auto',
                backgroundColor: theme_colors.transparent,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Pressable
                onPress={goToCategoryScreen}
                style={{
                    width: 70,
                    height: 70,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    borderWidth: 1,
                    backgroundColor: theme_colors.categoryGrey,
                    borderColor: theme_colors.categoryGrey,
                }}
            >
                <MaterialCommunityIcons
                    name={item.icon}
                    color={theme_colors.black}
                    size={35}
                    alignSelf='center'
                />
            </Pressable>
            <TextStyled
                textAlign='center'
                fontSize={4.5}
                color={theme_colors.black}
                style={{
                    width: "100%",
                    fontFamily: 'SFPro-Medium',
                    marginTop: 6,
                }}
            >
                {item.name}
            </TextStyled>
        </ViewStyled>
    )
}