import { useCart } from '../store/CartContext';
import { useAppState } from '../store/AppStateContext';
import { Menu, ShoppingBag } from 'lucide-react';
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
        "fixed top-0 w-full z-40 transition-all duration-300 px-6 py-4 flex justify-between items-center",
        scrolled ? "bg-surface/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      )}
    >
      <button 
        className="text-primary hover:opacity-70 soft-spring active:scale-95"
        onClick={() => setMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => navigate('home')}
        className="text-lg font-bold tracking-tighter text-on-surface font-headline"
      >
        PetHub
      </button>
      
      <button 
        className="relative text-primary hover:opacity-70 soft-spring active:scale-95"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingBag className="w-6 h-6" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </button>
    </header>
  );
}
