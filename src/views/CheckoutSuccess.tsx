import { useEffect } from 'react';
import { useAppState } from '../store/AppStateContext';
import { useCart } from '../store/CartContext';
import { CheckCircle, ShoppingBag, ArrowRight, Truck, Shield } from 'lucide-react';

export function CheckoutSuccessView() {
  const { navigate } = useAppState();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, []);

  return (
    <div className="animate-in fade-in duration-500 pt-12 px-6 max-w-2xl mx-auto mb-20">
      <div className="flex flex-col items-center text-center">
        {/* Success Animation */}
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <CheckCircle className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4 font-headline">
          Order Confirmed! 🎉
        </h1>
        
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-md mb-4">
          Thank you for your purchase! Your order is being processed and you'll receive a confirmation email shortly.
        </p>

        <p className="text-sm text-on-surface-variant/70 mb-12 max-w-sm">
          Payment confirmed by Stripe. Your order will be fulfilled once our system processes the payment webhook.
        </p>

        {/* Order Info Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-surface-container-low rounded-[1.5rem] p-6 text-left">
            <Truck className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold text-on-surface text-sm mb-1">Shipping</h3>
            <p className="text-sm text-on-surface-variant">
              Your order will ship within 1–2 business days. You'll receive tracking info by email.
            </p>
          </div>
          <div className="bg-surface-container-low rounded-[1.5rem] p-6 text-left">
            <Shield className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-bold text-on-surface text-sm mb-1">Guarantee</h3>
            <p className="text-sm text-on-surface-variant">
              30-day hassle-free returns. If you're not 100% satisfied, we'll make it right.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button 
          onClick={() => navigate('home')}
          id="continue-shopping"
          className="bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full px-8 py-4 font-bold text-base hover:opacity-90 active:scale-95 soft-spring shadow-[0_8px_24px_rgba(0,107,96,0.2)] inline-flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
