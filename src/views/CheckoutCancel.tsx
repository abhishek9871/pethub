import { useAppState } from '../store/AppStateContext';
import { useCart } from '../store/CartContext';
import { XCircle, ShoppingBag, ArrowRight, HelpCircle } from 'lucide-react';

export function CheckoutCancelView() {
  const { navigate } = useAppState();
  const { setCartOpen, items } = useCart();

  return (
    <div className="animate-in fade-in duration-500 pt-12 px-6 max-w-2xl mx-auto mb-20">
      <div className="flex flex-col items-center text-center">
        {/* Cancel Icon */}
        <div className="w-24 h-24 bg-secondary-container/30 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <XCircle className="w-12 h-12 text-on-secondary-container" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4 font-headline">
          Checkout Cancelled
        </h1>
        
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-md mb-12">
          No worries — your cart is still saved. Changed your mind, or ran into an issue? We're here to help.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-12">
          {items.length > 0 && (
            <button 
              onClick={() => {
                navigate('home');
                setTimeout(() => setCartOpen(true), 300);
              }}
              className="flex-1 bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full px-6 py-4 font-bold text-base hover:opacity-90 active:scale-95 soft-spring shadow-[0_8px_24px_rgba(0,107,96,0.2)] inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Return to Cart
            </button>
          )}
          
          <button 
            onClick={() => navigate('home')}
            className="flex-1 bg-surface-container-low text-on-surface rounded-full px-6 py-4 font-bold text-base hover:bg-surface-container soft-spring inline-flex items-center justify-center gap-2"
          >
            Keep Browsing
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-surface-container-low rounded-[1.5rem] p-6 w-full max-w-md text-left">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-on-surface text-sm">Need Help?</h3>
          </div>
          <p className="text-sm text-on-surface-variant mb-4">
            If you experienced a payment issue or have questions about your order, don't hesitate to reach out.
          </p>
          <button 
            onClick={() => navigate('contact')}
            className="text-primary font-bold text-sm hover:opacity-70 transition-opacity"
          >
            Contact Support →
          </button>
        </div>
      </div>
    </div>
  );
}
