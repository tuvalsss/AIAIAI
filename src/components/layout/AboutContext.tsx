"use client";

import { createContext, useContext, useState } from "react";

const AboutContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export function AboutProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <AboutContext.Provider value={{ open, setOpen }}>{children}</AboutContext.Provider>;
}

export const useAbout = () => useContext(AboutContext);
