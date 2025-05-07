import { create } from 'zustand';
import Constants from 'expo-constants';
import { socketService } from '../../services/socket/socketService';

// Determine if we're in development
const isDevelopment = Constants.expoConfig?.releaseChannel === undefined || 
                     Constants.expoConfig?.releaseChannel === 'default';

const useDeliveryLocationStore = create((set, get) => ({
    // Estado inicial
    latitude: null,
    longitude: null,
    isMoving: false,
    lastUpdateTime: null,
    orderId: null,
    isSocketConnected: false,
    removeLocationListener: null,
    removeTrackingEndListener: null,
    connectingInProgress: false,

    // Socket functions
    connectSocket: async () => {
        try {
            // Evitar múltiples intentos de conexión simultáneos
            if (get().connectingInProgress) {
                console.log('Connection already in progress, waiting...');
                return;
            }
            
            set({ connectingInProgress: true });
            
            // Conectar socket de forma asíncrona
            console.log('Attempting to connect socket...');
            await socketService.connect();
            
            // Actualizar estado de conexión después de conectar
            const isConnected = socketService.isConnected();
            console.log('Socket connected:', isConnected);
            set({ 
                isSocketConnected: isConnected,
                connectingInProgress: false
            });
            
            // Setup mock event listeners for development testing
            if (isDevelopment && typeof document !== 'undefined') {
                document.addEventListener('mockSocketEvent', (event) => {
                    const { type, data } = event.detail;
                    const currentOrderId = get().orderId;
                    
                    if (type === 'updateDriverLocation') {
                        if (data.orderId === currentOrderId) {
                            set({
                                latitude: data.latitude,
                                longitude: data.longitude,
                                lastUpdateTime: Date.now(),
                                isMoving: true
                            });
                        }
                    } else if (type === 'trackingEnded') {
                        if (data.orderId === currentOrderId) {
                            console.log('[Mock] Tracking ended for order:', data.orderId);
                            get().resetDeliveryLocation();
                        }
                    }
                });
            }
            
            return isConnected;
        } catch (error) {
            console.error('Failed to connect socket:', error);
            set({ 
                isSocketConnected: false,
                connectingInProgress: false
            });
            return false;
        }
    },

    disconnectSocket: () => {
        // Eliminar listeners específicos
        const { removeLocationListener, removeTrackingEndListener } = get();
        
        if (removeLocationListener) {
            removeLocationListener();
        }
        
        if (removeTrackingEndListener) {
            removeTrackingEndListener();
        }
        
        // Ahora sí desconectamos el socket completamente cuando ya no se necesita
        // Esto evita conexiones abiertas innecesarias y posibles fugas de memoria
        socketService.disconnect();
        
        set({ 
            isSocketConnected: false,
            removeLocationListener: null,
            removeTrackingEndListener: null,
            connectingInProgress: false
        });
        
        // Remove mock event listeners for development
        if (isDevelopment && typeof document !== 'undefined') {
            document.removeEventListener('mockSocketEvent', () => {
                console.log('Mock socket event listener removed');
            });
        }
    },

    // Start tracking a specific order
    startTrackingOrder: async (orderId) => {
        try {
            // Conectar al socket si no está conectado
            await get().connectSocket();
            
            // Verificar si la conexión se estableció correctamente
            if (!socketService.isConnected()) {
                console.error('Failed to establish socket connection for tracking');
                return;
            }
            
            // Guardar orderId
            set({ 
                orderId,
                isSocketConnected: socketService.isConnected()
            });
            
            // Eliminar listener anterior si existe
            const prevLocationListener = get().removeLocationListener;
            if (prevLocationListener) {
                prevLocationListener();
            }

            const prevTrackingEndListener = get().removeTrackingEndListener;
            if (prevTrackingEndListener) {
                prevTrackingEndListener();
            }
    
            // Unirse explícitamente a la sala para seguir este pedido
            console.log(`Subscribing to order tracking: ${orderId}`);
            await socketService.emit('subscribeToOrder', { orderId });
            
            // Escuchar actualizaciones de ubicación del conductor
            const removeLocationListener = socketService.on('updateDriverLocation', (data) => {
                if (data.orderId === orderId) {
                    set({
                        latitude: data.latitude,
                        longitude: data.longitude,
                        lastUpdateTime: Date.now(),
                        isMoving: true
                    });
                }
            });

            // Escuchar fin del seguimiento
            const removeTrackingEndListener = socketService.on('trackingEnded', (data) => {
                if (data.orderId === orderId) {
                    console.log('Tracking ended for order:', orderId);
                    get().resetDeliveryLocation();
                }
            });
            
            set({ 
                removeLocationListener,
                removeTrackingEndListener
            });
        } catch (error) {
            console.error('Failed to start tracking order:', error);
            throw error;
        }
    },

    // Dejar de escuchar eventos
    stopTracking: async () => {
        try {
            const { removeLocationListener, removeTrackingEndListener, orderId } = get();
            
            if (removeLocationListener) {
                removeLocationListener();
            }

            if (removeTrackingEndListener) {
                removeTrackingEndListener();
            }
    
            // Abandonar la sala de seguimiento si hay un orderId
            if (orderId && socketService.isConnected()) {
                console.log(`Unsubscribing from order tracking: ${orderId}`);
                await socketService.emit('unsubscribeFromOrder', { orderId });
            }
            
            set({
                removeLocationListener: null,
                removeTrackingEndListener: null,
                isSocketConnected: socketService.isConnected()
            });
        } catch (error) {
            console.error('Error stopping tracking:', error);
            throw error;
        }
    },

    // Acciones
    setDeliveryLocation: (latitude, longitude) => set({
        latitude,
        longitude,
        lastUpdateTime: Date.now()
    }),

    setOrderId: (orderId) => set({
        orderId
    }),

    setIsMoving: (isMoving) => set({
        isMoving
    }),

    // Resetear estado
    resetDeliveryLocation: () => set({
        latitude: null,
        longitude: null,
        isMoving: false,
        lastUpdateTime: null,
        orderId: null
    }),

    // Verificar si la ubicación está actualizada
    isLocationStale: () => {
        const state = useDeliveryLocationStore.getState();
        if (!state.lastUpdateTime) return true;
        
        const THIRTY_SECONDS = 30 * 1000; // 30 seconds in milliseconds
        const timeSinceLastUpdate = Date.now() - state.lastUpdateTime;
        return timeSinceLastUpdate >= THIRTY_SECONDS;
    }
}));

export default useDeliveryLocationStore;
