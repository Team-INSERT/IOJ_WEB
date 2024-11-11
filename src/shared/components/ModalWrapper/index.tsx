import React, { useEffect } from "react";
import { ModalPortal } from "@/shared/utils/protals/ModalPortal";
import styled from "styled-components";

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.27);
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
`;

type ModalWrapperProps = {
  children?: React.ReactNode;
  close: () => void;
};

const ModalWrapper = ({ children, close }: ModalWrapperProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [close]);

  return (
    <ModalPortal>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </Backdrop>
    </ModalPortal>
  );
};

export default ModalWrapper;
