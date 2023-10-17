// REACT 
import React, { useEffect } from 'react';

// LIBRARIES 
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// CUSTOM 
import { Alert } from 'react-native'
import PublicNavigation from './PublicNavigation';
import PrivateNavigation from './PrivateNavigation';
import { __authValidate } from '../redux/actions/authActions';
import LoaderScreen from '../screens/LoaderScreen';
import ModalUpdates from '../components/Modals/ModalUpdates';
import * as Updates from 'expo-updates';
import { _uiFinishChecking, _uiStartChecking } from '../redux/actions/uiActions';
import { StatusBar } from 'expo-status-bar';

export default function AppNavigation() {
  const User = useSelector(state => state.auth)
  const { info } = useSelector(state => state.auth);

  const { user } = useSelector(state => state.auth);
  const { checking } = useSelector(state => state.ui);

  const [textUpdates, setTextUpdates] = React.useState(true);
  const [updateAvailable, setUpdateAvailable] = React.useState(false);

  const dispatch = useDispatch();

  const checkForUpdates = async () => {
    try {
      dispatch(_uiStartChecking())
      console.log('Checking for updates...')
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setUpdateAvailable(true);
        await Updates.fetchUpdateAsync();

        await Updates.reloadAsync();
      } else {

        setUpdateAvailable(false)
        console.log('Close Updates.')

        console.log('No hay updates disponibles');
        dispatch(__authValidate());
        setTextUpdates(false)
      }
    } catch (e) {
      setTextUpdates(false)
      dispatch(__authValidate());

      console.log(e);
    }
  }

  useEffect(() => {
    checkForUpdates();
  }, []);

  const [buttonOpen, setButtonOpen] = React.useState(null)

  const VerifyDataUser = async () => {
    try {
      console.log('Starts VerifyDataUser...')
      const CI = await info.usuarioBean?.carnet_identidad
      const Sexo = await info.usuarioBean?.sexo
      const Fecha = await info.usuarioBean?.fecha_nacimiento
      const Numero = await info.usuarioBean?.contacto
      // console.log('Info Of User', User.info.usuarioBean)

      // Info Of User {"apellidos": "12345", "carnet_identidad": null, "codigo_usuario": "USR-3c315fa0", "contacto": null, "extension_carnet": "", "fecha_nacimiento": null, "mail": "2@gmail.com", "nombres": "1234", "sexo": ""}

      if (CI !== null && Sexo !== null && Sexo !== '' && Fecha !== null && Numero !== null) {
        console.log('Valores Completos... Pasa a Wallet')
        setButtonOpen(false)
      } else {
        setButtonOpen(true)
        console.log('Valores Incompletos... Pasa a Modals')
      }
    } catch (error) {
      console.log('VerifyDataUser Error: ', error)
    }
  }

  React.useEffect(() => {
    if (info && info.usuarioBean) {
      VerifyDataUser()
    } else {
      console.log('Info Nula no se puede realizar comprobación.')
    }
  }, [info])

  if (checking) {
    return (
      <>
        <LoaderScreen textUpdates={textUpdates} updateAvailable={updateAvailable} />
      </>
    )
  } else {
    return (
      <NavigationContainer>
        <StatusBar hideTransitionAnimation='fade' hidden={true} />
        <ModalUpdates />
        {
          user
            ? <PrivateNavigation dataUsersIsNotComplete={buttonOpen} />
            : <PublicNavigation />
        }
      </NavigationContainer>
    )
  }
}