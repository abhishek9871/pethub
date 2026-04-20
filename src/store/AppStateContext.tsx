import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

type ViewState = 'home' | 'faq' | 'shipping' | 'contact' | 'story';

type AppStateContextType = {
  currentView: ViewState;
  navigate: (view: ViewState) => void;
  selectedProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    setMenuOpen(false); // Close menu when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (product: Product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);

  return (
    <AppStateContext.Provider
      value={{
        currentView,
        navigate,
        selectedProduct,
        openProduct,
        closeProduct,
        isMenuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
