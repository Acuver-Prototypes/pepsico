import { useState } from "react";
import { ReactNode } from "react";
import { useContext } from "react";
import { createContext } from "react";
import dailyAllocations from "../data/dailyAllocation";
import { DailyAllocationObj } from "../types";

interface Props {
  children: ReactNode;
}

interface DailyAllocationState {
  dailyAllocation: DailyAllocationObj[];
  setDailyAllocation: React.Dispatch<
    React.SetStateAction<DailyAllocationObj[]>
  >;
}

const DailyAllocationContext = createContext<DailyAllocationState | undefined>(
  undefined
);

const DailyAllocationContextProvider = ({ children }: Props) => {
  const [dailyAllocation, setDailyAllocation] =
    useState<DailyAllocationObj[]>(dailyAllocations);

  return (
    <DailyAllocationContext.Provider
      value={{
        dailyAllocation,
        setDailyAllocation,
      }}
    >
      {children}
    </DailyAllocationContext.Provider>
  );
};

// custom hook
export const useDailyAllocation = () => {
  const context = useContext(DailyAllocationContext);

  if (context === undefined) {
    throw new Error(
      "useDailyAllocation must be used within a DailyAllocationContextProvider"
    );
  }

  return context;
};

export default DailyAllocationContextProvider;
