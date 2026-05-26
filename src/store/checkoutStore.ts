import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DeliveryMethod = 'manual' | 'post' | 'boxnow';

export interface CheckoutState {
  currentStep: number;
  deliveryMethod: DeliveryMethod;
  boxNowLocation: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    postalCode: string;
    street: string;
    houseNumber: string;
  };
  saveAsDefault: boolean;
  isR1: boolean;
  r1Info: {
    companyName: string;
    oib: string;
  };
  
  setStep: (step: number) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setBoxNowLocation: (location: string) => void;
  updateCustomerInfo: (info: Partial<CheckoutState['customerInfo']>) => void;
  setSaveAsDefault: (save: boolean) => void;
  setR1: (isR1: boolean) => void;
  updateR1Info: (info: Partial<CheckoutState['r1Info']>) => void;
  resetCheckout: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      currentStep: 1,
      deliveryMethod: 'post',
      boxNowLocation: '',
      customerInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        postalCode: '',
        street: '',
        houseNumber: '',
      },
      saveAsDefault: false,
      isR1: false,
      r1Info: {
        companyName: '',
        oib: '',
      },

      setStep: (step) => set({ currentStep: step }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
      setBoxNowLocation: (location) => set({ boxNowLocation: location }),
      updateCustomerInfo: (info) =>
        set((state) => ({
          customerInfo: { ...state.customerInfo, ...info },
        })),
      setSaveAsDefault: (saveAsDefault) => set({ saveAsDefault }),
      setR1: (isR1) => set({ isR1 }),
      updateR1Info: (info) =>
        set((state) => ({
          r1Info: { ...state.r1Info, ...info },
        })),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      resetCheckout: () =>
        set({
          currentStep: 1,
          deliveryMethod: 'post',
          boxNowLocation: '',
          customerInfo: {
            firstName: '', lastName: '', email: '', phone: '', city: '', postalCode: '', street: '', houseNumber: '',
          },
          saveAsDefault: false,
          isR1: false,
          r1Info: { companyName: '', oib: '' },
        }),
    }),
    { name: 'astera-checkout-storage' }
  )
);
