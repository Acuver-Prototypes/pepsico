import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

const DistributorTabButtons = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  const rootEl = document.getElementById("distributor-tab-portal");

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? createPortal(children, rootEl!) : <></>;
};

export default DistributorTabButtons;
