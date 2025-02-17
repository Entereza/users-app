import { create } from 'zustand';

const useAddressStore = create((set) => ({
    selectedAddress: null,
    listAddresses: [],
    isLoadingAddresses: false,

    setSelectedAddress: (address) => {
        set({ selectedAddress: address });
    },

    setListAddresses: (addresses) => {
        set({ listAddresses: addresses });
    },

    setIsLoadingAddresses: (isLoading) => {
        set({ isLoadingAddresses: isLoading });
    },

    addNewAddress: (newAddress) => {
        set(state => ({ 
            listAddresses: [...state.listAddresses, newAddress] 
        }));
    },

    updateAddress: (updatedAddress) => {
        set(state => ({
            listAddresses: state.listAddresses.map(address => 
                address.id === updatedAddress.id ? updatedAddress : address
            )
        }));
    },

    deleteAddress: (addressId) => {
        set(state => ({
            listAddresses: state.listAddresses.filter(address => address.id !== addressId)
        }));
    },

    resetAddresses: () => {
        set({
            selectedAddress: null,
            listAddresses: [],
            isLoadingAddresses: false
        });
    }
}));

export default useAddressStore;
