import { create } from 'zustand';

const useTransferAmountStore = create(set => ({
    showTabSlider: false,
    toggleTabSlider: (value) => set({ showTabSlider: value }),
}));

export default useTransferAmountStore;