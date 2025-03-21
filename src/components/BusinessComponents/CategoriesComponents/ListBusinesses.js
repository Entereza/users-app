import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { FlatList } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import BusinessItem from '../BusinessItem'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../../utils/route/private_name_routes'

export default function ListBusinesses({ businesses = [], nameCategory = '' }) {
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();
    const navigation = useNavigation();

    const goToBusinessScreen = (item) => {
        console.log('goToBusinessScreen', item)
        changeColorStatusBar(theme_colors.transparent);
        toggleTabBar(false);
        navigation.navigate(private_name_routes.empresas.empresasDetails, {
            business: item
        });
    }

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            marginTop={1}
            borderRadius={2}
            paddingVertical={1}
            style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FlatList
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 1,
                    paddingTop: 10,
                    width: '100%',
                    paddingBottom: heightPercentageToDP(6),
                }}
                renderItem={({ item, index }) =>
                    <BusinessItem
                        key={index}
                        item={item}
                        onPress={() => goToBusinessScreen(item)}
                    />
                }
                ListFooterComponent={() => {
                    return (
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            width={90}
                            height={5}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Italic'
                                textAlign='center'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.grey}
                                style={{
                                    width: "100%",
                                }}
                            >
                                {
                                    businesses.length > 0
                                        ? `Estas son las empresas encontradas en '${nameCategory}'`
                                        : `Aquí aparecerán las empresas de '${nameCategory}'`
                                }
                            </TextStyled>
                        </ViewStyled>
                    )
                }}
                horizontal={false}
                scrollEnabled={true}
                data={businesses}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    )
}