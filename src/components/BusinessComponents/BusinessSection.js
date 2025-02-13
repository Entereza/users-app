import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import BusinessItem from './BusinessItem'
import { FlatList } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'
import useTabBarStore from '../../utils/tools/interface/tabBarStore'
import { businesses } from '../../utils/tools/storage/data'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function BusinessSection() {
  const navigation = useNavigation();

  const { toggleTabBar, changeColorStatusBar } = useTabBarStore();

  const businessList = businesses
    .sort((a, b) => b.cashback - a.cashback)
    .slice(0, 4);

  const goToBusinessScreen = (item) => {
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
      paddingVertical={1}
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <ViewStyled
        height={4}
        marginBottom={1}
        backgroundColor={theme_colors.transparent}
        paddingLeft={1}
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <TextStyled
          fontFamily='SFPro-Bold'
          textAlign='left'
          fontSize={theme_textStyles.large}
          color={theme_colors.black}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          Cashbacks atractivos
        </TextStyled>
      </ViewStyled>

      <FlatList
        data={businessList}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 5,
          paddingTop: 2,
          paddingBottom: heightPercentageToDP(10),
        }}
        renderItem={({ item, index }) =>
          <BusinessItem
            item={item}
            onPress={() => goToBusinessScreen(item)}
            key={index}
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
                fontSize={4}
                color={theme_colors.grey}
                style={{
                  width: "100%",
                }}
              >
                {
                  businessList.length > 0
                    ? `Estas son las empresas con mayor cashback`
                    : `Aquí aparecerán las empresas con mayor cashback`
                }
              </TextStyled>
            </ViewStyled>
          )
        }}
        horizontal={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </ViewStyled>
  )
}