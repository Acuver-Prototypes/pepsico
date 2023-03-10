import { ReactNode } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

interface Props {
  children: ReactNode;
}

interface SidebarState {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

// context
const SidebarContext = createContext<SidebarState | undefined>(undefined);

// context provider
const SidebarContextProvider = ({ children }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// custom hook
export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarContextProvider");
  }

  return context;
};

export default SidebarContextProvider;
