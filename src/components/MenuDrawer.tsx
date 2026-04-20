import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../store/AppStateContext';
import { X, Home, HelpCircle, FileText, Mail, ChevronRight } from 'lucide-react';

export function MenuDrawer() {
  const { isMenuOpen, setMenuOpen, navigate, currentView } = useAppState();

  const menuItems = [
    { id: 'home', label: 'Store', icon: Home },
    { id: 'story', label: 'Our Story', icon: FileText },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'shipping', label: 'Shipping & Returns', icon: FileText },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-scrim/40 backdrop-blur-sm z-50"
            style={{ position: 'fixed' }}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-[360px] bg-surface z-50 shadow-2xl flex flex-col"
            style={{ position: 'fixed' }}
          >
            <div className="flex items-center justify-between p-6 border-b border-surface-container">
              <h2 className="text-xl font-bold font-headline text-on-surface uppercase tracking-tight">Menu</h2>
              <button 
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 bg-surface-container-low rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors soft-spring active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id as any)}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all soft-spring active:scale-[0.98] ${
                      currentView === item.id 
                        ? 'bg-primary-container text-on-primary-container font-bold' 
                        : 'text-on-surface hover:bg-surface-container-low font-medium'
                    }`}
                  >
                    <div className={currentView === item.id ? 'text-primary' : 'text-on-surface-variant'}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="flex-1 text-left text-base">{item.label}</span>
                    <ChevronRight className={`w-5 h-5 ${currentView === item.id ? 'text-primary opacity-100' : 'text-on-surface-variant opacity-50'}`} />
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 border-t border-surface-container bg-surface-container-lowest">
              <p className="text-xs text-center text-on-surface-variant font-medium">
                © 2026 PetHub. All rights reserved.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
