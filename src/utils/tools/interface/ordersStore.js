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
        picked: "picked",
        delivering: "delivering",
        arrived: "arrived",
        completed: "completed"
    },

    setOrders: (orders) => set({ orders }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setCurrentPage: (currentPage) => set({ currentPage }),

    updateOrder: (updatedOrder) => {
        const { orders } = get();
        const updatedOrders = orders.map(orderItem => {
            if (orderItem.order.id === updatedOrder.id) {
                console.log('Updating order in store:', {
                    oldOrder: orderItem.order,
                    newOrder: updatedOrder
                });
                return {
                    ...orderItem,
                    order: updatedOrder
                };
            }
            return orderItem;
        });
        set({ orders: updatedOrders });
    },

    getActiveOrder: () => {
        const { orders } = get();
        if (!orders || orders.length === 0) return null;
        const activeStates = ["created", "accepted", "pickup", "store", "taken", "picked", "delivering", "arrived"];
        const statusPriority = {
            "created": 8,
            "accepted": 7,
            "pickup": 6,
            "taken": 5,
            "store": 4,
            "picked": 3,
            "delivering": 2,
            "arrived": 1
        };
        
        const activeOrders = orders.filter(order => activeStates.includes(order.order.status));
        return activeOrders.sort((a, b) => statusPriority[a.order.status] - statusPriority[b.order.status]);
    },

    getOrderStatusText: (status) => {
        const statusTexts = {
            created: "Enviado al chef",
            accepted: "Preparando tu pedido",
            pickup: "Preparando tu pedido",
            taken: "Preparando tu pedido",
            store: "Preparando tu pedido",
            picked: "Preparando tu pedido",
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
            pickup: "El chef está seleccionando los mejores ingredientes",
            taken: "El delivery está de camino al restaurante",
            store: "El delivery está en el restaurante esperando la entrega de tu pedido",
            picked: "El delivery ya tiene tu pedido, pronto estará en camino",
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

    getOrderById: (orderId) => {
        const { orders } = get();
        if (!orders || orders.length === 0) return null;
        return orders.find(order => order.order.id === orderId) || null;
    },
}));

export default useOrdersStore; 