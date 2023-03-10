import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

const ProductTabButtons = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  const rootEl = document.getElementById("product-tab-portal");

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? createPortal(children, rootEl!) : <></>;
};

export default ProductTabButtons;
