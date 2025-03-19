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

    // Obtener información de un QR específico
    getQRInfo: async (qrId) => {
        try {
            const response = await createApiRequest(`/qr/${qrId}`, {
                method: 'GET'
            });
            return response;
        } catch (error) {
            console.error('Error getting QR info:', error);
            throw error;
        }
    }
}; 