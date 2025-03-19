import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  expoPushToken: null,
  notificationListeners: null,
  isNotificationsEnabled: false,
  
  setExpoPushToken: (token) => set({ expoPushToken: token }),
  setNotificationListeners: (listeners) => set({ notificationListeners: listeners }),
  setIsNotificationsEnabled: (enabled) => set({ isNotificationsEnabled: enabled }),
  
  resetNotificationState: () => set({
    expoPushToken: null,
    notificationListeners: null,
    isNotificationsEnabled: false,
  }),
}));

export default useNotificationStore; 