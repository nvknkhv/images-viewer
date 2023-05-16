import React, { useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { ModalContext, useGlobalModal } from './context';

export const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModal] = useState<ReactNode>(null);
  return (
    <ModalContext.Provider
      value={{
        modalContent: modalContent,
        setModal: (content) => {
          setModal(content);
          document.body.style.overflow = 'hidden';
        },
        resetModal: () => {
          setModal(null);
          document.body.style.overflow = 'visible';
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

/*
GlobalModalProvider.propTypes = {
  children: PropTypes.node,
};
*/

export const GlobalModal = () => {
  const { modalContent } = useGlobalModal();
  if (!modalContent) return null;
  return ReactDOM.createPortal(modalContent, document.body);
};
