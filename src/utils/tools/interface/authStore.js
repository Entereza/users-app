import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
// {
//   names: "Anelisse",
//   lastNames: "Rocabado",
//   phoneNumber: 75469425,
//   ci: 7820697,
//   email: "anelisserocabado@gmail.com",
//   password: "12345678",
//   image: ""
// },

const useAuthStore = create(set => ({
  user: null,

  isChecking: true,

  setIsChecking: (value) => {
    set({ isChecking: value });
  },

  clearUserData: () => {
    set({ user: null });
  },

  getUserData: async (deliveryCode) => {

  },

  logout: async () => {
    await AsyncStorage.clear();
    set({ user: null });
  }
}));

export default useAuthStore;
