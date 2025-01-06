import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { theme_colors } from "../../../utils/theme/theme_colors";
import TextStyled from "../../../utils/ui/TextStyled";
import ViewStyled from "../../../utils/ui/ViewStyled";
import MapView, { Marker } from 'react-native-maps';
import { private_name_routes } from "../../../utils/route/private_name_routes";
import { Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import OrderStatus from "../../../components/Text/OrderStatus";
import CallButton from "../../../components/Buttons/CallButton";
// import dotenv from 'dotenv';

export default function FollowOrder () {

    const latitud = -16.5429756;
    const longitud = -68.0809987;

    const navigation = useNavigation();

    const goToHomeScreen = () => {
        navigation.navigate(private_name_routes.empresas.empresasHome);
    }

    // dotenv.config();

    // const apiKey = process.env.GOOGLE_API_KEY;

    const [coordinates] = useState([
        {
          latitude: 48.8587741,
          longitude: 2.2069771,
        },
        {
          latitude: 48.8323785,
          longitude: 2.3361663,
        },
    ]);

    return (
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
                    // latitude: coordinates[0].latitude,
                    // longitude: coordinates[0].longitude,
                    latitude: latitud, 
                    longitude: longitud,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
                <Marker coordinate={{latitude: latitud, longitude: longitud}} />

                {/* GOOGLE MAPS API KEY  */}
                {/* <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={apiKey}
                    strokeWidth={4}
                    strokeColor="#111111"
                />
                    
                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} /> */}
            </MapView>

            <Pressable
                onPress={goToHomeScreen}
                backgroundColor={theme_colors.primary}
                style={{
                    position: 'absolute',
                    top: '5%',
                    width: '90%',
                    borderRadius: 15,
                    padding: 15,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TextStyled 
                    fontFamily="SFPro-Bold"
                    fontSize={8}
                    color={theme_colors.white}
                    style={{
                        alignSelf: 'center'
                    }}
                >
                    Ir a menú
                </TextStyled>
            </Pressable>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    alignItems: 'center',
                }}
            >
                <LinearGradient 
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 125)', 'rgba(255, 255, 255, 255)', 'white']}
                >
                    <ViewStyled 
                        width={'100%'}
                        height={'5%'}
                        backgroundColor={theme_colors.transparent}
                   />
                   
                    <ViewStyled 
                        width={'90%'}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            padding: 10,
                            alignSelf: 'center'
                        }}
                    >
                        <ViewStyled
                            width={'55%'}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 8
                            }}  
                        >
                            <ViewStyled
                                style={{
                                    alignItems: 'flex-start',
                                    backgroundColor: theme_colors.transparent,
                                    borderColor: theme_colors.primary,
                                    borderWidth: 3,
                                    borderRadius: 100,
                                    padding: 6
                                }}
                            >
                                <Image
                                    source={{ uri: 'https://media.licdn.com/dms/image/D4E03AQGJolhUiXngJg/profile-displayphoto-shrink_800_800/0/1664905226354?e=2147483647&v=beta&t=aGDAnEIAlLRkIcNnN_flnZsb6pEmbpAuCHMj0_tHgxc' }}
                                    style={{ 
                                        borderRadius: 100,
                                        width: 60, 
                                        height: 60
                                    }}
                                    resizeMode="contain"
                                />
                            </ViewStyled>

                            <ViewStyled
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    alignItems: 'flex-start'
                                }}
                            >
                                <TextStyled
                                    fontFamily="SFPro-Medium"
                                    fontSize={8}
                                    color={theme_colors.black}
                                    style={{
                                        marginBottom: 8
                                    }}
                                >
                                    {/* {repartidor} */}
                                    Anthony Rivera
                                </TextStyled>

                                <TextStyled
                                    fontFamily="SFPro-Medium"
                                    fontSize={4.5}
                                    color={theme_colors.grey}
                                >
                                    {/* {certificado} */}
                                    Certificado
                                </TextStyled>
                            </ViewStyled>
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}  
                        >
                            <ViewStyled
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    alignItems: 'flex-start'
                                }}
                            >
                                <OrderStatus title={"Llegará en"} subtitle={"15 minutos"} icon={"clock"}/>
                                        
                                <Image
                                    source={require("../../../../assets/dots.png")}
                                    resizeMode="contain"
                                />

                                <OrderStatus title={"Estado"} subtitle={"En camino al restaurante"} icon={"map-marked-alt"}/>
                            </ViewStyled>

                            {/* ONPRESS, CALL TO THE DRIVER */}
                            <ViewStyled
                                height={'22%'}
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'column-reverse'
                                }}
                            >
                                <CallButton />
                            </ViewStyled>
                        </ViewStyled>
                    </ViewStyled>
                </LinearGradient>
            </ViewStyled>
        </ViewStyled>
    );
};
