import { createApiRequest } from '../config';

export const qrService = {
    // Generar un nuevo código QR
    createQR: async (params) => {
        try {
            const response = await createApiRequest(`/qr/create`, {
                method: 'POST',
                body: JSON.stringify(params)
            });

            return response;
        } catch (error) {
            console.error('Error creating QR:', error);
            throw error;
        }
    },

    // Obtener datos del QR escaneado
    fetchQrData: async (id) => {
        try {
            const response = await createApiRequest(`/qr/data?id=${id}`, {
                method: 'GET'
            });

            if (response.generic?.code === "200") {
                return response;
            } else {
                throw new Error(response.generic?.msg || 'Error al obtener datos del QR');
            }
        } catch (error) {
            console.error('Error fetching QR data:', error);
            throw error;
        }
    },

    // Realizar transacción con QR
    processQRTransaction: async (params) => {
        try {
            const response = await createApiRequest(`/qr/transaction`, {
                method: 'POST',
                body: JSON.stringify(params)
            });

            if (response.code === "200") {
                return response;
            } else {
                throw new Error(response.msg || 'Error al procesar la transacción');
            }
        } catch (error) {
            console.error('Error processing QR transaction:', error);
            throw error;
        }
    },

    // Obtener historial de transacciones del usuario
    getUserTransactions: async (clientID, page = 0, size = 10) => {
        try {
            const response = await createApiRequest(`/qr/cashback-bits?clientId=${clientID}&page=${page}&size=${size}`, {
                method: 'GET'
            });
            
            // The response now directly contains the content array and pagination information
            return response;
        } catch (error) {
            console.error('Error fetching user transactions:', error);
            throw error;
        }
    }
}; 