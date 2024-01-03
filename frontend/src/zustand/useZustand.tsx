import { create } from "zustand";

// Define Store
interface MyStore {
  token: string | null;
  setTokenValue: (newToken: string) => void;
  clearTokenValue: () => void;
}

export const useMyStore = create<MyStore>((set) => ({
  token: null,
  setTokenValue: (newToken: string) => set({ token: newToken }),
  clearTokenValue: () => {
    set({ token: null });
  },
}));

// You can use the store in your components like this:
// import { useMyStore } from 'path-to-your-store-file';

// Example usage in a component:
// const { token, setTokenValue, clearTokenValue } = useMyStore();
// Use these values and functions in your component
