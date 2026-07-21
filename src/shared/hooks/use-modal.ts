import { use } from "react";
import { ModalContext } from "@/lib/providers";

export const useModal = () => {
  const ctx = use(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
