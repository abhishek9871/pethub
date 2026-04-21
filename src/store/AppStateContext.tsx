import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products } from '../data/products';

type ViewState = 'home' | 'faq' | 'shipping' | 'contact' | 'story' | 'checkout-success' | 'checkout-cancel';

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
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') return 'checkout-success';
    if (params.get('checkout') === 'cancel') return 'checkout-cancel';
    return 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Deep link: auto-open product from URL query param ?product=slug
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productSlug = params.get('product');
    if (productSlug) {
      const found = products.find((p) => p.id === productSlug || p.slug === productSlug);
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, []);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    setMenuOpen(false);
    if (view !== 'checkout-success' && view !== 'checkout-cancel') {
      const url = new URL(window.location.href);
      url.searchParams.delete('checkout');
      url.searchParams.delete('session_id');
      url.searchParams.delete('product');
      window.history.replaceState({}, '', url.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    // Update URL for shareability
    const url = new URL(window.location.href);
    url.searchParams.set('product', product.id);
    window.history.replaceState({}, '', url.toString());
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    // Clean product param from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.replaceState({}, '', url.pathname);
  };

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
