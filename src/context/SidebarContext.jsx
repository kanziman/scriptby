import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [sidebarToggled, setSidebarToggled] = useState(false);

  function toggleSidebar() {
    console.log("toggled");
    setSidebarToggled((prev) => !prev);
  }

  return (
    <SidebarContext.Provider value={{ sidebarToggled, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
}

export { SidebarProvider, useSidebar };
