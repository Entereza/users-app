// REACT 
import React, { useEffect } from 'react';

// LIBRARIES 
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// CUSTOM 
import PublicNavigation from './PublicNavigation';
import PrivateNavigation from './PrivateNavigation';
import { __authValidate } from '../redux/actions/authActions';
import LoaderScreen from '../screens/LoaderScreen';
import ModalUpdates from '../components/Modals/ModalUpdates';
import ModalUpdateTest from '../components/Modals/ModalUpdatesTest';
import * as Updates from 'expo-updates';
import { _uiFinishChecking, _uiStartChecking } from '../redux/actions/uiActions';

export default function AppNavigation() {
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

        setUpdateAvailable(false);
        await Updates.reloadAsync();
      } else {
        console.log('No hay updates disponibles')
      }
    } catch (e) {
      console.error(e);
    } finally {
      console.log('Close Updates.')
      setTextUpdates(false)
      dispatch(__authValidate())
    }
  }

  useEffect(() => {
    checkForUpdates();
  }, []);

  const { user } = useSelector(state => state.auth);
  const { checking } = useSelector(state => state.ui);

  if (checking) {
    return (
      <>
        <LoaderScreen textUpdates={textUpdates} updateAvailable={updateAvailable} />
        {/* <ModalUpdateTest isModalVisible={isModalVisible} /> */}
      </>
    )
  } else {
    return (
      <NavigationContainer>
        <ModalUpdates />
        {
          user
            ? <PrivateNavigation />
            : <PublicNavigation />
        }
      </NavigationContainer>
    )
  }

}

