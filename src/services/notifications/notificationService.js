import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../api/auth';
import { toastService } from '../../utils/tools/interface/toastService';

// Configurar el comportamiento de las notificaciones
export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

// Registrar para notificaciones push
export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    toastService.showWarningToast("No se pudo obtener permiso para notificaciones");
    return null;
  }

  // Get the token that uniquely identifies this device
  token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas?.projectId,
  });

  console.log('Expo push token:', token);

  // Store token in AsyncStorage for future use
  await AsyncStorage.setItem('expoPushToken', token.data);

  return token.data;
  // } else {
  //   console.log('Must use physical device for Push Notifications');
  //   toastService.showInfoToast("Debes usar un dispositivo físico para recibir notificaciones");
  //   return null;
  // }
};

// Enviar el token al backend
export const sendTokenToBackend = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('expoPushToken');

    if (token && userId) {
      await authService.registerNotificationToken(userId, token);
      console.log('Token successfully registered with backend');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error sending token to backend:', error);
    return false;
  }
};

// Configurar listeners para notificaciones
export const setupNotificationListeners = () => {
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification response:', response);
  });

  return { notificationListener, responseListener };
};

// Limpiar listeners
export const removeNotificationListeners = (listeners) => {
  if (listeners?.notificationListener) {
    Notifications.removeNotificationSubscription(listeners.notificationListener);
  }
  if (listeners?.responseListener) {
    Notifications.removeNotificationSubscription(listeners.responseListener);
  }
};

// Helper function to initialize notifications after successful login
export const initializeNotificationsAfterLogin = async (userId) => {
  try {
    // Configure notifications behavior
    configureNotifications();

    // Register for push notifications
    const token = await registerForPushNotificationsAsync();

    if (token) {
      // Setup notification listeners
      const listeners = setupNotificationListeners();

      // Send token to backend
      if (userId) {
        await sendTokenToBackend(userId);
      }

      return { token, listeners };
    }
    return null;
  } catch (error) {
    console.error('Error initializing notifications:', error);
    return null;
  }
};

export const notificationService = {
  configureNotifications,
  registerForPushNotificationsAsync,
  sendTokenToBackend,
  setupNotificationListeners,
  removeNotificationListeners,
  initializeNotificationsAfterLogin
}; 