import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme_colors } from "../../../utils/theme/theme_colors";
import TextStyled from "../../../utils/ui/TextStyled";
import ViewStyled from "../../../utils/ui/ViewStyled";
import MapView, { Marker } from 'react-native-maps';
import { private_name_routes } from "../../../utils/route/private_name_routes";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";
import BackButton from "../../../components/Buttons/BackButton";
import BigBottomButton from "../../../components/Buttons/BigBottomButton";
import { TextInput, GestureHandlerRootView } from "react-native-gesture-handler";

export default function SaveAddressScreen () {
    const navigation = useNavigation();

    const route = useRoute();
    const { location } = route.params;

    const [isSearchActive, setSearchActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchRef, setSearchRef] = useState('');

    const handleSearchButtonPress = () => {
        setSearchActive(true);
    };

    const handleSearch = () => {
        setSearchActive(false);
    };

    const goToHomeScreen = () => {
        navigation.navigate(private_name_routes.empresas.empresasHome);
    }

    return (
        <GestureHandlerRootView>
            <KeyboardAvoidingView
                behavior="position"
                style={{ flex: 1 }}
            >
                <ViewStyled 
                    width={'100%'}
                    height={'100%'}
                    backgroundColor={theme_colors.transparent}
                >
                    <MapView
                        width={'100%'}
                        height={'100%'}
                        style={{
                            alignItems: 'center'
                        }}
                        initialRegion={{
                            latitude: location ? location.latitude : -16.5429756, 
                            longitude: location ? location.longitude : -68.0809987,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                    >
                        {location && 
                            <Marker coordinate={location} />
                        }
                    </MapView>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            position: 'absolute',
                            top: '3%',
                            width: '15%',
                            padding: 15,
                            alignItems: 'flex-start'
                        }}
                    >
                        <BackButton />
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.white}
                        style={{
                            position: 'absolute',
                            bottom: '3%',
                            width: '90%',
                            padding: 15,
                            borderRadius: 10,
                            alignSelf: 'center'
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
                            Nombre del lugar
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
                                placeholder={"Ej. Casa"}
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
                            Referencias del lugar
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
                                value={searchRef}
                                onChangeText={setSearchRef}
                                placeholder={"Ej. Frente al parque"}
                                placeholderTextColor={theme_colors.grey}
                                onSubmitEditing={handleSearch}
                            />
                        </TouchableOpacity>

                        <BigBottomButton text={"Guardar ubicación"} textColor={theme_colors.white} color={theme_colors.primary} onPress={goToHomeScreen} width={'100%'} marginTop={15}/>
                    </ViewStyled>
                </ViewStyled>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};