import { useState } from "react";
import BigBottomButton from "../../../components/Buttons/BigBottomButton";
import { theme_colors } from "../../../utils/theme/theme_colors";
import TextStyled from "../../../utils/ui/TextStyled";
import ViewStyled from "../../../utils/ui/ViewStyled";
import { TextInput, GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { private_name_routes } from "../../../utils/route/private_name_routes";

export default function FacturacionScreen(){
    const route = useRoute();
    const { facturacion } = route.params;

    const [isSearchActive, setSearchActive] = useState(false);
    const [searchText, setSearchText] = useState(facturacion.find(facturacion => facturacion.id === 1).name);
    const [searchNit, setSearchNit] = useState(facturacion.find(facturacion => facturacion.id === 1).nit);

    const handleSearchButtonPress = () => {
        setSearchActive(true);
    };

    const handleSearch = () => {
        setSearchActive(false);
    };

    const navigation = useNavigation();

    // CORREGIR ENVIO DE DATOS, CRUCE CON EL CASHBACK 
    const goToConfirmScreen = () => {
        navigation.navigate(private_name_routes.empresas.confirmOrder, {
            selection: [searchText, searchNit]
        });
    }

    return (
        <GestureHandlerRootView>
            <KeyboardAvoidingView
                behavior="position"
                style={{ flex: 1 }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.white}
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={'100%'}
                        height={'77%'}
                        backgroundColor={theme_colors.white}
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontSize={10}
                            color={theme_colors.primary}
                            style={{
                                alignSelf: 'flex-start',
                                margin: 10,
                                marginLeft: 20,
                                fontFamily: 'SFPro-Bold',
                            }}
                        >
                            Datos de facturación
                        </TextStyled>

                        <ViewStyled
                            width={'90%'}
                            height={'0.2%'}
                            backgroundColor={theme_colors.greyLine}
                            style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                                marginTop: 5
                            }}
                        />

                        <ViewStyled
                            width={'90%'}
                            backgroundColor={theme_colors.white}
                            style={{
                                alignContent: 'center',
                            }}
                        >
                            <TextStyled
                                fontSize={7}
                                color={theme_colors.black}
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SFPro-Bold',
                                    marginTop: 10
                                }}
                            >
                                Nombre / Razón Social
                            </TextStyled>

                            <TouchableOpacity
                                onPress={handleSearchButtonPress}
                                style={{
                                    width: '100%',
                                    height: 40,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: theme_colors.white,
                                    borderColor: theme_colors.white,
                                    padding: 8,
                                    marginBottom: 10,
                                    marginTop: 10,
                                    elevation: 50,
                                    shadowColor: theme_colors.black,
                                    shadowOffset: {
                                        width: 2,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }}
                            >
                                <TextInput
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    placeholder={facturacion.find(facturacion => facturacion.id === 1).name}
                                    placeholderTextColor={theme_colors.grey}
                                    onSubmitEditing={handleSearch}
                                />
                            </TouchableOpacity>

                            <TextStyled
                                fontSize={7}
                                color={theme_colors.black}
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SFPro-Bold',
                                    marginTop: 10
                                }}
                            >
                                CI / NIT
                            </TextStyled>

                            <TouchableOpacity
                                onPress={handleSearchButtonPress}
                                style={{
                                    width: '100%',
                                    height: 40,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: theme_colors.white,
                                    borderColor: theme_colors.white,
                                    padding: 8,
                                    marginBottom: 10,
                                    marginTop: 10,
                                    elevation: 50,
                                    shadowColor: theme_colors.black,
                                    shadowOffset: {
                                        width: 2,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                }}
                            >
                                <TextInput
                                    value={searchNit}
                                    onChangeText={setSearchNit}
                                    placeholder={facturacion.find(facturacion => facturacion.id === 1).nit}
                                    placeholderTextColor={theme_colors.grey}
                                    onSubmitEditing={handleSearch}
                                />
                            </TouchableOpacity>
                        </ViewStyled>
                    </ViewStyled>

                    <ViewStyled
                        width={'100%'}
                        height={'20%'}
                        backgroundColor={theme_colors.white}
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <BigBottomButton text={"Guardar cambios"} color={theme_colors.primary} textColor= {theme_colors.white} width={'90%'} onPress={goToConfirmScreen} marginTop={15}/>
                    </ViewStyled>
                </ViewStyled>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};