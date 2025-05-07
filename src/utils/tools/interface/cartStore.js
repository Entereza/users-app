import { create } from 'zustand';

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const selectedVariablesKey = product.selectedVariables ?
            product.selectedVariables.map(v =>
                `${v.id}_${v.selections.map(s => s.id).sort().join('_')}`
            ).sort().join('|') : '';
        const uniqueId = `${product.id}_${selectedVariablesKey}`;

        // Calcular el precio total del producto incluyendo variables
        const variablesPrice = product.selectedVariables ?
            product.selectedVariables.reduce((total, variable) =>
                total + variable.selections.reduce((varTotal, selection) =>
                    varTotal + (selection.price || 0), 0), 0) : 0;
        const totalPrice = product.price + variablesPrice;

        // Obtener la cantidad del producto que se está agregando (por defecto 1)
        const quantityToAdd = product.quantity || 1;

        const existingProductIndex = state.cart.findIndex(item =>
            item.uniqueId === uniqueId
        );

        if (existingProductIndex >= 0) {
            // Si el producto existe con las mismas variables, sumar la nueva cantidad
            const newCart = [...state.cart];
            newCart[existingProductIndex] = {
                ...newCart[existingProductIndex],
                quantity: newCart[existingProductIndex].quantity + quantityToAdd
            };
            return { cart: newCart };
        }

        // Si es un nuevo producto o tiene diferentes variables, añadir como nuevo
        return {
            cart: [...state.cart, {
                ...product,
                uniqueId,
                totalPrice,
                quantity: quantityToAdd // Usar la cantidad proporcionada
            }]
        };
    }),
    removeFromCart: (uniqueId) => set((state) => {
        const existingProduct = state.cart.find(item => item.uniqueId === uniqueId);
        if (existingProduct && existingProduct.quantity > 1) {
            return {
                cart: state.cart.map(item =>
                    item.uniqueId === uniqueId ? { ...item, quantity: item.quantity - 1 } : item
                )
            };
        }
        return { cart: state.cart.filter(item => item.uniqueId !== uniqueId) };
    }),
    deleteFromCart: (uniqueId) => set((state) => ({
        cart: state.cart.filter(item => item.uniqueId !== uniqueId)
    })),
    editCartItem: (oldUniqueId, updatedProduct) => set((state) => {
        // Eliminar el producto anterior
        const filteredCart = state.cart.filter(item => item.uniqueId !== oldUniqueId);
        
        // Calcular el nuevo uniqueId y precio total
        const selectedVariablesKey = updatedProduct.selectedVariables ?
            updatedProduct.selectedVariables.map(v =>
                `${v.id}_${v.selections.map(s => s.id).sort().join('_')}`
            ).sort().join('|') : '';
        const newUniqueId = `${updatedProduct.id}_${selectedVariablesKey}`;
        
        const variablesPrice = updatedProduct.selectedVariables ?
            updatedProduct.selectedVariables.reduce((total, variable) =>
                total + variable.selections.reduce((varTotal, selection) =>
                    varTotal + (selection.price || 0), 0), 0) : 0;
        const totalPrice = updatedProduct.price + variablesPrice;

        // Agregar el producto actualizado
        return {
            cart: [...filteredCart, {
                ...updatedProduct,
                uniqueId: newUniqueId,
                totalPrice
            }]
        };
    }),
    clearCart: () => set({ cart: [] }),

    billingInfo: {
        name: "",
        nit: "",
    },
    setBillingInfo: (info) => set({ billingInfo: info }),

    listPaymentMethods: [
        { id: 'cash', name: 'Efectivo', icon: 'money-bill-wave' },
        { id: 'qr', name: 'QR', icon: 'qrcode' },
        // { id: 'card', name: 'Tarjeta', icon: 'credit-card' },
    ],

    paymentMethod: {
        id: 'cash',
        name: 'Efectivo',
        icon: 'money-bill-wave'
    },
    setPaymentMethod: (method) => set({ paymentMethod: method }),

    myCashback: 0,
    setMyCashback: (cashback) => set({ myCashback: cashback }),

    tripPrice: 0,
    setTripPrice: (price) => set({ tripPrice: price }),
    cashbackBusiness: 0,
    setCashbackBusiness: (cashback) => set({ cashbackBusiness: cashback }),
}));

export default useCartStore; 