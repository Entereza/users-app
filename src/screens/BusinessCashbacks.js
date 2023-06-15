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

export default function BusinessCashbacks({ route }) {
    const { ciudad } = route.params;
    const { location } = useSelector(state => state.auth);

    // console.log('BusinessCashbacksScreen Data: ', ciudad)

    const [hasMore, setHasMore] = useState(true);

    const [dataItems, setDataItems] = useState([]);

    const [notFound, setNotFound] = React.useState(false);

    const getInfo3 = async () => {
        try {

            const lat = await location.coords?.latitude
            const lng = await location.coords?.longitude

            let city;
            if (ciudad === "La Paz") {
                city = 'LP'

            }
            if (ciudad === "Cochabamba") {
                city = 'CB'
            }
            if (ciudad === "Santa Cruz") {
                city = 'SC'
            }
            if (ciudad === "Oruro") {
                city = 'OR'
            }

            // console.log('Cashbacks: ', coords, ciudad)

            let res = await fetchWithToken(
                `entereza/emp_hub_filt?patron=Empresa&opcion=5&pageno=0&size=50&ciudad=${city}&categoria=COD-RUB-343&lat=${lat}&lng=${lng}`,
                "GET"
            );

            const { entereza, empresasHUBWColors, empresasImages, empHorariosSuc } = await res.json();

            if (entereza.codeError === codeErrors.cod200) {

                let empresasLenght = empresasHUBWColors.empresasHUBLinks.length

                console.log("BusinessCashbacks: ", empresasLenght)

                if (empresasLenght !== 0) {
                    let newEmpresa = empresasHUBWColors.empresasHUBLinks.map((empresa) => {
                        let imgEmpresa = empresasImages.lista_empresas_img.find(
                            (img) => img.codigoEmpresa === empresa.codigoEmpresa
                        );
                        let backgroundEmpresa = empresasImages.lista_empresas_img.find(
                            (background) => background.codigoEmpresa === empresa.codigoEmpresa
                        );
                        let horariosEmpresa = empHorariosSuc.horariosEmpresa.find(
                            (horario) => horario.codigoEmpresa === horario.codigoEmpresa
                        );
                        let noSucursales = empHorariosSuc.noSucursales.find(
                            (sucursal) => sucursal.codigoEmpresaHub === empresa.codigoEmpresa
                        );
                        let codKm = empHorariosSuc.codKilometros.find((k) => k.codigoEmpresa === empresa.codigoEmpresa);

                        empresa.img = imgEmpresa ? { uri: `${imgEmpresa.imgEmpresa}` } : require('../assets/business/01.png')
                        empresa.background = backgroundEmpresa ? { uri: `${backgroundEmpresa.imgPortadaEmpresa}` } : require('../assets/business/GradientBackground.png')
                        empresa.horario = horariosEmpresa ? horariosEmpresa.estado : false;
                        empresa.numeroSucursales = noSucursales ? noSucursales.numeroSucursales : 0;
                        empresa.codKm = codKm ? codKm.km : Number.MAX_SAFE_INTEGER;

                        return empresa;
                    });

                    newEmpresa.sort((a, b) => {
                        if (a.horario && !b.horario) {
                            return -1;
                        } else if (!a.horario && b.horario) {
                            return 1;
                        } else {
                            if (a.codKm === b.codKm) {
                                return b.ahorro - a.ahorro;
                            } else {
                                return a.codKm - b.codKm;
                            }
                        }
                    });
                    newEmpresa.sort((a, b) => b.ahorro - a.ahorro);

                    setDataItems((prev) => [...prev, ...newEmpresa]);
                } else {
                    setNotFound(true)
                }
            } else {
                console.log("Error Entereza Business");
            }
        } catch (err) {
            console.log("Error entereza BusinessCategoryItem: ", err)
        }
    }

    React.useEffect(() => {
        if (location.address.state !== null) {
            getInfo3()
        }
    }, [location])

    const reloadEmp = async () => {
        setDataItems([])
        console.log('reloadEmp')
        setHasMore(true)
    }

    return (
        <>
            <ViewStyled
                backgroundColor={theme.background}
                style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <HeaderStyled
                    title={'Los Cashbacks más Locos'}
                    routeName={"BusinessCashbacks"}
                    reloadEmp={reloadEmp}
                />
                <ViewStyled
                    width={100}
                    height={88}
                    paddingTop={1}
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
                                }}
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                data={dataItems}
                                renderItem={({ item }) => <ListItem item={item} key={item.codigoEmpresa} />}
                                numColumns={1}
                                onEndReachedThreshold={0.7}
                                onEndReached={
                                    notFound
                                        ? console.log('No se encontaron Empresas.')
                                        : () => { setHasMore(false) }
                                }
                                ListFooterComponent={() =>
                                    notFound
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
                                                    justifyContent: "center",
                                                }}
                                                marginLeftAuto
                                                marginRightAuto
                                            >
                                                <TextStyled
                                                    textAlign='center'
                                                    fontSize={14}
                                                    color={theme.tertiary}
                                                >
                                                    Estas son las empresas con Cashbacks más Locos
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