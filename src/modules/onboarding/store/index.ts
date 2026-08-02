import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OnboardingState {
  name: string;
  avatar: string;
  brand: string;
  logoUrl: string | undefined;
  style_tone: string;
  currentStep: number;
}

interface OnboardingActions {
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  setBrand: (brand: string) => void;
  setLogoUrl: (logoUrl: string) => void;
  setStyleTone: (style_tone: string) => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

const initialState: OnboardingState = {
  name: "",
  avatar: "",
  brand: "",
  logoUrl: undefined,
  style_tone: "",
  currentStep: 1,
};

export const useOnboardingStore = create<OnboardingStore>()(
  devtools((set, get) => ({
    ...initialState,

    setName: (name: string) => set({ name }),
    setAvatar: (avatar: string) => set({ avatar }),
    setBrand: (brand: string) => set({ brand }),
    setLogoUrl: (logoUrl: string) => set({ logoUrl }),
    setStyleTone: (style_tone: string) => set({ style_tone }),
    reset: () => set(initialState),

    /* handle next and prev step */
    nextStep: () => {
      const { currentStep } = get();
      set({ currentStep: currentStep + 1 }, false, "nextStep");
    },

    prevStep: () => {
      const { currentStep } = get();
      if (currentStep > 1) {
        set({ currentStep: currentStep - 1 }, false, "prevStep");
      }
    },
  }))
);
