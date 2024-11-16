import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type ModalPortalProps = {
  children: React.ReactNode;
};

export const ModalPortal = ({
  children,
}: ModalPortalProps): React.ReactPortal | null => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById("modal");
    let created = false;

    if (!element) {
      element = document.createElement("div");
      element.id = "modal";
      document.body.appendChild(element);
      created = true;
    }

    setEl(element);

    return () => {
      if (created && element) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!el) return null;
  return ReactDOM.createPortal(children, el);
};
