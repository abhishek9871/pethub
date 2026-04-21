import { useCart } from '../store/CartContext';
import { useAppState } from '../store/AppStateContext';
import { Menu, ShoppingBag } from 'lucide-react';
import { PetHubLogo } from './PetHubLogo';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

export function TopBar() {
  const { totalQuantity, setCartOpen } = useCart();
  const { navigate, isMenuOpen, setMenuOpen } = useAppState();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 px-5 py-3 flex justify-between items-center",
        scrolled 
          ? "bg-surface/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)]" 
          : "bg-surface/80 backdrop-blur-md"
      )}
    >
      <button 
        className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container soft-spring active:scale-95"
        onClick={() => setMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      
      <button 
        onClick={() => navigate('home')}
        className="soft-spring active:scale-95"
        aria-label="Go to homepage"
      >
        <PetHubLogo size={28} />
      </button>
      
      <button 
        className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container soft-spring active:scale-95"
        onClick={() => setCartOpen(true)}
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalQuantity > 0 && (
          <span className="absolute top-0.5 right-0 bg-primary text-on-primary text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow-sm animate-in zoom-in duration-200">
            {totalQuantity}
          </span>
        )}
      </button>
    </header>
  );
}
