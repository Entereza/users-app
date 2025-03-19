import { create } from 'zustand';

const useOrdersStore = create((set, get) => ({
    orders: [],
    isLoading: false,
    error: null,
    totalPages: 0,
    currentPage: 0,

    statusOrders: {
        created: "created",
        accepted: "accepted",
        pickup: "pickup",
        store: "store",
        taken: "taken",
        delivering: "delivering",
        arrived: "arrived",
        completed: "completed"
    },

    setOrders: (orders) => set({ orders }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setCurrentPage: (currentPage) => set({ currentPage }),

    getActiveOrder: () => {
        const { orders } = get();
        if (!orders || orders.length === 0) return null;
        const activeStates = ["created", "accepted", "pickup", "store", "taken", "delivering", "arrived"];
        return orders.find(order => activeStates.includes(order.order.status)) || null;
    },

    getOrderStatusText: (status) => {
        const statusTexts = {
            created: "Enviado al chef",
            accepted: "Preparando tu pedido",
            pickup: "Preparando tu pedido",
            store: "Preparando tu pedido",
            taken: "Pedido en camino",
            delivering: "Pedido en camino",
            arrived: "¡Tu pedido ya llegó!",
            completed: "Pedido completado"
        };
        return statusTexts[status] || status;
    },

    getOrderStatusSubtle: (status) => {
        const statusTexts = {
            created: "El chef está revisando tu pedido",
            accepted: "El chef está seleccionando los mejores ingredientes",
            pickup: "El delivery está de camino al restaurante",
            store: "El delivery está esperando la entrega de tu pedido",
            taken: "Tu pedido está en manos seguras",
            delivering: "El delivery esta de camino a tu ubicación",
            arrived: "El delivery está en la puerta",
            completed: "¡Gracias por tu preferencia!"
        };
        return statusTexts[status] || status;
    },

    clearOrders: () => set({
        orders: [],
        isLoading: false,
        error: null,
        totalPages: 0,
        currentPage: 0
    }),
}));

export default useOrdersStore; 