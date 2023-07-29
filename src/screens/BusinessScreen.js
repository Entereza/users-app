import React, { useEffect, useState } from "react";
import {
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from "react-native";

import BussinessSearch from "../components/business/BussinessSearch";
import { fetchWithToken } from "../utils/fetchWithToken";
import BusinessCategoryItem from "../components/business/BusinessCategoryItem";
import { theme } from "../utils/theme";
import ViewStyled from "../components/ui/ViewStyled";
import { useSelector } from "react-redux";
import { Skeleton, Box, HStack, NativeBaseProvider } from "native-base";
import BusinessBubbles from "../components/business/BusinessBubbles";
import BusinessCategoryAll from "../components/business/BusinessCategoryAll";
import { codeErrors } from "../utils/codeErrors";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import ListItem from "../components/business/ListItem";
import ButtonNext from "../components/Btn/ButtonNext";
import NavigationHeader from "../components/navigation/NavigationHeader";
import { useNavigation } from "@react-navigation/native";
import BusinessInputRedirect from "../components/business/BusinessRedirectInput";
import BusinessPromotions from "../components/business/BusinessPromotions";
import FloatingButton from "../components/Btn/FloatingButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BusinessHome() {
  const [page, setPage] = useState(0);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true)
  const [loadingSkeletonCategory, setLoadingSkeletonCategory] = useState(true)
  const [loadingSkeletonEmpresas, setLoadingSkeletonEmpresas] = useState(true)
  const [loadingMoreEmpresas, setLoadingMoreEmpresas] = useState(true)

  const { location } = useSelector(state => state.auth);

  const nextPage = () => {
    setPage(page + 1);
  };

  let arrayRubros = ([])

  const [img, setImg] = useState([]);

  const [empresaslength, setEmpresaslength] = useState(5);
  const [empresaslengthTotal, setEmpresaslengthTotal] = useState(0);

  const [hasMore, setHasMore] = useState(false);
  const [startPromotions, setStartPromotions] = useState(0);
  const [dataEmpresas, setDataEmpresas] = useState('');

  const SkeletonCategory = () => {
    return (
      <NativeBaseProvider>
        <Box w={'90%'} flexDirection={"row"}>
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(21)}
            h={heightPercentageToDP(11)}
            borderWidth="1"
            padding={2}
            space={1}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
            marginRight={3}

          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton.Text speed={1} lines={1} size="100%" h="10" rounded="md" />
          </HStack>
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(21)}
            h={heightPercentageToDP(11)}
            borderWidth="1"
            padding={2}
            space={1}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
            marginRight={3}

          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton.Text speed={1} lines={1} size="100%" h="10" rounded="md" />
          </HStack>
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(21)}
            h={heightPercentageToDP(11)}
            borderWidth="1"
            padding={2}
            space={1}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
            marginRight={3}

          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton.Text speed={1} lines={1} size="100%" h="10" rounded="md" />
          </HStack>
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(21)}
            h={heightPercentageToDP(11)}
            borderWidth="1"
            padding={2}
            space={1}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
            marginRight={3}

          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton.Text speed={1} lines={1} size="100%" h="10" rounded="md" />
          </HStack>
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(21)}
            h={heightPercentageToDP(11)}
            borderWidth="1"
            padding={2}
            space={1}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
            marginRight={3}

          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton.Text speed={1} lines={1} size="100%" h="10" rounded="md" />
          </HStack>
        </Box>
      </NativeBaseProvider>
    )
  };

  const SkeletonBusiness = () => {
    return (
      <NativeBaseProvider>
        <Box w="100%" alignItems={'center'} justifyContent={'center'} marginTop={4} >
          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(91)}
            h={heightPercentageToDP(21)}
            borderWidth="1"
            padding={2}
            space={1}
            marginBottom={heightPercentageToDP(1)}
            rounded="sm"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="sm" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton speed={1} w="100%" h="25%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
          </HStack>

          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(91)}
            h={heightPercentageToDP(21)}
            borderWidth="1"
            padding={2}
            space={1}
            marginBottom={heightPercentageToDP(1)}
            rounded="sm"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="sm" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton speed={1} w="100%" h="25%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
          </HStack>

          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(91)}
            h={heightPercentageToDP(21)}
            borderWidth="1"
            padding={2}
            space={1}
            marginBottom={heightPercentageToDP(1)}
            rounded="sm"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="sm" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton speed={1} w="100%" h="25%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
          </HStack>

          <HStack
            flexDirection={"column"}
            w={widthPercentageToDP(91)}
            h={heightPercentageToDP(21)}
            borderWidth="1"
            padding={2}
            space={1}
            marginBottom={heightPercentageToDP(1)}
            rounded="sm"
            _dark={{
              borderColor: "coolGray.500"
            }}
            _light={{
              borderColor: "coolGray.200"
            }}
            p="4"
          >
            <Skeleton speed={1} marginBottom={2} size="100%" h="70%" rounded="sm" startColor={theme.skeleton} endColor={theme.secondary} />

            <Skeleton speed={1} w="100%" h="25%" rounded="md" startColor={theme.skeleton} endColor={theme.secondary} />
          </HStack>
        </Box>
      </NativeBaseProvider>
    )
  }

  const getInfo = async () => {
    try {
      console.log('Starts Get Info of BusinessScreen')
      const cityCode = await location.ubication?.cityCode
      console.log('codeCity: ', cityCode)
      setStartPromotions(false)
      setLoadingSkeletonCategory(true)
      setLoadingSkeleton(true)
      setLoadingSkeletonEmpresas(true)
      setLoadingMoreEmpresas(true)


      let res = await fetchWithToken(`entereza/rubros`, "GET");

      const { entereza, rubros, imgRubros } = await res.json();

      if (entereza.codeError === "COD200") {
        rubros.forEach(rubro => {
          if (rubro.ciudad === cityCode) {
            let imgCategory = imgRubros.find(
              (image) => image.codigo_rubro === rubro.codigoRubro
            )
            rubro.image = imgCategory ? { uri: `${imgCategory.img_rubro}` } : require('../../assets/img/NoCategory.png')

            arrayRubros.push(rubro)
            console.log('Lenght Saved: ', arrayRubros.length)
          }
        });
        console.log('Rubros: ', rubros)
        setImg(arrayRubros);
        getInfoPromotions()
        getInfoEmpresas5()
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.log("Error entereza BusinessScreen", error);
    }
  };

  const [promotionsImg, setPromotionsImg] = React.useState('')
  const [linkWP, setLinkWP] = React.useState('')


  const getInfoPromotions = async () => {
    try {
      const token = await AsyncStorage.getItem('ENT-TKN')

      const cityCode = await location.ubication?.cityCode; // Asegúrate de que esto está definido

      const formData = new FormData();
      formData.append('opcion', '2');
      formData.append('imagen', '');
      formData.append('codigoEmpresa', '');
      formData.append('fechaInicio', '');
      formData.append('fechaFinal', '');
      formData.append('ciudad', cityCode);

      const res = await fetch("https://enterezabol.com:8443/entereza/promociones_operacion", {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const { entereza, promImg } = await res.json()

      console.log('Entereza Response getInfoPromotions: ', entereza, promImg)
      if (entereza.codeError === "COD200") {
        setStartPromotions(true)

        if (promImg.length > 0) {
          const promImgArray = await promImg.sort((a, b) => a.posicion - b.posicion);

          setPromotionsImg(promImgArray)
        }
      } else {
        console.log('Error GettingPromotions: ', entereza)
      }
    } catch (error) {
      console.log('getInfoPromotions: ', error)
    }
  }

  const getInfoEmpresas5 = async () => {
    try {
      setDataEmpresas([])
      const cityCode = await location.ubication?.cityCode
      const lat = await location.coords?.latitude
      const lng = await location.coords?.longitude

      console.log('Latitud: ', lat, '- Longitud: ', lng)

      let res = await fetchWithToken(
        `entereza/emp_hub_filt?patron=Empresa&opcion=1&pageno=0&size=15&ciudad=${cityCode}&categoria=COD-RUB-343&lat=${lat}&lng=${lng}`,
        "GET"
      );

      const { entereza, empresasHUBWColors, empresasImages, empHorariosSuc } = await res.json();

      let empresasHUBlength = empresasHUBWColors.empresasHUBLinks.length

      if (entereza.codeError === codeErrors.cod200) {
        if (empresasHUBlength !== 0) {
          console.log('empresasHUBlength: ', empresasHUBlength)
          if (empresasHUBlength < 5) {
            setHasMore(false)
            setEmpresaslength(empresasHUBlength)
          } else if (empresasHUBlength > 5) {
            setHasMore(true)
            setEmpresaslength(5)
            setEmpresaslengthTotal(empresasHUBlength)
          }

          let newEmpresa = empresasHUBWColors.empresasHUBLinks.map((empresa) => {
            let imgEmpresa = empresasImages.lista_empresas_img.find((img) => img.codigoEmpresa === empresa.codigoEmpresa);
            let backgroundEmpresa = empresasImages.lista_empresas_img.find((background) => background.codigoEmpresa === empresa.codigoEmpresa);
            let horariosEmpresa = empHorariosSuc.horariosEmpresa.find((horario) => horario.codigoEmpresa === empresa.codigoEmpresa);
            let noSucursales = empHorariosSuc.noSucursales.find((sucursal) => sucursal.codigoEmpresaHub === empresa.codigoEmpresa);
            let codKm = empHorariosSuc.codKilometros.find((k) => k.codigoEmpresa === empresa.codigoEmpresa);

            empresa.img = imgEmpresa ? { uri: `${imgEmpresa.imgEmpresa}` } : require('../assets/business/01.png')
            empresa.background = backgroundEmpresa ? { uri: `${backgroundEmpresa.imgPortadaEmpresa}` } : require('../assets/business/GradientBackground.png')
            empresa.horario = horariosEmpresa ? horariosEmpresa.estado : 'empty';
            empresa.numeroSucursales = noSucursales ? noSucursales.numeroSucursales : 0;
            empresa.codKm = codKm ? codKm.km : Number.MAX_SAFE_INTEGER;

            // asignar un valor numérico a cada estado de horario para el ordenamiento
            switch (empresa.horario) {
              case true:
                empresa.horarioOrden = 0; // abierta
                break;
              case false:
                empresa.horarioOrden = 1; // cerrada
                break;
              case 'empty':
                empresa.horarioOrden = 2; // vacía
                break;
              default:
                empresa.horarioOrden = 3; // cualquier otro caso
            }

            return empresa;
          });

          // ordenar las empresas por estado de horario y luego por km
          newEmpresa.sort((a, b) => {
            if (a.horarioOrden < b.horarioOrden) return -1;
            if (a.horarioOrden > b.horarioOrden) return 1;

            // si el estado de horario es el mismo, se ordena por km
            if (a.codKm < b.codKm) return -1;
            if (a.codKm > b.codKm) return 1;

            return 0;
          });


          setDataEmpresas((prev) => [...prev, ...newEmpresa]);
        }

        setTimeout(() => {
          setLoadingSkeletonCategory(false)
        }, 100);
        setTimeout(() => {
          setLoadingSkeleton(false)
        }, 200);
        setTimeout(() => {
          setLoadingSkeletonEmpresas(false)
          setLoadingMoreEmpresas(false)
        }, 300);
      } else {
        console.log("Error Entereza Business");
      }
    } catch (error) {
      console.log("Error Entereza Business: ", error);
    }
  };

  const getInfoEmpresas10 = async () => {
    try {
      setLoadingMoreEmpresas(true)
      setEmpresaslength(empresaslengthTotal)
      setHasMore(false)
      setTimeout(() => {
        setLoadingMoreEmpresas(false)
      }, 1000);
    } catch (error) {
      console.log("Error Entereza BusinessScreen", error);
    }
  };

  const SeeMoreEmpresas = async () => {
    getInfoEmpresas10()
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    arrayRubros = ([])
    setRefreshing(true)
    setHasMore(false)
    setLoadingSkeletonCategory(true)
    setStartPromotions(false)
    setLoadingMoreEmpresas(true)
    setLoadingSkeleton(true)
    setLoadingSkeletonEmpresas(true)
    setEmpresaslength(5)
    setImg([])
    setTimeout(() => {
      getInfo()
    }, 1000);
    setRefreshing(false)
  }

  React.useEffect(() => {
    if (location !== null) {
      setHasMore(true)
      if (location.ubication !== null) {
        if (location.ubication.cityCode) {
          getInfo()
        } else {
          console.log('Missing CodCity')
        }
      }
    }
  }, [location]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.background
        }}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <NavigationHeader />

        <ViewStyled
          marginTop={1}
          backgroundColor={theme.transparent}
          height={62 + (empresaslength * 23)}
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: 50,
          }}
        >
          <BusinessInputRedirect cityCode={location !== null ? location.ubication.cityCode : 'Cochabamba'} loadingSkeleton={!startPromotions} />

          <BusinessPromotions
            cityCode={location ? location.ubication.cityCode : 'Cochabamba'}
            reload={loadingSkeleton}
            start={startPromotions}
            promotionsData={promotionsImg}
          />

          <ViewStyled
            backgroundColor={theme.transparent}
            width={95}
            height={13}
            marginTop={2}
            marginLeftAuto
            marginRightAuto
          >
            {/* <BusinessBubbles city={location !== null ? location.ubication.cityCode : 'Cochabamba'} loadingSkeleton={loadingSkeleton} /> */}

            <ViewStyled
              backgroundColor={theme.transparent}
              width={95}
              height={12}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}
            >
              {loadingSkeletonCategory
                ? SkeletonCategory()
                : <>
                  <FlatList
                    horizontal
                    data={img}
                    renderItem={({ item }) =>
                      <BusinessCategoryItem
                        key={item.codigoRubro}
                        item={item}
                      />
                    }
                    onEndReached={nextPage}
                    onEndReachedThreshold={0.7}
                    showsHorizontalScrollIndicator={false}
                  />
                  <BusinessCategoryAll
                    dataCategory={img}
                  />
                </>
              }
            </ViewStyled>
          </ViewStyled>

          <ScrollView
            scrollEnabled={false}
            horizontal={true}
            contentContainerStyle={{
              width: widthPercentageToDP(100),
              height:
                loadingSkeletonEmpresas
                  ? heightPercentageToDP(100)
                  : heightPercentageToDP(16 + (empresaslength * 23))
              ,
              justifyContent: 'center',
              alignItems: 'flex-start',
              backgroundColor: theme.transparent,
            }}
          >
            {
              loadingSkeletonEmpresas
                ? SkeletonBusiness()
                : <FlatList
                  contentContainerStyle={{
                    paddingTop: 15,
                    paddingBottom: 10,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  horizontal={false}
                  scrollEnabled={false}
                  data={dataEmpresas.slice(0, empresaslength)}
                  renderItem={({ item }) =>
                    <ListItem
                      item={item}
                      key={item.codigoEmpresa}
                    />
                  }
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  onEndReachedThreshold={0.7}
                  ListFooterComponent={() => (
                    loadingMoreEmpresas
                      ? <ActivityIndicator size="large" color={theme.secondary} />
                      : hasMore
                        ? <ButtonNext onPress={SeeMoreEmpresas} text={'Ver más'} width={40} />
                        : <></>
                  )}
                />
            }
          </ScrollView>
        </ViewStyled>
      </ScrollView>

      <FloatingButton bottom={heightPercentageToDP(10)} />
    </>
  );
}