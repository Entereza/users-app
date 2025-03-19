import React, { useEffect, useState } from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import BusinessItem from './BusinessItem'
import { FlatList } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'
import useTabBarStore from '../../utils/tools/interface/tabBarStore'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { empresasService } from '../../services/api/empresas/empresasService'
import { showToast } from '../../utils/tools/toast/toastService'
import Toast from 'react-native-root-toast'
import BusinessSkeleton from '../Skeletons/BusinessSkeleton'
import useLocationStore from '../../utils/tools/interface/locationStore'
import ImageStyled from '../../utils/ui/ImageStyled'

export default function BusinessSection({ refreshing }) {
  const navigation = useNavigation();
  const { toggleTabBar, changeColorStatusBar } = useTabBarStore();
  const { latitude, longitude, departmentId } = useLocationStore();
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, [latitude, longitude, departmentId]);

  useEffect(() => {
    if (refreshing) {
      fetchBusinesses();
    }
  }, [refreshing]);

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);

      if (!departmentId || !latitude || !longitude) {
        // showToast(
        //   'No se pudo obtener tu ubicación',
        //   Toast.positions.TOP,
        //   theme_colors.white,
        //   theme_colors.error
        // );
        return;
      }

      const response = await empresasService.getBranchesByCity(departmentId, latitude, longitude);

      if (response && response.business) {
        // Procesar los datos para obtener solo empresas con sucursales abiertas
        const processedBusinesses = empresasService.processBusinessData(response);

        // Limitar a 4 empresas para mostrar
        const limitedBusinesses = processedBusinesses.slice(0, 4);
        setBusinesses(limitedBusinesses);
      } else {
        setBusinesses([]);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      showToast(
        'No se pudieron cargar las empresas cercanas',
        Toast.positions.TOP,
        theme_colors.white,
        theme_colors.error
      );
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const goToBusinessScreen = (item) => {
    changeColorStatusBar(theme_colors.transparent);
    toggleTabBar(false);
    navigation.navigate(private_name_routes.empresas.empresasDetails, {
      business: item
    });
  }

  if (isLoading) {
    return <BusinessSkeleton />
  }

  return (
    <ViewStyled
      width={100}
      backgroundColor={theme_colors.transparent}
      marginTop={1}
      paddingVertical={1}
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <ViewStyled
        width={90}
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
          Empresas cercanas
        </TextStyled>
      </ViewStyled>

      {businesses.length > 0 ? (
        <FlatList
          data={businesses}
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
          horizontal={false}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ViewStyled
          width={90}
          height={25}
          backgroundColor={theme_colors.transparent}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageStyled
            style={{
              width: '50%',
              height: '50%',
              resizeMode: 'contain',
            }}
            source={require('../../../assets/gifs/closed.gif')}
          />

          <TextStyled
            fontFamily='SFPro-Italic'
            textAlign='center'
            fontSize={theme_textStyles.smedium}
            color={theme_colors.grey}
          >
            No hay empresas abiertas en este momento.
          </TextStyled>
        </ViewStyled>
      )}
    </ViewStyled>
  )
}