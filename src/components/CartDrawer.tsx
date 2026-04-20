import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../store/CartContext';
import { X, Minus, Plus, Lock, ShieldCheck, Truck } from 'lucide-react';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full h-full md:w-[450px] bg-surface z-50 shadow-[-8px_0_32px_rgba(0,0,0,0.1)] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-surface-container">
              <h2 className="text-xl font-bold tracking-tight text-on-surface">Your Cart</h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 bg-surface-container-low flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container soft-spring"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
                  <ShoppingBagEmpty />
                  <p className="mt-4 font-medium">Your cart is currently empty.</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="mt-6 text-primary font-bold underline underline-offset-4 hover:opacity-70 soft-spring"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <article key={item.product.id} className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container shrink-0">
                        <img 
                          src={item.product.thumbnail} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-bold text-on-surface leading-tight text-sm mb-1">{item.product.name}</h3>
                            <p className="text-on-surface-variant text-xs">{item.product.category}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.product.id)}
                            className="text-on-surface-variant/50 hover:text-error soft-spring"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div className="flex items-center bg-surface-container rounded-full px-1 py-1">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded-full"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded-full"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-sm text-on-surface">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-surface-container-lowest border-t border-surface-container-high">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-primary font-medium">Free over $75</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => alert("Checkout (Stripe integration stub)")}
                  className="w-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full py-4 text-base font-bold font-headline tracking-wide soft-spring hover:opacity-90 active:scale-95 shadow-[0_8px_24px_rgba(0,107,96,0.2)] mb-4"
                >
                  Checkout - ${subtotal.toFixed(2)}
                </button>
                
                <div className="flex justify-center gap-6 text-on-surface-variant">
                  <div className="flex flex-col items-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">Guarantee</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagEmpty() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
