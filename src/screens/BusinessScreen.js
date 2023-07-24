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

export default function BusinessHome() {
  const [page, setPage] = useState(0);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true)
  const [loadingSkeletonEmpresas, setLoadingSkeletonEmpresas] = useState(true)
  const [loadingMoreEmpresas, setLoadingMoreEmpresas] = useState(true)

  const { location } = useSelector(state => state.auth);
  const navigation = useNavigation()

  const RedirectUbication = () => {
    navigation.navigate("ChangeUbication")
  }
  const nextPage = () => {
    setPage(page + 1);
  };

  let arrayRubros = ([])

  const [img, setImg] = useState([]);

  const [empresaslength, setEmpresaslength] = useState(5);
  const [empresaslengthTotal, setEmpresaslengthTotal] = useState(0);

  const [hasMore, setHasMore] = useState(false);
  const [startPromotions, setStartPromotions] = useState(0);
  const [dataEmpresas, setDataEmpresas] = useState([]);

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
      setLoadingSkeleton(true)
      setLoadingSkeletonEmpresas(true)
      setLoadingMoreEmpresas(true)

      let ciudad = '';
      if (location.address.state !== null) {
        if (location.address.state == "La Paz") {
          ciudad = 'LP'

        }
        if (location.address.state == "Cochabamba") {
          ciudad = 'CB'
        }
        if (location.address.state == "Santa Cruz") {
          ciudad = 'SC'
        }
        if (location.address.state == "Oruro") {
          ciudad = 'OR'
        }

        let res = await fetchWithToken(`entereza/rubros`, "GET");

        const { entereza, rubros, imgRubros } = await res.json();

        if (entereza.codeError === "COD200") {
          if (location.address?.state === "Cochabamba" || location.address?.state === "La Paz") {
            rubros.forEach(rubro => {
              if (rubro.ciudad === ciudad) {
                let imgCategory = imgRubros.find(
                  (image) => image.codigo_rubro === rubro.codigoRubro
                )
                rubro.image = imgCategory ? { uri: `${imgCategory.img_rubro}` } : require('../../assets/img/NoCategory.png')

                arrayRubros.push(rubro)
              }
            });
            setImg(arrayRubros);
            setLoadingSkeleton(false)
            getInfoEmpresas5()
            setStartPromotions(true)
          } else {
            setHasMore(false)
            navigation.navigate("ChangeUbication")
          }
        } else {
          setHasMore(false)
        }

      } else {
        console.log("Error No Location");
      }
    } catch (error) {
      console.log("Error entereza BusinessScreen", error);
    }
  };

  const getInfoEmpresas5 = async () => {
    try {
      setDataEmpresas([])

      let city;
      if (location.address.state == "La Paz") {
        city = 'LP'
      }
      if (location.address.state == "Cochabamba") {
        city = 'CB'
      }
      if (location.address.state == "Santa Cruz") {
        city = 'SC'
      }
      if (location.address.state == "Oruro") {
        city = 'OR'
      }

      const lat = await location.coords?.latitude
      const lng = await location.coords?.longitude

      console.log('Latitud: ', lat, '- Longitud: ', lng)

      let res = await fetchWithToken(
        `entereza/emp_hub_filt?patron=Empresa&opcion=1&pageno=0&size=15&ciudad=${city}&categoria=COD-RUB-343&lat=${lat}&lng=${lng}`,
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

        setLoadingSkeletonEmpresas(false)
        setLoadingMoreEmpresas(false)
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
    setRefreshing(true)
    setHasMore(false)
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

  useEffect(() => {
    if (location !== null) {
      if (location.address !== null) {
        setHasMore(true)
        getInfo();
      } else {
        console.log('location is null')
        RedirectUbication()
      }
    } else {
      return
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
          height={60 + (empresaslength * 23)}
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: 50,
          }}
        >
          <BusinessInputRedirect city={location !== null ? location.address.state : 'Cochabamba'} loadingSkeleton={loadingSkeleton} />

          <BusinessPromotions
            city={location ? location.address.state : 'Cochabamba'}
            reload={loadingSkeleton}
            start={startPromotions}
          />

          <ViewStyled
            backgroundColor={theme.transparent}
            width={95}
            height={13}
            marginTop={2}
            marginLeftAuto
            marginRightAuto
          >
            {/* <BusinessBubbles city={location !== null ? location.address.state : 'Cochabamba'} loadingSkeleton={loadingSkeleton} /> */}

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
              {loadingSkeleton
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
    </>
  );
}