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
import { RefreshControl } from 'react-native'

const DEFAULT_IMAGE = require('../assets/business/01.png');
const DEFAULT_BACKGROUND = require('../assets/business/GradientBackground.png');
const HORARIO_STATUS = {
    OPEN: 0,
    CLOSED: 1,
    EMPTY: 2,
    OTHER: 3,
};

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

        getInfo3()
        setHasMore(true)
    };

    function processEmpresa(empresa, images, horarios, sucursales, codKilometros) {
        const imgEmpresa = images[empresa.codigoEmpresa];
        const horarioEmpresa = horarios[empresa.codigoEmpresa];
        const sucursalEmpresa = sucursales[empresa.codigoEmpresa];
        const codKmEmpresa = codKilometros[empresa.codigoEmpresa];

        empresa.img = imgEmpresa ? { uri: `${imgEmpresa.imgEmpresa}` } : DEFAULT_IMAGE;
        empresa.background = imgEmpresa ? { uri: `${imgEmpresa.imgPortadaEmpresa}` } : DEFAULT_BACKGROUND;
        empresa.horario = horarioEmpresa ? horarioEmpresa.estado : 'empty';
        empresa.numeroSucursales = sucursalEmpresa ? sucursalEmpresa.numeroSucursales : 0;
        empresa.codKm = codKmEmpresa ? codKmEmpresa.km : Number.MAX_SAFE_INTEGER;

        switch (empresa.horario) {
            case true:
                empresa.horarioOrden = HORARIO_STATUS.OPEN;
                break;
            case false:
                empresa.horarioOrden = HORARIO_STATUS.CLOSED;
                break;
            case 'empty':
                empresa.horarioOrden = HORARIO_STATUS.EMPTY;
                break;
            default:
                empresa.horarioOrden = HORARIO_STATUS.OTHER;
        }

        newEmpresaArray.push(empresa);
    }

    function createLookup(array, key) {
        return array.reduce((lookup, item) => {
            lookup[item[key]] = item;
            return lookup;
        }, {});
    }

    function sortEmpresas(a, b) {
        if (a.horarioOrden < b.horarioOrden) return -1;
        if (a.horarioOrden > b.horarioOrden) return 1;

        if (a.codKm < b.codKm) return -1;
        if (a.codKm > b.codKm) return 1;

        return 0;
    }

    const [isProcessing, setIsProcessing] = React.useState(false);

    const newEmpresaArray = [];

    const getInfo3 = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const lat = await location.coords?.latitude
            const lng = await location.coords?.longitude

            let res = await fetchWithToken(
                `entereza/emp_hub_filt?patron=Empresa&opcion=2&pageno=${page}&size=100&ciudad=${data.ciudad}&categoria=${data.codigoRubro}&lat=${lat}&lng=${lng}`,
                "GET"
            );

            const { entereza, empresasHUBWColors, empresasImages, empHorariosSuc } = await res.json();

            // console.log("dataTam: ", empresasHUBWColors)

            if (entereza.codeError === codeErrors.cod200) {
                const imagesLookup = createLookup(empresasImages.lista_empresas_img, 'codigoEmpresa');
                const horariosLookup = createLookup(empHorariosSuc.horariosEmpresa, 'codigoEmpresa');
                const sucursalesLookup = createLookup(empHorariosSuc.noSucursales, 'codigoEmpresaHub');
                const codKilometrosLookup = createLookup(empHorariosSuc.codKilometros, 'codigoEmpresa');

                empresasHUBWColors.empresasHUBLinks.forEach((empresa) => {
                    processEmpresa(empresa, imagesLookup, horariosLookup, sucursalesLookup, codKilometrosLookup)
                })

                newEmpresaArray.sort(sortEmpresas)

                setDataItems((prev) => [...prev, ...newEmpresaArray]);
            } else {
                console.log("Error Entereza Business");
            }
        } catch (err) {
            console.log("Error entereza BusinessCategoryItem: ", err)
        } finally {
            setHasMore(false)
            setIsProcessing(false);
            setRefreshing(false)
        }
    }

    const reloadEmp = async () => {
        setPage(0)
        setFinalEmpresas(false)
        setDataItems([])
        console.log('reloadEmp Starts')
        setHasMore(true)
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setPage(0)
        setFinalEmpresas(false)
        setDataItems([])
        console.log('Starts onRefresh: ', page, dataItems.length)
        setHasMore(true)
        setRefreshing(true)
    }

    React.useEffect(() => {
        if (location.ubication !== null) {
            getInfo3()
        }
    }, [location])

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
                                initialNumToRender={dataItems.length}
                                keyExtractor={(item) => item.codigoEmpresa.toString()}
                                renderItem={({ item }) => <ListItem item={item} />}
                                numColumns={1}
                                // onEndReachedThreshold={0.5}
                                // onEndReached={() => {
                                //     if (!isProcessing) {
                                //         nextPage()
                                //     }
                                // }}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
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