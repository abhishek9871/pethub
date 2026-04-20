import { useAppState } from '../store/AppStateContext';
import { Compass, ShoppingBag, Info, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav() {
  const { currentView, navigate } = useAppState();

  const navItems = [
    { id: 'home' as const, label: 'Discover', icon: Compass },
    { id: 'shipping' as const, label: 'Shipping', icon: ShieldCheck },
    { id: 'faq' as const, label: 'FAQ', icon: Info },
    { id: 'contact' as const, label: 'Contact', icon: ShoppingBag },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-30 flex justify-around items-center px-4 pb-8 pt-4 bg-surface/90 backdrop-blur-xl rounded-t-[2.5rem] shadow-[0_-8px_24px_rgba(48,51,49,0.06)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={cn(
              "flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 active:scale-90",
              isActive 
                ? "bg-primary/10 text-primary rounded-full" 
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            <Icon className={cn("w-6 h-6 mb-1", isActive && "fill-current")} />
            <span className="text-[10px] font-medium tracking-wide uppercase font-headline">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
