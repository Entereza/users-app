// REACT 
import React, { useEffect } from 'react'

// LIBRARIES 
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// CUSTOM 
import { theme } from '../utils/theme';
import WalletStack from './WalletStack';
import ProfileStack from './ProfileStack';
import BusinessStack from '../navigation/BusinessStack';
import { _uiSetPermission, _uiSetPermissionGps } from '../redux/actions/uiActions';
import { _authSetLocation, __authGetInfo, _authGetInfo, _authSetCityData } from '../redux/actions/authActions';
import * as Location from 'expo-location'
import * as Tracking from 'expo-tracking-transparency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithToken, fetchWithTokenCities } from '../utils/fetchWithToken';
// import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import NotificacionWallet from '../components/Notifications/NotificationsWallet';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoaderScreen from '../screens/LoaderScreen';
import DataUsers from '../screens/DataUsersScreen';
import { codeErrors } from '../utils/codeErrors';

const Tab = createBottomTabNavigator();

export default function PrivateNavigation({ dataUsersIsNotComplete = null }) {

  const navigation = useNavigation()

  React.useEffect(() => {
    if (dataUsersIsNotComplete !== null) {
      console.log('DataUsers: ', dataUsersIsNotComplete)
      if (dataUsersIsNotComplete === true) {
        navigation.navigate('DataUsers');
      } else {
        navigation.navigate('WalletStack');
      }
    }
  }, [dataUsersIsNotComplete])

  const dispatch = useDispatch()
  const User = useSelector(state => state.auth)

  const SendUbicationUser = async (coords, city) => {
    try {
      const Email = await AsyncStorage.getItem('ENT-EMAIL')

      let data = {
        codigoUsuario: Email,
        ciudad: city,
        latidud: coords.latitude,
        longitud: coords.longitude
      }

      console.log('Data Coords: ', data)

      await fetchWithToken("entereza/posicion_usuario", "POST", data)

      console.log('Data Coords Almacenado')

    } catch (error) {
      console.log('Error SendUbicationUser: ', error)
    }
  }

  const UbicationConPermisos = async () => {
    try {
      console.log("Starts Searching UbicationConPermisos Android / IOs")

      const location = await Location.getCurrentPositionAsync({});

      if (!location) {
        console.log('No location available');
        // Manejar el caso en el que no hay ubicación
        Alert.alert('No se pudo obtener su ubicación.', 'Verifique que su ubicación sea accesible')
        UbicationSinPermisos()
        return;
      }

      const { coords } = location;

      console.log('Coords obtenidas: ', coords)

      let res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&addressdetails=1&format=json`, {
        method: 'GET'
      })

      const json = await res.json();
      console.log("Ubicacion Obtenida Android / IOs (Con Permisos): ", coords, '- ', json.address)

      SendUbicationUser(coords, json.address.state)

      dispatch(_authSetLocation({ address: json.address, coords: coords }))
      dispatch(_uiSetPermission(true))
      dispatch(_uiSetPermissionGps(true))
    } catch (err) {
      UbicationSinPermisos()
      console.log("Error Location: ", err)
      if (err.code === 'E_LOCATION_SETTINGS_UNSATISFIED') {
        Alert.alert('Fallo al mostrarte empresas', 'Para mejorar tu experiencia activa tu ubicación.')
        console.log("Code Error Location Off")
      } else {
        Alert.alert('Error al obtener tu ubicación', 'Por favor intenta nuevamente en unos minutos')
      }
    }
  }

  const UbicationSinPermisos = async () => {
    try {
      console.log("Starts Setting UbicationSinPermisos Android / IOs")

      let json = {
        "address": {
          "ISO3166-2-lvl4": "",
          "city": "",
          "country": "Bolivia",
          "country_code": "",
          "county": "",
          "neighbourhood": "",
          "road": "",
          "state": "Cochabamba",
        }
      }

      let json2 = {
        "coords": {
          "latitude": -17.393799834733354,
          "longitude": -66.1569548714268,
          "permissions": false
        }
      }
      console.log("Ubicacion Obtenida Android / IOs (Sin Permisos): ", json.address)
      dispatch(_authSetLocation({ address: json.address, coords: json2.coords }))
    } catch (error) {
      console.log(error)
    }
  }

  const CheckPermisosUbication = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === 'granted') {
      console.log('Permisos de Ubicación (CheckPermisosUbication) Permitidos: ', status)
      UbicationConPermisos()
    } else {
      console.log('Permisos de Ubicación (CheckPermisosUbication) Denegados: ', status)
      UbicationSinPermisos()
    }
  }

  const requestTrackingPermissions = async () => {
    try {
      const { status } = await Tracking.requestTrackingPermissionsAsync();
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data, (RequestPermissions)');
        CheckPermisosUbication()
      } else {
        UbicationSinPermisos()
        console.log('Permisos de Rastreo (RequestPermissions) Denegados: ', status)
      }
    } catch (e) {
      console.warn(e)
    }

  }

  React.useEffect(() => {
    requestTrackingPermissions()
  }, [])

  //Obtener ciudades

  const citiesError = [
    {
      "urlCity": "https://enterezabol.com/enterezacities/2aba059b-5fd7-4e52-9bc7-353d56c11e97.jpg",
      "cityCode": "CB",
      "citieName": "Cochabamba",
      "citieCountry": "Bolivia",
      "latitude": -66.15695,
      "longitude": -17.3938
    },
    {
      "urlCity": "https://enterezabol.com/enterezacities/36703366-576a-406e-8ec2-3bdd9cb134a9.jpg",
      "cityCode": "LP",
      "citieName": "La Paz",
      "citieCountry": "Bolivia",
      "latitude": -16.495659,
      "longitude": -68.13356
    },
    {
      "urlCity": "https://enterezabol.com/enterezacities/bb9fb5b7-c569-41a8-bf30-f28e4bbf5841.jpg",
      "cityCode": "TJ",
      "citieName": "Tarija",
      "citieCountry": "Bolivia",
      "latitude": -64.73431,
      "longitude": -21.53392
    },
    {
      "urlCity": "https://enterezabol.com/enterezacities/d5bb5709-31e9-477e-9bfa-42bc53c6426e.jpg",
      "cityCode": "CH",
      "citieName": "Chuquisaca",
      "citieCountry": "Bolivia",
      "latitude": -19.048529,
      "longitude": -65.2601
    }
  ]

  const handleErrorResponse = async () => {
    try {
      console.log('handleErrorResponse says: Seteando ciudades ...')
      dispatch(_authSetCityData(citiesError));
    } catch (error) {
      console.log('Error Saving handleErrorResponse: ', error)
    }
  }

  const fetchCitiesAndStore = async () => {
    try {
      const response = await fetchWithTokenCities("entereza-cities/obtener-ciudades-query?country=Bolivia&type=PROD", "GET");

      const { entereza, cityList } = await response.json();

      console.log('Respuesta fetchCitiesAndStore: ', entereza)
      if (entereza.codeError === codeErrors.cod200) {
        // Almacenar la información de las ciudades en Redux
        dispatch(_authSetCityData(cityList));
      } else {
        // En caso de error, se puede manejar aquí o usar datos predeterminados
        console.log('Ocurrio un error al obtener las ciudades: ', entereza)
        Alert.alert('Ocurrio un error al obtener las ciudades', `${entereza}`)
        handleErrorResponse();
      }
    } catch (error) {
      console.log("Error al obtener ciudades: ", error);
      Alert.alert('Error al obtener ciudades', `${error}`)
      handleErrorResponse();
    }
  }

  React.useEffect(() => {
    fetchCitiesAndStore()
  }, [])

  //Obtener/Generar tokenMVUser
  const [Repeat, setRepeat] = React.useState(true)

  const SeeToken = async () => {
    const TokenMV = await User.info.token;
    const CI = await User.info.usuarioBean?.carnet_identidad

    console.log('CI user TokenMV: ', CI, '- ', TokenMV)
    if (TokenMV !== null) {
      if (Repeat === true) {
        if (CI !== null) {
          if (TokenMV === false) {
            CrearTokenMV()
          } else if (TokenMV === true) {
            GetTokenMV()
          } else {
            console.log('Error Reading TokenMV')
          }
        } else {
          console.log('No tiene Carnet para el Token')
        }
      } else {
        console.log('Repeat Token: ', Repeat)
      }
    }
  }

  const CrearTokenMV = async () => {
    try {
      console.log("No tiene Token MV")
      const CI = await User.info.usuarioBean?.carnet_identidad
      const mail = await AsyncStorage.getItem('ENT-EMAIL')

      var data = {
        carnet: CI,
        correo: mail
      }

      const res = await fetchWithToken('entereza/save_carnet_mv', "POST", data)
      const {
        entereza,
        token
      } = await res.json()
      console.log('- Entereza Crear: ', entereza, '\n - Token Crear: ', token)

      if (entereza.msgError !== null) {
        setRepeat(false)
        console.log('Token Almacenado (Nuevo)')
        await Promise.all([
          AsyncStorage.setItem('ENT-TKN', token)
        ])
        dispatch(__authGetInfo())
      } else {
        console.log(entereza)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const GetTokenMV = async () => {
    try {
      const CI = await User.info.usuarioBean?.carnet_identidad
      const mail = await AsyncStorage.getItem('ENT-EMAIL')

      var data = {
        carnet: CI,
        correo: mail,
      }

      const res = await fetchWithToken('entereza/get_token_mv', "POST", data)
      const {
        entereza,
        token,
        ...rest
      } = await res.json()
      // console.log('- Entereza Get: ', entereza, '\n - Token Get: ', token)

      if (entereza.codeError === null) {
        setRepeat(false)
        console.log('Token Almacenado (Existente)')
        await Promise.all([
          AsyncStorage.setItem('ENT-TKN', token)
        ])
        dispatch(__authGetInfo())
      } else {
        console.log(entereza)
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (User) {
      if (User.info) {
        SeeToken()
      } else {
        return;
      }
    } else {
      return;
    }
  }, [User])

  React.useEffect(() => {
    if (User.info !== null) {
      registerForPushNotificationsAsync()
        .then(token => {
          if (token) {
            SendTokenExpo(token);
          } else {
            console.log('No se pudo obtener el token.');
          }
        });
    }
  }, [User])

  const registerForPushNotificationsAsync = async () => {
    let token;
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    } catch (error) {
      console.log('An error occurred while getting the Expo push token: ', error);
      return;  // return here to stop execution if there was an error
    }

    // console.log('ExpoToken For Save: ', token);
    return token;
  }

  const SendTokenExpo = async (token) => {
    try {
      const codigoEntidad = await AsyncStorage.getItem('ENT-CODUSR')

      let data = {
        codigoUsuario: codigoEntidad,
        expoToken: token
      };

      // console.log('Data SendTokenExpo: ', data)

      const response = await fetchWithToken("entereza/expo_add", "POST", data)

      const { codeError, msgError } = await response.json()

      if (codeError === 'COD200') {
        dispatch(_authGetInfo())
        console.log('Token Guardado con éxito.')
      } else {
        console.log('SendTokenExpo: ', codeError, msgError)
      }
    } catch (error) {
      console.log('Error Entereza: ', error)
    }
  }

  return (
    <>
      <NotificacionWallet />

      <Tab.Navigator
        initialRouteName={"LoaderScreen"}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.secondary,
          tabBarHideOnKeyboard: true,
          tabBarAllowFontScaling: true,
          tabBarStyle: {
            display: 'flex',
            position: 'absolute',
          },
        }}
      >
        <Tab.Screen
          name="WalletStack"
          component={WalletStack}
          options={({ route }) => {
            const firstTime = route?.params?.params?.firstTime || false;

            // console.log('Route.Params: ', route)
            return {
              tabBarShowLabel: true,
              tabBarLabel: 'Billetera',
              tabBarLabelStyle: { paddingBottom: 2 },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="credit-card" color={color} size={size} />
              ),
              headerShown: false,
              tabBarStyle: { display: firstTime ? 'none' : 'flex' }
            };
          }}
        />

        <Tab.Screen
          name="BusinessStack"
          component={BusinessStack}
          options={{
            tabBarShowLabel: true,
            tabBarLabel: 'Empresas',
            tabBarLabelStyle: { paddingBottom: 2 },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="office-building-marker"
                color={color}
                size={size}
              />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarActiveTintColor: theme.secondary,
            tabBarShowLabel: true,
            tabBarLabel: 'Perfil',
            tabBarLabelStyle: { paddingBottom: 2 },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={"account-circle"}
                color={color}
                size={size}
              />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen
          name="DataUsers"
          component={DataUsers}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          }}
        />

        <Tab.Screen
          name="LoaderScreen"
          component={LoaderScreen}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarItemStyle: { display: 'none' },
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </>
  )
}

