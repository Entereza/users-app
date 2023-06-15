import React, { useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { theme } from '../utils/theme'
import ViewStyled from '../components/ui/ViewStyled'
import TextStyled from '../components/ui/TextStyled'
import HeaderStyled from '../components/ui/HeaderStyled'
import { fetchWithToken } from '../utils/fetchWithToken'
import { codeErrors } from '../utils/codeErrors'
import ListItem from '../components/business/ListItem'
import { useSelector } from 'react-redux'

export default function BusinessCategoryScreen({ route }) {
    const { location } = useSelector(state => state.auth);

    const { data } = route.params;

    const [page, setPage] = useState(0);

    const [hasMore, setHasMore] = useState(true);
    const [finalEmpresas, setFinalEmpresas] = useState(false);

    const [dataItems, setDataItems] = useState([]);

    const [notFound, setNotFound] = React.useState(false);

    const nextPage = () => {
        setPage(page + 1);
    };

    const getInfo3 = async () => {
        try {
            const lat = await location.coords?.latitude
            const lng = await location.coords?.longitude

            let res = await fetchWithToken(
                `entereza/emp_hub_filt?patron=Empresa&opcion=2&pageno=${page}&size=100&ciudad=${data.ciudad}&categoria=${data.codigoRubro}&lat=${lat}&lng=${lng}`,
                "GET"
            );

            const { entereza, empresasHUBWColors, empresasImages, empHorariosSuc } = await res.json();

            if (entereza.codeError === codeErrors.cod200) {
                let empresasLenght = empresasHUBWColors.empresasHUBLinks.length
                console.log('Lenght Empresas On Category: ', empresasLenght)

                if (empresasLenght === 0) {
                    setFinalEmpresas(true)
                    if (page === 0) {
                        setNotFound(true)
                    }
                    setHasMore(false)
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

                setDataItems((prev) => [...prev, ...newEmpresa]);

            } else {
                console.log("Error Entereza Business");
            }
        } catch (err) {
            console.log("Error entereza BusinessCategoryItem: ", err)
        }
    }

    const reloadEmp = async () => {
        setFinalEmpresas(false)
        setDataItems([])
        console.log('reloadEmp')
        setHasMore(true)
    }

    React.useEffect(() => {
        if (location.address.state !== null) {
            if (finalEmpresas !== true) {
                getInfo3()
            }
        }
    }, [location, page])

    return (
        <>
            <ViewStyled
                backgroundColor={theme.primary}
                paddingTop={1}
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <HeaderStyled
                    title={data.nombre}
                    routeName={"BusinessCategory"}
                    reloadEmp={reloadEmp}
                    reset={getInfo3}
                />

                <ViewStyled
                    width={100}
                    height={88}
                    marginTop={1}
                    backgroundColor={theme.transparent}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {
                        dataItems
                            ? <FlatList
                                contentContainerStyle={{
                                    paddingBottom: 60,
                                    width: '100%',
                                }}
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                data={dataItems}
                                renderItem={({ item }) => <ListItem item={item} key={item.codigoEmpresa} />}
                                numColumns={1}
                                onEndReachedThreshold={0.7}
                                onEndReached={nextPage}
                                ListFooterComponent={() =>
                                    notFound
                                        ? <ViewStyled
                                            width={100}
                                            height={6}
                                            backgroundColor={theme.transparent}
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
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
                                                {`Lo sentimos. No se encontraron empresas.`}
                                            </TextStyled>
                                        </ViewStyled>
                                        : hasMore
                                            ? <ViewStyled
                                                width={90}
                                                height={7}
                                                backgroundColor={theme.transparent}
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "flex-start",
                                                }}
                                            >
                                                <ActivityIndicator size="large" color={theme.secondary} />
                                            </ViewStyled>
                                            : <ViewStyled
                                                width={90}
                                                height={7}
                                                backgroundColor={theme.transparent}
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "flex-start",
                                                }}
                                                marginLeftAuto
                                                marginRightAuto
                                                marginTop={2}
                                            >
                                                <TextStyled
                                                    fontSize={14}
                                                    fontWeight="400"
                                                    color={theme.tertiary}
                                                >
                                                    {`Estas son todas las empresas en: ${data.nombre}.`}
                                                </TextStyled>
                                            </ViewStyled>
                                }
                            />
                            : <ViewStyled
                                backgroundColor={theme.transparent}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <ActivityIndicator size="large" color={theme.secondary} />
                            </ViewStyled>
                    }
                </ViewStyled>
            </ViewStyled>
        </>
    )
}