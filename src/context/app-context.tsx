import { createContext, useContext } from 'react';
import type { AppContextType } from '@/types/app-context-type';

const appContext = createContext<AppContextType | null>(null);

export function AppContext({ chuildren, value }: { chuildren: React.ReactNode, value: AppContextType }) {
  return <appContext.Provider value={value}>{chuildren}</appContext.Provider>;
}

export function useAppContext() {
  const context = useContext(appContext);
  if (context === null) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
}