import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { theme_colors } from "../../../utils/theme/theme_colors";
import ViewStyled from "../../../utils/ui/ViewStyled";
import MapView, { Marker } from 'react-native-maps';
import { private_name_routes } from "../../../utils/route/private_name_routes";
import BackButton from "../../../components/Buttons/BackButton";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import BigBottomButton from "../../../components/Buttons/BigBottomButton";

export default function NewAddressMap () {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getLocation = async () => {
            try {
                const { status } = await requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                const location = await getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setSelectedLocation({ latitude, longitude });
            } catch (error) {
                console.error('Error getting location:', error);
            }
        };

        getLocation();
    }, []);

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    }

    const goToSaveAddressScreen = () => {
        if (selectedLocation) {
            navigation.navigate(private_name_routes.empresas.saveAddress, { 
                location: selectedLocation
            });
        }
    }

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
                    latitude: selectedLocation ? selectedLocation.latitude : -16.5429756, 
                    longitude: selectedLocation ? selectedLocation.longitude : -68.0809987,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && 
                    <Marker coordinate={selectedLocation} />
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
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '90%',
                    position: 'absolute',
                    bottom: '2%',
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}
            >
                <BigBottomButton text={"Elegir ubicación"} textColor={theme_colors.white} color={theme_colors.primary} onPress={goToSaveAddressScreen} width={'100%'}/>
            </ViewStyled>
        </ViewStyled>
    );
};