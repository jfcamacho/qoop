import React, { createContext, useContext, useState, ReactNode } from "react";

// Define la estructura del estado global como un objeto con múltiples datos
interface GlobalState {
  user: {
    id?: number;
    name?: string;
    username?: string;
    subscribed?: boolean;
  },
  isSubscribed: boolean;
  setGlobalState: (key: keyof GlobalState, value: any) => void;
}

// Crea el contexto con un valor inicial vacío (será definido en el proveedor)
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Define el tipo para las propiedades del proveedor
interface GlobalProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, setState] = useState<GlobalState>({
    user: { id:0, name: "", username: "", subscribed: false},
    isSubscribed: false,
    setGlobalState: (key, value) => {
      setState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
  });

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para acceder al contexto con verificación
export const useGlobalContext = (): GlobalState => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext debe ser usado dentro de un GlobalProvider");
  }
  return context;
};
