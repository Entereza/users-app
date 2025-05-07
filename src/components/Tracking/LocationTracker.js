import React, { useEffect, useRef } from 'react';
import useDeliveryLocationStore from '../../utils/tools/interface/deliveryLocationStore';
import { socketService } from '../../utils/services/socket/socketService';

/**
 * A utility component that manages socket connections for tracking driver locations
 * This component doesn't render anything visible but handles the socket connection
 * 
 * @param {Object} props
 * @param {string} props.orderId - The ID of the order to track
 * @returns {React.Component}
 */
const LocationTracker = ({ orderId }) => {
    const { 
        startTrackingOrder, 
        stopTracking,
        connectSocket,
        disconnectSocket,
        isSocketConnected
    } = useDeliveryLocationStore();
    
    // Track if we've initialized the connection
    const isInitialized = useRef(false);

    useEffect(() => {
        // Función para inicializar la conexión
        const initializeConnection = async () => {
            try {
                // Only initialize if we have the order ID
                if (orderId && !isInitialized.current) {
                    console.log('LocationTracker: Starting tracking for order', orderId);
                    
                    // Make sure socket is connected first (awaiting connection)
                    await connectSocket();
                    
                    // Check if socket is actually connected
                    const isConnected = socketService.isConnected();
                    console.log('Socket connection status:', isConnected);
                    
                    if (isConnected) {
                        // Start tracking - this also awaits connection
                        await startTrackingOrder(orderId);
                        isInitialized.current = true;
                        
                        // Debug: log active socket listeners
                        console.log('Active socket listeners:', socketService.listeners);
                    } else {
                        console.error('Socket failed to connect, cannot start tracking');
                    }
                }
            } catch (error) {
                console.error('Error initializing location tracking:', error);
            }
        };
        
        // Iniciar la conexión
        initializeConnection();

        // Cleanup on unmount
        return () => {
            console.log('LocationTracker: Cleaning up socket connection');
            const cleanup = async () => {
                try {
                    await stopTracking();
                    disconnectSocket();
                    isInitialized.current = false;
                } catch (error) {
                    console.error('Error during cleanup:', error);
                }
            };
            
            cleanup();
        };
    }, [orderId]);

    // This component doesn't render anything visible
    return null;
};

export default LocationTracker; 