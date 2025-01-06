import { create } from 'zustand';
import { directions } from '../../tools/storage/data';

const useAddressStore = create(set => ({
    selectedAddress: null,
    listAddresses: directions,

    setSelectedAddress: (address) => {
        set({ selectedAddress: address });
    }
}));

export default useAddressStore;
