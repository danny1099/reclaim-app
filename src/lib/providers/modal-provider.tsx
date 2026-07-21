"use client";
import { createContext, useState, ReactNode } from "react";
import { Modal } from "@/shared/components";

interface ModalState {
  open: boolean;
  title?: string;
  description?: string;
  content: ReactNode;
}

interface ModalContextValue {
  openModal: (config: Omit<ModalState, "open">) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModalState>({
    open: false,
    content: null,
  });

  const openModal = (config: Omit<ModalState, "open">) => {
    setState({ ...config, open: true });
  };

  const closeModal = () => {
    setState((prev) => ({ ...prev, open: false, content: null }));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        open={state.open}
        onOpenChange={(open) => !open && closeModal()}
        title={state.title}
        description={state.description}
      >
        {state.content}
      </Modal>
    </ModalContext.Provider>
  );
};
