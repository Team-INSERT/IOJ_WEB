import React, { useState } from 'react';
import ModalWrapper from "@/shared/components/ModalWrapper";

const useModal = <T,>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolve, setResolve] = useState<(value: T | null) => void>();

  const openModal = (): Promise<T | null> => {
    setIsModalOpen(true);
    return new Promise((res) => {setResolve(() => res)});
  };

  const closeModal = (value: T | null) => {
    setIsModalOpen(false);
    if (resolve) resolve(value);
  };

  return {
    ModalWrapper: ({ children }: { children: React.ReactNode }) =>
      isModalOpen ? (
        <ModalWrapper
          close={() => {
            closeModal(null);
          }}
        >
          {children}
        </ModalWrapper>
      ) : null,
    openModal,
    closeModal,
  };
};

export default useModal;