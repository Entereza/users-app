import { create } from 'zustand';

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existingProduct = state.cart.find(item => item.id === product.id);
        if (existingProduct) {
            return {
                cart: state.cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
    removeFromCart: (productId) => set((state) => {
        const existingProduct = state.cart.find(item => item.id === productId);
        if (existingProduct && existingProduct.quantity > 1) {
            return {
                cart: state.cart.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
            };
        }
        return { cart: state.cart.filter(item => item.id !== productId) };
    }),
    deleteFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
    })),
    clearCart: () => set({ cart: [] }),

    billingInfo: {
        name: "",
        nit: "",
    },
    setBillingInfo: (info) => set({ billingInfo: info }),

    listPaymentMethods: [
        { name: 'Efectivo', icon: 'money-bill-wave' },
        { name: 'QR', icon: 'qrcode' },
        { name: 'Tarjeta', icon: 'credit-card' },
    ],

    paymentMethod: {
        name: 'Efectivo',
        icon: 'money-bill-wave'
    },
    setPaymentMethod: (method) => set({ paymentMethod: method }),

    myCashback: 0,
    setMyCashback: (cashback) => set({ myCashback: cashback }),
}));

export default useCartStore; 