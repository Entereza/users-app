import { create } from 'zustand';
import { directions } from '../../tools/storage/data';

const useAddressStore = create((set, get) => ({
    selectedAddress: null,
    listAddresses: directions,

    setSelectedAddress: (address) => {
        set({ selectedAddress: address });
    },

    addNewAddress: (newAddress) => {
        set({ listAddresses: [...get().listAddresses, newAddress] });
    },
}));

export default useAddressStore;
