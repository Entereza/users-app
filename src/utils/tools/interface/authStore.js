import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTabBarStore from './tabBarStore';
import { authService } from '../../../services/api/auth';

const useAuthStore = create(set => ({
  isChecking: true,
  user: null,

  setIsChecking: (value) => {
    set({ isChecking: value });
  },

  setUserData: (user) => {
    set({ user: user });
  },

  clearUserData: () => {
    set({ user: null });
  },

  getUserData: async () => {
    set({ isChecking: true });
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      set({ user: userData });
      console.log('userData: ', userData)

      try {
        const response = await authService.getClientById(userData.id);
        if (response?.generic?.code === 'COD200') {
          const updatedUserData = {
            id: response.client.id,
            names: response.client.names,
            lastNames: response.client.lastnames,
            phoneNumber: response.client.phoneNumber,
            ci: response.client.carnet,
            cashback: response.client.cashback,
            email: response.client.email,
            image: response.client.img,
            password: response.client?.password || response.client?.plainPassword || "",
            status: response.client.status,
            username: response.client.username,
          };
          set({ user: updatedUserData });
          AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        } else {
          console.log('Error al obtener datos del cliente desde la API:', response);
          await AsyncStorage.clear();
          set({ user: null });
          useTabBarStore.getState().toggleTabBar(true);
        }
      } catch (error) {
        console.error('Error al verificar datos del usuario con la API:', error);
        await AsyncStorage.clear();
        set({ user: null });
        useTabBarStore.getState().toggleTabBar(true);
      } finally {
        set({ isChecking: false });
      }
    } else {
      set({ isChecking: false });
    }
  },

  logout: async () => {
    await AsyncStorage.clear();
    set({ user: null });
    useTabBarStore.getState().toggleTabBar(true);
  }
}));

export default useAuthStore;
