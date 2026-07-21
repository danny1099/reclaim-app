import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ResetPasswordState {
  email: string;
  otp_code: string;
  currentStep: number;
}

interface ResetPasswordActions {
  setEmail: (email: string) => void;
  setOtpCode: (otp_code: string) => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

type ResetPasswordStore = ResetPasswordState & ResetPasswordActions;

const initialState: ResetPasswordState = {
  email: "",
  otp_code: "",
  currentStep: 1,
};

export const useResetPasswordStore = create<ResetPasswordStore>()(
  devtools((set, get) => ({
    ...initialState,
    setEmail: (email: string) => set({ email: email }),
    setOtpCode: (otp_code: string) => set({ otp_code: otp_code }),
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
