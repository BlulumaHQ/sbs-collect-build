import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface RewardsContextValue {
  open: boolean;
  openRewards: () => void;
  closeRewards: () => void;
}

const RewardsContext = createContext<RewardsContextValue | null>(null);

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openRewards = useCallback(() => setOpen(true), []);
  const closeRewards = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ open, openRewards, closeRewards }),
    [open, openRewards, closeRewards],
  );
  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
}

export function useRewards(): RewardsContextValue {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error("useRewards must be used inside RewardsProvider");
  return ctx;
}
