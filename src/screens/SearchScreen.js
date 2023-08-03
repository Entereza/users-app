import React from "react";
import { FlatList, ActivityIndicator, ScrollView, TextInput } from "react-native";

import { theme } from "../utils/theme";
import { fetchWithToken } from "../utils/fetchWithToken";
import ViewStyled from "../components/ui/ViewStyled";
import TextStyled from "../components/ui/TextStyled";
import { codeErrors } from "../utils/codeErrors";
import { Ionicons } from "@expo/vector-icons";
import adjustFontSize from "../utils/adjustText";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import ListItem from "../components/business/ListItem";
import { customStyles } from "../utils/customStyles";
import { useSelector } from "react-redux";

export default function SearchScreen({ route }) {
  const [loadingMoreEmpresas, setLoadingMoreEmpresas] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('')

  const { nameUser, city } = route.params;

  const [dataSearch, setDataSearch] = React.useState([])
  const [dataEmpresas, setDataEmpresas] = React.useState(1)

  const { location } = useSelector(state => state.auth);

  const SearchBusiness = async () => {
    try {
      const lat = await location.coords?.latitude
      const lng = await location.coords?.longitude

      let res = await fetchWithToken(`entereza/emp_hub_filt?patron=${searchValue}&opcion=3&pageno=0&size=10&ciudad=${city}&categoria=&lat=${lat}&lng=${lng}`);

      const { entereza, empresasHUBWColors, empresasImages, empHorariosSuc } = await res.json();

      let empresasHUBlength = empresasHUBWColors.empresasHUBLinks.length

      console.log('SearchValue: ', searchValue, '- ', searchValue.length, '- ', dataEmpresas, '- ', empresasHUBlength)

      if (entereza.codeError === codeErrors.cod200) {
        if (empresasHUBlength !== 0) {
          setNotFound(false)
          console.log('empresasHUBlength Search: ', empresasHUBlength)
          setDataEmpresas(empresasHUBlength)

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

          setDataSearch((prev) => [...prev, ...newEmpresa]);
          setHasMore(false);
        } else {
          if (searchValue !== '') {
            setNotFound(true)
          }
        }
      } else {
        console.log("Error Entereza Search", entereza);
        setHasMore(true)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMoreEmpresas(false)
    }
  };

  React.useEffect(() => {
    let timer = null;

    if (searchValue.length > 0) {
      setLoadingMoreEmpresas(true);

      timer = setTimeout(() => {
        setDataSearch([]);
        SearchBusiness();
      }, 500);

    } else {
      setDataSearch([]);
      setLoadingMoreEmpresas(false);
      setHasMore(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  return (
    <>
      <ViewStyled
        backgroundColor={theme.background}
        width={100}
        height={100}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: theme.background,
            height: heightPercentageToDP(40 + (dataEmpresas * 23)),
          }}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}
        >
          <ViewStyled
            marginTop={1}
            backgroundColor={theme.transparent}
            width={100}
            height={7}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ViewStyled
              width={96}
              height={6}
              backgroundColor={theme.primary}
              borderRadius={2}
              paddingHorizontal={3}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: theme.tertiaryGradient,
                ...customStyles.shadowStyle
              }}
            >
              <TextInput
                autoFocus={true}
                value={searchValue}
                onChangeText={value => { setSearchValue(value) }}
                keyboardType={"default"}
                placeholder={`¿Qué estás buscando ${nameUser}?`}
                style={{
                  backgroundColor: theme.transparent,
                  width: "90%",
                }}
              />
              <Ionicons
                name="search"
                color={theme.tertiary}
                size={adjustFontSize(20)}
                onPress={SearchBusiness}
              />
            </ViewStyled>
          </ViewStyled>


          <ScrollView
            scrollEnabled={false}
            horizontal={true}
            contentContainerStyle={{
              width: widthPercentageToDP(100),
              height: dataSearch.length > 0 ? heightPercentageToDP(10 + (dataEmpresas * 23)) : heightPercentageToDP(12),
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: theme.transparent
            }}
          >
            <FlatList
              contentContainerStyle={{
                paddingBottom: 10,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              horizontal={false}
              scrollEnabled={false}
              data={dataSearch}
              renderItem={({ item }) => <ListItem item={item} key={item.codigoEmpresa} />}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.7}
              ListFooterComponent={() => (
                loadingMoreEmpresas
                  ? <ActivityIndicator size="large" color={theme.secondary} />
                  : notFound
                    ? <ViewStyled
                      width={100}
                      height={6}
                      backgroundColor={theme.transparent}
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <TextStyled
                        fontSize={15}
                        color={theme.tertiary}
                        textAlign='center'
                        style={{
                          width: '90%'
                        }}
                      >
                        {`Lo sentimos. No se encontraron empresas para: ${searchValue}.`}
                      </TextStyled>
                    </ViewStyled>
                    : hasMore
                      ? <></>
                      : <ViewStyled
                        width={100}
                        height={6}
                        backgroundColor={theme.transparent}
                        style={{
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <TextStyled
                          fontSize={15}
                          fontWeight='400'
                          color={theme.tertiary}
                          textAlign='center'
                          style={{
                            width: '90%'
                          }}
                        >
                          Estas son las empresas encontradas.
                        </TextStyled>
                      </ViewStyled>
              )}
            />
          </ScrollView>

        </ScrollView>
      </ViewStyled>

    </>
  );
}