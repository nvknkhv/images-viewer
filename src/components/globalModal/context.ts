import { createContext, useContext, ReactNode } from 'react';

type initialStateProps = {
  modalContent: ReactNode;
  setModal: (content: ReactNode) => void;
  resetModal: () => void;
};
const initialState: initialStateProps = {
  modalContent: null,
  setModal: () => {},
  resetModal: () => {},
};

export const ModalContext = createContext(initialState);

export const useGlobalModal = () => useContext(ModalContext);
