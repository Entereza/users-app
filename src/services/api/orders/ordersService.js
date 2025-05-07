import { createApiRequest } from '../config';

export const ordersService = {
    // Crear un nuevo pedido
    createOrder: async (orderData) => {
        try {
            console.log('orderData: ', JSON.stringify(orderData))

            const response = await createApiRequest('/orders/create', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
            return response;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Formatear los datos del carrito para la API
    formatOrderData: (cart, userId, branchId, paymentMethod, cashbackApplied, tripPrice, locationId, billingInfo) => {
        // Calcular totales
        const totalFinal = cart.reduce((total, item) => {
            return total + (item.totalPrice * item.quantity);
        }, 0);

        const serviceFee = totalFinal < 100 ? 1 : 2;

        // Formatear productos y sus variables
        const data = cart.map(item => ({
            products: {
                id: item.id,
                name: item.nameProduct,
                description: item.description,
                status: item.status,
                statusAdmin: true,
                visibleItem: true,
                pricing: item.price,
                url: item.image,
                categoryProductId: item.categoryId,
                position: item.position || 0
            },
            quantity: item.quantity || 1, // Asegurar que la cantidad se envíe correctamente
            productVariable: item.selectedVariables ? item.selectedVariables.map(variable => ({
                pv: {
                    id: variable.id,
                    name: variable.name || variable.namePv,
                    canMany: variable.canMany,
                    required: variable.required,
                    instructions: variable.instructions,
                    productsId: item.id,
                    quantity: item.quantity || 1, // Usar la cantidad del producto
                    status: true,
                    position: variable.position || 0
                },
                pricingpv: variable.selections.map(selection => ({
                    id: selection.id,
                    name: selection.name,
                    price: selection.price,
                    pv: variable.id,
                    status: true,
                    position: selection.position || 0
                }))
            })) : []
        }));

        return {
            clientId: userId,
            branchId,
            locationId,
            totalFinal,
            paymentMethod: paymentMethod.toLowerCase(),
            serviceFee,
            useCashback: cashbackApplied > 0,
            cashbackApplied,
            data,
            deliveryFee: tripPrice,
            nit: billingInfo.nit,
            razonSocial: billingInfo.name,
        };
    },

    // Obtener pedidos del cliente
    getClientOrders: async (clientId, page = 0, size = 10) => {
        try {
            const response = await createApiRequest(`/orders/client/${clientId}?page=${page}&size=${size}`, {
                method: 'GET'
            });
            return response;
        } catch (error) {
            console.error('Error fetching client orders:', error);
            throw error;
        }
    }
}; 